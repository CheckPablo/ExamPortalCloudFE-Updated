import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Component, ElementRef, ViewChild,AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LiveMonitoringService } from 'src/app/core/services/shared/liveMonitoring.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { Firestore, collection, addDoc, getDocs, query, QueryDocumentSnapshot, where, onSnapshotsInSync, serverTimestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/core/services/table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestChat } from 'src/app/core/models/testChat';
import { TestService } from 'src/app/core/services/shared/test.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { User } from 'src/app/core/models/user';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { DatePipe } from '@angular/common';
import { AnswerProgressTracking } from 'src/app/core/models/answerProgressTracking';
import { IrregularityPaginationService } from 'src/app/core/services/IrregularityPagination.service';

@Component({
  selector: 'app-candidate-live-monitoring',
  templateUrl: './candidate-live-monitoring.component.html',
  styleUrls: ['./candidate-live-monitoring.component.css'],
  providers: [TableService, DecimalPipe]
})

// @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

export class CandidateLiveMonitoringComponent implements AfterViewInit{
  form: FormGroup;
  testId: number;
  studentId: number;
  student: any;
  hasAnswerProgress: boolean;
  hasIrregularities: boolean;
  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: null
  }
  messages:string; 
  testChat:TestChat = new TestChat(); 
  selectedTestId: number;
  studentsChatlist:TestChat[] = [];
  submitted: boolean;
  user: User | null;
  textToSend:string | null; 
  studentTestAnswers: AnswerProgressTracking[] = [];
  @ViewChild("CandidateLiveChatModal",{static:true}) content:ElementRef;
  answerText: any;
  modalAnswerText: AnswerProgressTracking;
  
  constructor(private storage: TokenStorageService,
    private liveMonitoringService: LiveMonitoringService,
    private activateRouter: ActivatedRoute,
    public paginationService: PaginationService,
    public irregularityPaginationService: IrregularityPaginationService,
    private exportAsService: ExportAsService,
    private router: Router,
    private db: Firestore, 
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private testService: TestService
    //private eventEmitterService: EventEmitterService   
    // public studentTestPagination: StudDashboardPaginationService, 
  ) {
  }
  ngAfterViewInit(): void {
    this.getStudentAnswerProgress();
  }

  ngOnInit(): void {
    this.user = this.storage.getUser(); 
    this.activateRouter.queryParams
      .subscribe((p) => {
        console.log(p); 
        this.student = p;
        console.log(p);
        
      })

    this.getIrregularKeyPresses(); 
    setInterval(() => {
      this.getStudentAnswerProgress();
    },30000); 
    this.initForms(); 
  }

  get f() { return this.form.controls; }

  private initForms(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      testName: ['', [Validators.required]],
      testChatMessage: ['', [Validators.required]],
      //testChatMessageArea: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
    });
  
    this.submitted = false;
  }

async getCandidateLiveChats() {
  this.selectedTestId = this.student.testID;
  const appRef = collection(this.db,'CloudMessagingStagePortal')
  //const appQuery = query(appRef,where('testID', '==', String(this.student.testID)));
  const appQuery = query(appRef,where('studentID', '==', Number(this.student.studentID)));
  //,orderBy('createdAt') desc
  //,where('studentID', '==',String(this.student.studentID)));
  // const appQuery = query(appRef,where('testID', '==', `${this.testId}`));
  //const appQuery = query(appRef);
  const querySnapshot = await getDocs(appQuery);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //);
    let InvgChat = new TestChat(); 
    InvgChat.name = doc.data().name; 
    InvgChat.message = doc.data().message; 
    InvgChat.fromStudent = doc.data().fromStudent; 
    InvgChat.fromTeacher = doc.data().fromTeacher; 
    InvgChat.testID = doc.data().testID; 
    InvgChat.id = doc.data().studentID;
    InvgChat.teacherReadStatus = doc.data().seacherReadStatus;
    InvgChat.studentReadStatus = doc.data().studentReadStatus; 
    InvgChat.studentID = doc.data().studentID;  
    this.studentsChatlist.push(InvgChat)
    const id = doc.id;
    const data = doc.data();
  
    //InvgChat.studentID 

    //$("#basicTextarea").append(change.doc.data().Name + ': ' + change..data().Message + "\n" + "\n");
//     //     MessageIDs.forEach(updateMessageReadStatus);
  });
  this.messages = this.studentsChatlist.map(x=>`${x.name}:${x.message}`).join('\n')
   
  
  // return (
  //  await getDocs(query(collection(this.db, 'messages')))
  // ).docs.map((messages) => messages.data());
 }


  /*getIrregularities() {
    this.liveMonitoringService.getIrregularities(this.student.studentID, this.student.testID).subscribe((data) => {
      this.hasAnswerProgress = data.length > 0;
      this.paginationService.setData(data);
    });
  }*/

  getIrregularKeyPresses(){
    this.liveMonitoringService.getInvalidKeyPresses(this.student.studentID, this.student.testID).subscribe((data) => {
      console.log(data); 
      this.hasAnswerProgress = data.length > 0;
      this.hasIrregularities = data.length > 0;

      this.irregularityPaginationService.setData(data);
    });
  }

  getStudentAnswerProgress() {
    this.liveMonitoringService.getStudentAnswerProgress(this.student.studentID, this.student.testID).subscribe((data) => {
      this.hasAnswerProgress = data.length > 0;
      //this.answersTrackingPaginationService = data; 
      this.studentTestAnswers = data
      this.paginationService.setData(data);
     // this.answersTrackingPaginationService.removeData(data); 
    });
  }
  public refreshAnswerProgressText(){
    this.getStudentAnswerProgress()
  }

 /*  public refreshAnswerProgressText(): () => void {
    this.getStudentAnswerProgress()
  }
 */

  public onExportClick(type: string) {
    this.exportAsConfig.elementIdOrContent = type
    this.exportAsService.save(this.exportAsConfig, type).subscribe(() => {
    });
  }

 public openAnswerTextModal(modal,answer: AnswerProgressTracking){
    this.modalService.open(modal, ModalSizes.lg);
    console.log(".");
    this.modalAnswerText = answer
    console.log(answer);
  }
/* 
  public openUpdateModal(modal,center: Center) {
    this.initEditForms(center); 
    this.modalService.open(modal, ModalSizes.lg);
  } */
  goToBackliveMonitoring() {
    this.router.navigate(['/portal/live-test-monitoring']);
  }
  
 public openLiveCandidateChat(){
  this.getCandidateLiveChats();
  this.openSm(this.content); 
 }

  public onInvigilatorMesssageSend(testData: TestChat): any {
    
    
    let testChatMessagetextArea = document.getElementById('testChatMessageArea'); 
    testChatMessagetextArea.append(this.user.firstName +":"+ this.f.testChatMessage.value);
    this.textToSend = this.f.testChatMessage.value
    //this.f.testChatMessage.reset(); 
    this.f.testChatMessage.setValue('');

    var testData: TestChat ;
    testData = {testID: Number(this.selectedTestId),
       id: this.user.id,
       studentID: Number(this.student.studentID),
       name: this.user.fullName,
       //message: this.f.testChatMessage.value,
       message: this.textToSend,
       otpMessage: "0",
       fromStudent:"1", 
       fromTeacher:"0",
       studentReadStatus:"Read", 
       teacherReadStatus:"Unread",
       createdAt:serverTimestamp()}; // valid

    const collectionInstance = collection(this.db,'CloudMessagingStagePortal');
    addDoc(collectionInstance,testData)
    .then(()=>{
    

  })
  .catch((err)=>{
     
  })
}

openSm(content) {
  this.modalService.open(content, ModalSizes.lg);
}

}