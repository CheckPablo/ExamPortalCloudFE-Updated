import { Component, ElementRef, ViewChild } from '@angular/core';
import { TestChat } from 'src/app/core/models/testChat';
import { Firestore, collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from '@angular/fire/firestore';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LiveMonitoringService } from 'src/app/core/services/shared/liveMonitoring.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { TestService } from 'src/app/core/services/shared/test.service';
import { Test } from 'src/app/core/models/test';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { EventEmitterService } from 'src/app/core/services/shared/event-emitter.service';

@Component({
  selector: 'app-candidate-live-monitoring-chat',
  templateUrl: './candidate-live-monitoring-chat.component.html',
  styleUrls: ['./candidate-live-monitoring-chat.component.css']
})

export class CandidateLiveMonitoringChatComponent {
  selectedStudentIds: number[] = [];
  form: FormGroup;
  submitted = false;
  tests: Test[];
  testChat: TestChat = new TestChat();
  testId?: number | null;
  selectedTestId: number;
  studentsChatlist: TestChat[] = [];
  liveMonitoringCandidateList: any;
  messages: string;
  user: User | null;
  testChatMessageArea = new FormControl('');
  testChatBroadcastMessageArea = new FormControl('');
  @ViewChild("InvigilatorChatModal", { static: true }) content: ElementRef;
  @ViewChild("bulkMessagingModal", { static: true }) bulkMsgContent: ElementRef;
  @ViewChild("sendBulkOTPModal", { static: true }) otpContent: ElementRef;


  textToSend: string;
  selectedStudentId: number;
  bulkMessageForm: any;
  otpForm: any;
  otpMessageForm: any;
  otpMessagingForm!: UntypedFormGroup;
  bulkMessagingForm!: UntypedFormGroup;
  customMessageForm!: UntypedFormGroup
  show: boolean = false;
  customChatStudentList: any[] = [];
  messagesArray: string[];
  private dbPath = '/CloudMessagingStagePortal';
  testChatRef: AngularFirestoreCollection<TestChat>;
  fireBaseDocId: string;

  // public show:boolean = false;
  // public buttonName:any = 'Show';

  constructor(
    private storage: TokenStorageService,
    private db: Firestore,
    private fdb: AngularFirestore,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private testService: TestService,
    private liveMonitoringService: LiveMonitoringService,
    private eventEmitterService: EventEmitterService, 
    public paginationService: PaginationService,
    public elementRefTextArea: ElementRef<HTMLElement>
  ) {
    this.testChatRef = fdb.collection(this.dbPath)
   }

  ngOnInit() {
    this.user = this.storage.getUser();

    let testData: TestChat = {
      id: 1,
      testID: 0,
      studentID: 0,
      name: "name",
      message: "test message",
      otpMessage: "0",
      fromStudent: "1",
      fromTeacher: "0",
      studentReadStatus: "Read",
      teacherReadStatus: "Unread",
      createdAt: serverTimestamp(),

    };
    this.initForms();
    this.initOTPForms();
    this.initBulkMessageForms();
    this.initCustomMessageForms();
    this.getTests(0, 0);

    //this.getDocChanges(); 
  }

  get f() { return this.form.controls; }
  get b() { return this.bulkMessagingForm.controls; }
  get o() { return this.otpMessagingForm.controls; }
  get c() { return this.customMessageForm.controls; }
  private getTests(selectedGrade: number, subject: number) {
    this.testService.get().subscribe((res) => {
      //this.testService.getOTPTest(selectedGrade,subject).subscribe((res) => {
      this.tests = res;
    });
  }
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

  private initOTPForms(): void {
    let otpForm = this.otpForm ? {
      otpMessage: ['', [Validators.required]],
    } :
      {
        otpMessage: ['', [Validators.required]],
      };

    this.otpMessagingForm = this.formBuilder.group(otpForm);
    /*if(this.otpForm){
      this.onSubmit();
    }*/
    this.submitted = false;
  }


  private initBulkMessageForms(): void {
    let bulkMessageForm = this.bulkMessageForm ? {
      bulkMessage: ['', [Validators.required]],
    } :
      {
        bulkMessage: ['', [Validators.required]],
      }

    this.bulkMessagingForm = this.formBuilder.group(bulkMessageForm);
    /*if(this.bulkMessageForm){
      this.onSubmit();
    }*/
    this.submitted = false;
  }


  private initCustomMessageForms(): void {
    let customMessageForm = this.customMessageForm ? {
      customChatMessage: ['', [Validators.required]],
    } :
      {
        customChatMessage: ['', [Validators.required]],
      }

    this.customMessageForm = this.formBuilder.group(customMessageForm);
    /*if(this.bulkMessageForm){
      this.onSubmit();
    }*/
    this.submitted = false;
  }

  public onBulkSendClicked() {
    this.getDocs();
    this.openSm(this.bulkMsgContent);
  }

  public onInvigilatorBulkMessageSend(testData: TestChat): any {

    let testChatBroadcastMessageArea = document.getElementById('chatBroadcastMessageArea');
    testChatBroadcastMessageArea.append(this.user.firstName + ":" + this.b.bulkMessage.value);
    this.textToSend = this.b.bulkMessage.value
    this.b.bulkMessage.setValue('');
    var testData: TestChat;
    testData = {
      testID: Number(this.selectedTestId),
      id: Number(this.user.id),
      studentID: Number(0),
      name: this.user.fullName,
      //message: this.f.testChatMessage.value,
      message: this.textToSend,
      otpMessage: "0",
      fromStudent: "0",
      fromTeacher: "1",
      studentReadStatus: "Unread",
      teacherReadStatus: "Read",
      createdAt: serverTimestamp()
    }; // valid

    const collectionInstance = collection(this.db, 'CloudBroadcastMessaging');
    //for each here 
    addDoc(collectionInstance, testData)
      .then(() => {


      })
      .catch((err) => {

      })
  }
  public onInvigilatorMessageSend(testData: TestChat): any {
        let testChatMessagetextArea = document.getElementById('testChatMessageArea');
        testChatMessagetextArea.append(this.user.firstName + ":" + this.f.testChatMessage.value);
        this.textToSend = "" + " " + this.f.testChatMessage.value
        this.f.testChatMessage.setValue('');
        var testData: TestChat;
        testData = {
          testID: Number(this.selectedTestId),
          id: this.selectedStudentId,
          studentID: Number(this.selectedStudentId),
          name: this.user.fullName,
          //message: this.f.testChatMessage.value,
          message: this.textToSend,
          otpMessage: "0",
          fromStudent: "0",
          fromTeacher: "1",
          studentReadStatus: "Unread",
          teacherReadStatus: "Read",
          createdAt: serverTimestamp()
        }; // valid
        const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
        addDoc(collectionInstance, testData)
          .then(() => {
           this.getStudentInvigilatorChat(); 
          })
          .catch((err) => {
    
          });
      }

  public onInvigilatorCustomMessageSend(testData: TestChat): any {

    //let testChatMessagetextArea = document.getElementById('testChatMessageArea'); //rename
    //testChatMessagetextArea.append(this.user.firstName +":"+this.f.customChatMessage.value);
    this.textToSend = "" + " " + this.c.customChatMessage.value
    this.c.customChatMessage.setValue('');

    this.selectedStudentIds.forEach(student => {
      var testData: TestChat;
      testData = {
        testID: Number(this.selectedTestId),
        id: this.selectedStudentId,
        studentID: Number(student),
        name: this.user.fullName,
        //message: this.f.testChatMessage.value,
        message: this.textToSend,
        otpMessage: "0",
        fromStudent: "0",
        fromTeacher: "1",
        studentReadStatus: "Unread",
        teacherReadStatus: "Read",
        createdAt: serverTimestamp()
      }; // valid

      const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
      addDoc(collectionInstance, testData)
        .then(() => {


        })
        .catch((err) => {

        })
    });
  }


  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.lg);

  }

  public openCustomChatListModal(modal: any) {
    //this.initExtraTimeForms(center); 

    //this.populateStudentMonitoringList(this.f.gradeId.value,0,this.f.testId.value); 

    this.modalService.open(modal, ModalSizes.lg);
  }


  public async onTestChatClick(c:TestChat){
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    const appQuery = query(appRef, where('message', '==', c.message));
    const querySnapshot = await getDocs(appQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc); 
      this.fireBaseDocId = doc.id
      console.log(doc.id); })
      c.studentReadStatus = "Read"; 
      const data = {
      studentReadStatus: "Read"
    };
    this.testChatRef.doc(this.fireBaseDocId).update(data); 
    setTimeout(function(){
      this.getStudentInvigilatorChat();
    },3000);
  
   }
  public onOTPBulkSend(): void {

    this.textToSend = this.o.otpMessage.value
    this.o.otpMessage.setValue('');
    var testData: TestChat;
    testData = {
      testID: Number(this.selectedTestId),
      id: Number(0),
      studentID: Number(0),
      name: this.user.fullName,
      //message: this.f.testChatMessage.value,CloudMessagingStagePortalz
      message: this.textToSend,
      otpMessage: "1",
      fromStudent: "0",
      fromTeacher: "1",
      studentReadStatus: "Unread",
      teacherReadStatus: "Read",
      createdAt: serverTimestamp()
    }; // valid

    const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
    addDoc(collectionInstance, testData)
      .then(() => {


      })
      .catch((err) => {

      })
  }


  async getDocs() {
     
    const appRef = collection(this.db, 'CloudBroadcastMessaging')
    const appQuery = query(appRef, where('testID', '==', Number(this.selectedTestId)), where('fromTeacher', '==', "1"), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(appQuery);
    querySnapshot.forEach((doc) => {
      let InvgChat = new TestChat();
      InvgChat.name = doc.data().name;
      InvgChat.message = doc.data().message;
      InvgChat.fromStudent = doc.data().fromStudent;
      InvgChat.fromTeacher = doc.data().fromTeacher;
      InvgChat.testID = doc.data().testID;
      InvgChat.id = doc.data().studentID;
      InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
      InvgChat.studentReadStatus = doc.data().studentReadStatus;
      InvgChat.studentID = doc.data().studentID;
      this.studentsChatlist.push(InvgChat)
      const id = doc.id;
      const data = doc.data();

    });
    this.messages = this.studentsChatlist.map(x => `${x.name}:${x.message}`).join('\n');
  }

  async getStudentInvigilatorChat() {
    console.log(this.messages)
    this.studentsChatlist = []; 
 

    console.log(this.selectedTestId); 
    console.log(this.selectedStudentId)
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    const appQuery = query(appRef, where('testID', '==', Number(this.selectedTestId)), where('studentID', '==', Number(this.selectedStudentId)), orderBy('createdAt', 'asc'));
    console.log(appQuery)
    const querySnapshot = await getDocs(appQuery);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      //console.log("selected",this.selectedStudentId); 
      //console.log("incoming from firebase",doc.data().studentID); 
      if(this.selectedStudentId != doc.data().studentID)
        {
          console.log(this.selectedStudentId != doc.data().studentID)
        } 
      let InvgChat = new TestChat();
      InvgChat.name = doc.data().name;
      InvgChat.message = doc.data().message;
      InvgChat.fromStudent = doc.data().fromStudent;
      InvgChat.fromTeacher = doc.data().fromTeacher;
      InvgChat.testID = doc.data().testID;
      InvgChat.id = doc.data().studentID;
      InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
      InvgChat.studentReadStatus = doc.data().studentReadStatus;
      InvgChat.studentID = doc.data().studentID;
      this.studentsChatlist.push(InvgChat)
      const id = doc.id;
      const data = doc.data();
    });
    this.messages = this.studentsChatlist.map(x => `${x.name}:${x.message}`).join('\n')
  }


  public onChangeTest = (testId: number) => {
    this.selectedTestId = testId;

    const payload = {
      testId: this.selectedTestId,
      candidateSearchType: 1,
      name: '',
    }

    this.liveMonitoringService.search(payload).subscribe((data) => {
      this.liveMonitoringCandidateList = data;


      this.paginationService.setData(data)
      this.paginationService.onSearchInputChange('');
    });
  }

  openSm(content) {
    this.modalService.open(content, ModalSizes.lg);
  }

  public isStudentSelected(studentId: number): boolean {
    return (this.selectedStudentIds.some(x => x === studentId))
  }

  public onSort(a: any) {

  }

  public onStudentClick(studentId: number) {
    this.selectedStudentId = studentId
    this.toggleChatButtons();
    this.getStudentInvigilatorChat();
    //this.messages = ""; 
    //this.getDocs(); 
    //; 
    this.openSm(this.content);
  }

  public closeStudentChatModal(){
    console.log("closing modal"); 
    this.messages = ""; 
    this.modalService.dismissAll(); 
  }
 

  public onStudentCustomChatClick(studentId: number) {
    if (this.selectedStudentIds.find(x => x == studentId)) {
      this.selectedStudentIds = this.selectedStudentIds.filter(x => x != studentId)
    } else {
      this.selectedStudentIds.push(studentId);
    }
  }

  public onSendOTPClicked() {

    this.openSm(this.otpContent);

  }

  toggleChatButtons() {
    this.show = !this.show;
  }
}
