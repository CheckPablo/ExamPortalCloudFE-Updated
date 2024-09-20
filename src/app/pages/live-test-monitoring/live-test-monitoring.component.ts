import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Grade } from 'src/app/core/models/grade';
import { Subject } from 'src/app/core/models/subject';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';
import { Center } from 'src/app/core/models/center';
import { Test } from 'src/app/core/models/test';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { TestService } from 'src/app/core/services/shared/test.service';
import { LiveMonitoringService } from 'src/app/core/services/shared/liveMonitoring.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import Swal from 'sweetalert2';
import { StudentTestExtraTimeLinker } from 'src/app/core/models/studentTestExtraTimeLinker';
import { LiveMonitoring } from 'src/app/core/models/liveMonitoring';
import { TestChat } from 'src/app/core/models/testChat';
import { Firestore, collection, addDoc, getDocs, query, where, serverTimestamp, orderBy } from '@angular/fire/firestore';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { StudentTestWriteService } from 'src/app/core/services/shared/studentTestWrite.service';

@Component({
  selector: 'app-live-test-monitoring',
  templateUrl: './live-test-monitoring.component.html',
  styleUrls: ['./live-test-monitoring.component.css']
})
export class LiveTestMonitoringComponent {

  baseSubjects: Subject[] = [];
  extraTimes = {};
  form: any;
  otpForm: any;
  bulkMessageForm: any;
  grades: Grade[] = [];
  selectedGrade: number;
  selectedGradeOnViewStudent: number;
  submitted = false;
  // durations: any[] = [];
  filter: string;
  itemsPerPage = 10;
  selectedSubject: number;
  subjects: Subject[];
  testId: number;
  searchForm!: UntypedFormGroup;
  extraTimeForm!: UntypedFormGroup;
  selectedTestId: number | null;
  centers: Center[] = [];
  liveMonitoringCanidateList: any;
  centerId: string;
  tests: Test[];
  testChatMessageArea = new FormControl('');
  @ViewChild("monitoringChatModal", { static: true }) content: ElementRef;
  @ViewChild("sendBulkOTPModal", { static: true }) otpContent: ElementRef;
  user: any;
  name?: string;
  candidateSearchType = 1;
  studentList: any[] = [];
  links: any[] = [];
  studentIds: number[] = [];
  accomodationIds: number[] = [];
  readerIds: number[] = [];
  extraTimeIds: Record<number, string> = {};
  irregularityColor: string;
  isAllSelected = false;
  extraTimeDurations: any[] = [];
  studentTestExtraTimeLinker: StudentTestExtraTimeLinker;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  studentTestExtraTime: string;
  textToSend: string;
  selectedStudentId: number;
  studentsChatlist: TestChat[] = [];
  bulkMessagelist: TestChat[] = [];
  messages: string;
  otpToValidate = new FormControl('');
  otpMessagingForm!: UntypedFormGroup;
  bulkMessagingForm!: UntypedFormGroup;
  show: boolean;
  showModal: boolean;
  selectedStudentTileClick: number;
  title: string;
  message: string;
  onload = true;
  bulkMessages: string;
  duration = 50; 
  timer:any|null; 
  isPreviousConnectivityLost: boolean;

  //duration = 50; 
  //timer:any|null; 
  constructor(
    private db: Firestore,
    private centerService: CenterService,
    private cdRef: ChangeDetectorRef,
    private gradeService: GradesService,
    public paginationService: PaginationService,
    private router: Router,
    private subjectService: SubjectService,
    private liveMonitoringService: LiveMonitoringService,
    private studentTestWriteService: StudentTestWriteService,
    private testService: TestService,
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private authService: AuthService) {
      this.startTimer(1000);
      setTimeout(() => {
        this.stopTimer();
      }, 30000); //
     }

  ngOnInit(): void {
    this.paginationService.setData([])
    this.getUser();
    if (!this.onRedirect()) {
      this.getGrades();
      this.getCenters();
    }

    this.otpToValidate.valueChanges.subscribe(() => {


    })
    this.initForms();
    this.initOTPForms();
    this.initBulkMessageForms();
    this.selectedGrade = 0;
    this.selectedSubject = 0;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.generateExtraTimeDurations();
  }

  get f() { return this.searchForm.controls; }
  get b() { return this.bulkMessagingForm.controls; }
  get o() { return this.otpMessagingForm.controls; }

  firstFunction() {

  }
  private generateExtraTimeDurations = () => {

    const increment = 10;

    for (let minutes = increment; minutes <= 0.75 * 60; minutes += increment) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
      const value = `${formattedHours} hrs : ${formattedMinutes} min`;
      const key = `${formattedHours}:${formattedMinutes}:00`;
      this.extraTimeDurations.push({ key, value });
    }
  };
  private getCenters() {
    this.centerService.get()
      .subscribe((res) => {
        this.centers = res;
        this.clearTable();
        //this.paginationService.setData(res);     
      });
  }

  /*stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      window.location.reload(); 

    } else {

    }
  }

  public startTimer(interval) {
    this.timer = setInterval(() => {
        --this.duration;
    }, interval);
  }*/

  private getGrades() {
    const moment = require('moment');
    this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
        this.clearTable();
        this.paginationService.onSearchInputChange('');
      });
  }

  public isStudentSelected(studentId: number): boolean {
    return (this.studentIds.some(x => x === studentId))
  }

  public onChangeTest = (testId: number) => {
    this.selectedTestId = testId;
    this.save();
  }

  public onChangeSubject(subjectId: number) {
    this.selectedSubject = subjectId;
    const monitorSubjectId = document.getElementById('subjectId');
    //localStorage.setItem('monitorSubjectId', JSON.stringify(this.selectedSubject));
    this.testService.getOTPTest(this.searchForm.value['gradeId'], subjectId).subscribe((res) => {
      this.tests = res;
      this.clearTable();
      this.save();
      const value = { ...this.searchForm.value, ...{ subjectId, testId: '0' } };
      this.searchForm.setValue(value);
    });
    this.logLocalVariables();
  }

  public getSubjects = () => {
    this.subjectService.getByGradeId(this.selectedGrade)
      .subscribe((data) => {
        this.subjects = data;
        const value = { ...this.searchForm.value, ...{ subjectId: 0, testId: '0' } };
        this.searchForm.setValue(value);
      })
  }

  public onGradeChange(gradeId: number) {
    this.subjectService.getByGradeId(gradeId)
      .subscribe((data) => {
        this.subjects = data;
        this.baseSubjects = data;
        this.tests = [];
        this.selectedGrade = gradeId;
        const value = { ...this.searchForm.value, ...{ gradeId, subjectId: '0', testId: '0' } };
        this.searchForm.setValue(value);
        this.clearTable();
        this.save();

      });

    this.logLocalVariables();
  }

  private getTests(selectedGrade: number, subject: number) {
    this.tests = [];
    this.testService.getOTPTest(selectedGrade, subject).subscribe((res) => {
      this.tests = res;
      const value = { ...this.searchForm.value, ...{ testId: '0' } };
      this.searchForm.setValue(value);

    });
  }
  private getUser() {
    this.user = this.authService.currentUserValue();
  }

  private logLocalVariables() {
    const gradeIdMonitoring = localStorage.getItem('monitorGradeId');
    if (gradeIdMonitoring !== null) {
      this.f.gradeId.get('gradeId').setValue(Number(gradeIdMonitoring));
    }

    const subjectIdMonitoring = localStorage.getItem('monitorSubjectId');
    if (subjectIdMonitoring !== null) {
      this.f.subjectId.get('subjectId').setValue(Number(subjectIdMonitoring));
    }

    const testIdMonitoring = localStorage.getItem('monitorTestId');
    if (testIdMonitoring !== null) {
      this.f.testId.get('testId').setValue(Number(testIdMonitoring));
    }
  }

  private initForms(): void {

    let form = this.form ? {
      gradeId: [this.form.gradeId ?? '0', [Validators.required]],
      subjectId: [this.form.subjectId ?? '0', [Validators.required]],
      testId: [this.form.testId ?? '0', [Validators.required]],
      candidateSearchType: [this.form.candidateSearchType ?? '', []],
      name: [this.form.name ?? '', []],

    } :
      {
        gradeId: [this.selectedGrade ?? '0', [Validators.required]],
        subjectId: [this.selectedSubject ?? '0', [Validators.required]],
        testId: [this.selectedTestId ?? '0', [Validators.required]],
        candidateSearchType: [this.candidateSearchType ?? '', []],
        name: [this.name ?? '', []],
      };

    this.searchForm = this.formBuilder.group(form);
    if (this.form) {
      this.onSubmit();
    }
    this.submitted = false;
  };

  private initOTPForms(): void {
    let otpForm = this.otpForm ? {
      otpMessage: ['', [Validators.required]],
    } :
      {
        otpMessage: ['', [Validators.required]],
      };

    this.otpMessagingForm = this.formBuilder.group(otpForm);
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

    this.submitted = false;
  }

  private initExtraTimeForms(): void {
    let form = {};
    this.studentTestExtraTimeLinker.testId = this.testId;
    this.studentTestExtraTimeLinker.studentIds = this.studentIds;
    this.studentTestExtraTimeLinker.testId = this.testId;
    this.extraTimeForm = this.formBuilder.group(form);
    this.submitted = false;
  };

  public onBulkSendClicked() {
    this.getDocs();
    this.openSm(this.content);
  }

  public onChangeExtraTime(event: Event): void {
    let name = (event.target as HTMLInputElement).name
    let value = (event.target as HTMLInputElement).value
    this.extraTimes[name] = value
    //this.selectedSubject = subjectId;
  }

  async getDocs() {
    const appRef = collection(this.db, 'CloudBroadcastMessaging')
    console.log(this.searchForm.value['testID']); 
    console.log(this.testId); 
    console.log(this.f.testId.value);
    //const appQuery = query(appRef, where('studentID', '==', 0),where('testID', '==',Number(this.searchForm.value['testId'])), orderBy('createdAt', 'asc')); 
    const appQuery = query(appRef, where('studentID', '==', 0),where('testID', '==',Number(this.f.testId.value)), orderBy('createdAt', 'asc'));
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
      console.log(JSON.stringify(InvgChat)); 
      this.bulkMessagelist.push(InvgChat)

    });
    this.bulkMessages = this.bulkMessagelist.map(x => `${x.name}:${x.message}`).join('\n')
    console.log(this.bulkMessages);
  }

  public onExtraTimeSubmit() {

  }

  public onExtraTimeClick() {
    let payload = {
      testId: this.searchForm.value['testId'],
      studentIds: this.studentIds,
      extraTimeIds: { ...this.extraTimeIds },
    }
    const extraTimes = [];
    for (let studentId of this.studentIds) {
      if (this.extraTimes[studentId]) {
        extraTimes.push(this.extraTimes[studentId])
      }
    }
    if (extraTimes.length == 0) {
      Swal.fire('No exra time has been Added', 'Please select an Extra time for atleast one student', 'error');
    };
    payload.extraTimeIds = extraTimes

    /*     payload = {
          "testId": 0,
          "studentIds": [
              9506,
          ],
          extraTimeIds: [
              ""
          ]
      } */
    this.liveMonitoringService.postUrl(`add-extraTime`, payload)
      .subscribe((studentIds) => {
        if (studentIds.length > 0) {
          const studentErrorList = studentIds.filter(x => x == this.links)
          const items = [];
          for (const item in studentErrorList) {
            items.push(`${item['name']} ${item['surname']}\n`);
          }
          let output = `The following students times were not because they not allowed to write the test.\n ${items.join('')}`;
          Swal.fire('Add Extra Time Success', output, 'error');
        }
        else {
          Swal.fire('Add Extra Time Success', 'extra time was successfully added', 'success');

        }
      })
  }

  public onInvigilatorBulkMessageSend(testData: TestChat): any {
    console.log(this.selectedTestId)
    console.log(this.f.testId.value);
    let testChatMessagetextArea = document.getElementById('testChatMessageArea');
    testChatMessagetextArea.append(this.user.firstName + ":" + this.b.bulkMessage.value);
    this.textToSend = this.b.bulkMessage.value
    this.b.bulkMessage.setValue('');
    var testData: TestChat;
    testData = {
      testID: Number(this.f.testId.value),
      id: Number(0),
      studentID: Number(0),
      name: this.user.fullName,
      message: this.textToSend,
      otpMessage: "0",
      fromStudent: "0",
      fromTeacher: "1",
      studentReadStatus: "Unread",
      teacherReadStatus: "Read",
      createdAt: serverTimestamp()
    }; // valid

    const collectionInstance = collection(this.db, 'CloudBroadcastMessaging');
    addDoc(collectionInstance, testData)
      .then(() => {


      })
      .catch(() => {

      })
  }

  public onOTPBulkSend(): void { 
    this.textToSend = this.o.otpMessage.value
    this.o.otpMessage.setValue('');
    var testData: TestChat;
    testData = {
      //testID: Number(this.selectedTestId),
      testID: Number(this.searchForm.value['testId']),
      id: Number(0),
      studentID: Number(0),
      name: this.user.fullName,
      message: this.textToSend,
      otpMessage: "1",
      fromStudent: "0",
      fromTeacher: "1",
      studentReadStatus: "Unread",
      teacherReadStatus: "Read",
      createdAt: serverTimestamp()
    }; //valid

    const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
    addDoc(collectionInstance, testData)
      .then(() => {


      })
      .catch(() => {

      })
  }

  openSm(content) {
    this.modalService.open(content, ModalSizes.lg);
  }

  public onSelectAll() {
    this.isAllSelected = !this.isAllSelected;

    this.studentIds = [];
    if (this.isAllSelected) {
      this.studentIds = this.links.map((x, _) => x.studentID)
    }
  }

  public onStudentClick(studentId: number) {
    if (this.studentIds.find(x => x == studentId)) {
      this.studentIds = this.studentIds.filter(x => x != studentId)
    } else {
      this.studentIds.push(studentId);
    }
  }
  public onSubmit() {
    if (this.searchForm.value['gradeId'] == "0" || this.searchForm.value['gradeId'] == undefined) {
      if (this.onload) return;
      this.title = 'Error';
      this.message = 'Please select grade';
      this.showModal = true;
      return;
    }

    if (this.searchForm.value['subjectId'] == "0" || this.searchForm.value['subjectId'] == undefined || this.searchForm.value['subjectId'] == "") {
      if (this.onload) return;
      this.title = 'Error';
      this.message = 'Please select subject';
      this.showModal = true;
      return;
    }
    if (this.searchForm.value['testId'] == "0" || this.searchForm.value['testId'] == undefined || this.searchForm.value['testId'] == "") {
      if (this.onload) return;
      this.title = 'Error';
      this.message = 'Please select test';
      this.showModal = true;
      return;
    }
    if (this.searchForm.invalid) return;
    this.submitted = true;

    this.liveMonitoringService.search(this.searchForm.value).subscribe((data) => {
      this.liveMonitoringCanidateList = data;
      /* this.liveMonitoringCanidateList .forEach(element => {
        console.log(element)
        if(element.offline2 > 3 && !element.isIrregularity && !element.offline && element.startDate ){
          this.isPreviousConnectivityLost = true; 
        }
      }); */
      this.removeDuplicates();
      this.paginationService.setData(data)
      this.toggleChatButtons();
   
    });
  }

  public openExtraTimeModal(modal: any) {
    //this.initExtraTimeForms(center); 

    this.populateStudentMonitoringList(this.f.gradeId.value, 0, this.f.testId.value);

    this.modalService.open(modal, ModalSizes.lg);
  }

  public populateStudentMonitoringList(
    sectorId?: number,
    centerId?: number,
    testId?: number
  ) {

    this.testService
      .getUrl(
        `student-list?sectorId=${sectorId}&centerId=${centerId}&testId=${testId}`
      )
      .subscribe((data) => {
        this.links = data
        this.resetLinks()
        this.paginationService.setData(data)

        this.studentList = data;
        this.cdRef.detectChanges();

        data.forEach(x => {
          if (x.linked) this.studentIds.push(x.studentID)
          if (x.accomodation) this.accomodationIds.push(x.studentID)
          if (x.electronicReader) this.readerIds.push(x.studentID)

          this.extraTimeIds[x.studentID] = x.studentExtraTime ?? '00:00:00'
        });
        this.initExtraTimeForms();
      });
  }

  private resetLinks = () => {
    this.studentIds = [];
    this.accomodationIds = [];
    this.readerIds = [];
    this.extraTimeIds = [];
  }

  public goToCandidateLiveMonitor(student: LiveMonitoring) {

    student.selectedStudentTileClick = student.studentID;
    this.selectedStudentTileClick = student.studentID;
    this.save();
    student.studentID = student.studentID
    this.stingify('student', student);
    this.router.navigate(['/portal/candidate-live-monitoring'], {
      queryParams: {
        ...student
      }
    });
  }

  saveSelectedValues() {
    this.stingify('form', this.searchForm.value);

  };

  stingify(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  parse(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  onRedirect() {
    if (this.parse('form')) {
      const {
        studentIds,
        accomodationIds,
        readerIds,
        extraTimeIds } = this.parse('form');

      this.studentIds = studentIds;
      this.accomodationIds = accomodationIds;
      this.readerIds = readerIds;
      this.extraTimeIds = extraTimeIds;

      this.grades = this.parse('grades');
      this.centers = this.parse('centers');
      this.tests = this.parse('tests');
      this.subjects = this.parse('subjects');
      this.form = this.parse('form');


      this.paginationService.onSearchInputChange('');
      //console.log('save options');
      return true;

    }
    return false
  }

  public onSendOTPClicked() {
    this.openSm(this.otpContent);
  }

  toggleChatButtons() {
    this.show = !this.show;
  }

  clearTable() {
    this.liveMonitoringCanidateList = [];
  }

  save() {
    const extras = {
      studentIds: this.studentIds,
      accomodationIds: this.accomodationIds,
      readerIds: this.readerIds,
      extraTimeIds: this.extraTimeIds
    }

    localStorage.removeItem('extras');
    localStorage.removeItem('grades');
    localStorage.removeItem('centers');
    localStorage.removeItem('tests');
    localStorage.removeItem('subjects');
    localStorage.removeItem('form');

    this.stingify('extras', extras);
    this.stingify('grades', this.grades);
    this.stingify('centers', this.centers);
    this.stingify('tests', this.tests);
    this.stingify('subjects', this.subjects);
    this.stingify('form', this.searchForm.value);
    this.onload = false;
  }

  removeDuplicates() {

    const duplicates = {};
    let x = 0;
    //console.log('Before',this.liveMonitoringCanidateList);
    for (const item of this.liveMonitoringCanidateList) {
      if (duplicates.hasOwnProperty(item['studentID'])) {
        console.log(item['studentID']);
        
        const index = duplicates[item['studentID']];
        console.log('lastSaved', item['studentID']['lastSaved']);
        
        if (!item['startDate']) {
          this.liveMonitoringCanidateList.splice(x, 1);
          console.log('x',x);
          
        }else{
          this.liveMonitoringCanidateList.splice(index, 1);
          console.log('index',index);
        }
      }
      else {
        duplicates[item['studentID']] = x;
      }
      x++;
    }
  }
 
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      window.location.reload(); 
      
    } else {
      
    }
  }
  public startTimer(interval) {
    this.timer = setInterval(() => {
        --this.duration;
    }, interval);
  }

  public onEndTestClick() {
    let payload = {
      testId: this.searchForm.value['testId'],
      studentIds: this.studentIds,
    }

    this.liveMonitoringService.postUrl(`end-test`, payload)
      .subscribe((studentIds) => {
        if (studentIds.length > 0) {
          const studentErrorList = studentIds.filter(x => x == this.links)
          const items = [];
          for (const item in studentErrorList) {
            items.push(`${item['name']} ${item['surname']}\n`);
          }
          let output = `The following students exams were not ended because they not allowed to write the test.\n ${items.join('')}`;
          Swal.fire('End Test Time', output, 'error');
        }
        else {
          Swal.fire('End Test Time Success', 'Test ended was successfully', 'success');

        }
      })
  } 
}