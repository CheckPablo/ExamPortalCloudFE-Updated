import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { StudentsTestService } from 'src/app/core/services/shared/studentTest.service';
import { StudentTest } from 'src/app/core/models/studentTest';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { TestChat } from 'src/app/core/models/testChat';
import { Firestore, collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { EventEmitterService } from 'src/app/core/services/shared/event-emitter.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  centerId?: number | null;
  form: FormGroup;
  testOTPForm!: UntypedFormGroup;
  filter: string;
  submitted = false;
  studentTestLists: StudentTest[] = [];
  testChat: TestChat = new TestChat();
  user: User | null;
  testId?: number | null;
  duration = 50;
  timer: any | null;
  userOperatingSystem: string | null;
  testName: string | null;
  otpToValidate = new FormControl('');
  studentsChatlist: TestChat[] = [];
  studentTestOTP:TestChat[] =[];
  messages: string;
  testChatMessageArea = new FormControl('');
  selectedTestId: number;
  textToSend: string;
  selectedTestSecurityId: number;
  uniqueName: string;
  title: any;
  content: string;
  show: boolean;
  studentTestOTPMessage: string;

  constructor(
    private storage: TokenStorageService,
    private authService: AuthService,
    private db: Firestore,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public paginationService: PaginationService,
    private studentTestService: StudentsTestService,
    private router: Router,
    private storageService: TokenStorageService,
    private eventEmitterService: EventEmitterService,
  ) { }

  ngOnInit() {
    this.user = this.storage.getUser();
    
    this.getStudentTestList();
    this.startTimer(1000);
    setTimeout(() => {
      this.stopTimer();
    }, 50000); //
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
    this.otpToValidate.valueChanges.subscribe(data => {
      
    })
    this.initForms();
    //this.intialiseForm(); 
    //this.initOTPForms(StudentTest); 
  }

  get f() { return this.form.controls; }
  //get g() { return this.testOTPForm.controls; }

  public getStudentTestList = () => {
    this.studentTestService.searchStudentTestList(this.user.id)
      .subscribe((data) => {
        const sortedLinks = {};
        for(const item of data){
            sortedLinks[item.id] = item;
        }
        this.studentTestLists = Object.values(sortedLinks);
        //this.studentTestLists = data;
        
        console.log(this.studentTestLists); 
        this.paginationService.setData(this.studentTestLists);
        //this.initIds();
      })
  }

  public startTimer(interval) {
    this.timer = setInterval(() => {
      --this.duration;
      
    }, interval);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      window.location.reload();
      
    } else {
      
    }
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      testName: ['', [Validators.required]],
      testChatMessage: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
    });
     
      
    this.submitted = false;
  }

  private initOTPForms(studentTest: StudentTest): void {
    
    this.testId = studentTest.id;
    this.centerId = studentTest.centerID;
    this.testName = studentTest.testName;
  }

  public logout() {
    console.log("student Dashboard 137"); 
    this.authService.logout();
  }
  public logoutStudent(){
    this.authService.logoutStudent(); 
  }

  public onChangeTest(id: number) {
    this.testId = id;
    this.getStudentTestsOTP();
    //this.getDashBoardChats();
  }

  public onSort(a: any) {
    
  }

  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.lg);
  }

  public async getStudentTestsOTP(){
    //this.bulkMessageList = [];
    this.studentTestOTP = []; 
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    //alert(this.testId); 
    //alert(this.selectedTestId); 
     const appQuery = query(appRef, where('testID', '==',Number(this.testId)),
                                    //where('studentID', '==', Number(this.user.id)),
                                    where('studentID', '==', Number(0)),
                                    where('otpMessage', '==', "1"), orderBy('createdAt', 'asc'));
                                  
/* 
     const appQuery = query(appRef, where('studentID', '==', this.user.id),
                                    where('testID', '==',Number(this.testId)),
                                    where('otpMessage', '==', "1"), orderBy('createdAt', 'asc'));  
     console.log(appQuery);*/

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
       
       this.studentTestOTP.push(InvgChat)
 
     });
     console.log(this.studentTestOTP)
     this.studentTestOTPMessage = this.studentTestOTP.map(x => `${x.name}:${x.message}`).join('\n')
      console.log(this.studentTestOTPMessage)
 }

  public openOTPValidationModal(modal, studentTest: StudentTest) {

    this.selectedTestSecurityId = studentTest.testSecurityLevelId;
    this.testId = studentTest.id;
    this.initOTPForms(studentTest)
    this.modalService.open(modal, ModalSizes.lg);
  }

  public openOfflineAnswerPane(studentTest: StudentTest) {
    this.router.navigate(['/portal/student-testanswer/student-testanswer', studentTest.id, this.user.id, studentTest.testName]);
    
  }

  public refreshPage() {
    window.location.reload();
  }

  public onStudentMesssageSend(testData: TestChat): any {
    let testChatMessagetextArea = document.getElementById('testChatMessageArea');
    testChatMessagetextArea.append(this.user.firstName + this.user.firstName + ":" + this.f.testChatMessage.value);
    this.textToSend = this.f.testChatMessage.value
    this.f.testChatMessage.setValue('');
    
    var testData: TestChat;
    testData = {
      testID: Number(this.testId),
      id: Number(this.testId),
      studentID: Number(this.user.id),
      name: this.user.fullName,
      message: this.textToSend,
      otpMessage: "0",
      fromTeacher: "0",
      fromStudent: "1",
      studentReadStatus: "Read",
      teacherReadStatus: "Unread",
      createdAt: serverTimestamp()
    }; // valid

    const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
    addDoc(collectionInstance, testData)
      .then(() => {
        
      })
      .catch((err) => {
        
      })
  }
  
  async getDashBoardChats() {
    
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    //const appQuery = query(appRef,where('testID', '==', String(this.selectedTestId)),where('studentID', '==', String(this.user.id)));
    //const appQuery = query(appRef,where('testID', '==',Number(this.testId)),orderBy('createdAt','asc'));
    const appQuery = query(appRef, where('testID', '==', Number(this.testId)), where('studentID', '==', Number(this.user.id)), orderBy('createdAt', 'asc'));
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
      InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
      InvgChat.studentReadStatus = doc.data().studentReadStatus;
      InvgChat.studentID = doc.data().studentID;
      this.studentsChatlist.push(InvgChat)
      
      const id = doc.id;
      const data = doc.data();
      //InvgChat.studentID 
      //$("#basicTextarea").append(change.doc.data().Name + ': ' + change..data().Message + "\n" + "\n");
      //MessageIDs.forEach(updateMessageReadStatus);
    });

    this.messages = this.studentsChatlist.map(x => `${x.name}:${x.message}`).join('\n')
    
  }


  public onOTPSubmit() {

    this.storageService.saveSelectedTestSecurityLevel(String(this.selectedTestSecurityId))
    let otpToValidate = document.getElementById('otpToValidate')['value'];
    this.eventEmitterService.onSetStudentUserName(this.user.fullName);
 
    this.studentTestService.validateTestOTP(this.testId, this.centerId, otpToValidate).subscribe((data) => {
      if (data != null) {
        if (this.selectedTestSecurityId == 3) {
   
          let os = this.getOperatingSystem();
          const [head, payload] = this.user.token.split('.').slice(0, 2)
            .map(el => el.replace(/-/g, '+').replace(/_/g, '/'))
            .map(el => JSON.parse(window.atob(el)));
          this.uniqueName = payload.unique_name;
         /*  alert(this.uniqueName);
          alert(this.user.id);
          alert(this.user);
          alert(JSON.stringify(this.user)); */
         // this.eventEmitterService.onSetAnswerPitchValue(this.selectedPitch)
          //localStorage.clear(); 
          this.router.navigate(['/portal/test-writing/test-writing-management', 0, this.testId, this.user.id, this.testName, this.user.fullName]);

          if (os == "Windows") {
            //alert(this.uniqueName)
            window.location.href = `${environment.sebLaunchUrlSandboxWithS}api/InTestWrite/get-student-sebsettings/${this.uniqueName}/${this.testId}/${this.user.id}/${this.testName}/${environment.domain}/${this.user.fullName}`;
            //localStorage.clear();
            //this.router.navigate(["/portal"]);
          } else if(os == "Mac") {
            window.location.href = `${environment.sebLaunchUrlSandboxWithS}api/InTestWrite/get-student-seb-mac-settings/${this.uniqueName}/${this.testId}/${this.user.id}/${this.testName}/${environment.domain}/${this.user.fullName}`;
            //localStorage.clear(); 
            //this.router.navigate(["/portal"]);
          }
          else{
            this.router.navigate(['/portal/test-writing/test-writing-management', 0, this.testId, this.user.id, this.testName,this.user.fullName]);
          }
        } 
        else{
          this.router.navigate(['/portal/test-writing/test-writing-management', 0, this.testId, this.user.id, this.testName,this.user.fullName]);
        }
      }
    },(error) => {
      console.log(error);
      this.title = error.title;
      this.content = `<p>${error.message.join('</p><p>')}</p>`;
      this.show = true;
    })
    this.modalService.dismissAll();

  }

  detectBrowserVersion() {
    var userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|seb|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }

  getOperatingSystem() {
    //return "CrOS"; 
    const userAgent = navigator.userAgent;

     if (userAgent.includes("Windows")) {
      return "Windows";
    } else if (userAgent.includes("Mac")) {
      return "Mac";
    } else if (userAgent.includes("Linux")) {
      return "Linux";
    } else if (userAgent.includes("SEB")) {
      return "SEB";
    }
    else if (userAgent.includes("CrOS")) {
      return "CrOS"; 
    }
      else {
      return "Unknown";
    } 
  }
  
  public onSubmit() {
  }

  ngOnDestroy() {
    this.duration = 0;
    this.timer = null;
  }
}



