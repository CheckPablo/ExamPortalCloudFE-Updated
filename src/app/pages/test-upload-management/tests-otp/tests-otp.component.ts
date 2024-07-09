import { Component, QueryList, ViewChildren } from '@angular/core';
import { GradesService } from "src/app/core/services/shared/grades.service";
import { Grade } from "src/app/core/models/grade";
import { SubjectService } from "src/app/core/services/shared/subject.service";
import { Subject } from "src/app/core/models/subject";
import { Test } from 'src/app/core/models/test';
import { AdvancedSortableDirective } from 'src/app/core/directives/advanced-sortable.directive';
import { Observable } from "rxjs";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/core/services/shared/test.service';
import { Center } from 'src/app/core/models/center';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { RandomOtp } from 'src/app/core/models/randomOtp';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/shared/user.service';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-tests-otp',
  templateUrl: './tests-otp.component.html',
  styleUrls: ['./tests-otp.component.css']
})
export class TestsOtpComponent {
  baseSubjects: Subject[] = [];
  centers: Center[] = [];
  randomOTPs: RandomOtp[] =[]; 
  grades: Grade[] = [];
  subjects: Subject[];
  submitted = false;
  selectedGrade: number;
  selectedSubject: number;
  selectedSubjects: Subject[] = [];
  studentSubjects: Subject[] = [];
  selectedTestId: number;
  tests: Test[];
  selectedSubjectOTP: any;
  selectedGradeOTP: any;
  tables$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
//OtpSearchForm: any;
  OtpSearchForm!: UntypedFormGroup;
  user: User;
  constructor(
    private centerService: CenterService,    
    private formBuilder: UntypedFormBuilder,
    private gradeService: GradesService,
    private subjectService: SubjectService,
    private testService: TestService,
    public paginationService: PaginationService,
    private authService: AuthService,
    private userService: UserService,)
  {}
  
  ngOnInit(): void {
    this.paginationService.setData([]);
    this.getGrades();
    this.getCenters(); 
    this.initForms(); 
    this.getUser();
    this.selectedGrade = 0;
    this.selectedSubject  = 0; 
  }

  get f() { return this.OtpSearchForm.controls; }


  private getCenters() {
    this.centerService.getUserCenter(0)
      .subscribe((res) => {
        this.centers = res;
      });
  }

  private filterBaseSubjects() {
    if (!this.baseSubjects.length || !this.studentSubjects.length) return;
    this.studentSubjects.forEach((ss) => {
      const fromBase = this.baseSubjects.find((x) => x.id === ss.id);

      if (fromBase) {
        this.moveToTarget(fromBase);
      }
    });
  }

  private getGrades() {
    const moment = require("moment");
    const today = moment();
    this.gradeService.get().subscribe((res) => {
      this.grades = res;
    });

  }

  public onChangeSubject(subjectId: number) {
    this.selectedSubject = subjectId;
    this.testService.getOTPTest(this.selectedGrade,subjectId).subscribe((res) => {
      this.tests = res;
      this.f.testId.get('testId').setValue(0);
    });
    this.f.testId.get('testId').setValue(0);
  }
  
  public getSubjects = () => {
    this.subjectService.getByGradeId(this.selectedGrade).subscribe((data) => {
      this.subjects = data;
    });
  };
  
  private getUser() {
    const user = this.authService.currentUserValue(); 
    this.userService.getById(`${user.id}`)
      .subscribe((data) => {
        this.user = data;
        
        this.initForms();
      })
  }

  public onChangeTest = (testId:number) => {
      this.selectedTestId = testId;
  };

  private getTests(selectedGrade:number, subject:number) {
    this.testService.getOTPTest(selectedGrade,subject).subscribe((res) => {
      this.tests = res;
      this.f.testId.setValue(0);
      this.f.testId.get('testId').setValue(0);
    });
    //this.f.subjectId.get('subjectId').setValue(0);
  }
  
  private initForms(RandomOtp?: RandomOtp): void {
    this.OtpSearchForm = this.formBuilder.group({
      centerId : [this.user?.centerId ?? '', Validators.required],
      gradeId: [ '', [Validators.required]],
      subjectId: [this.selectedSubject ?? 0, [Validators.required]],
      testId: [RandomOtp?.testId ?? 0, [Validators.required]],
      testName: ['', []],
    });
    //  if(grade != ''){
    //    //this.populateStudentList(grade,0,testId);
    //    this.selectedGrade = grade; 
    // }
    this.submitted = false;
  }

  public moveToTarget(subject: Subject) {
    this.selectedSubjects.push(subject);
    this.baseSubjects = this.baseSubjects.filter((x) => x.id !== subject.id);
  }

  public onChangeGrade(gradeId: number) { 
    //this.f.subjectId.get('subjectId').setValue(0);
    //if (gradeId == 0)  return;
    this.selectedGrade = gradeId;
    this.subjectService.getByGradeId(this.selectedGrade).subscribe((data) => {
      this.subjects = data; 
      this.getTests(this.selectedGrade, 0);
      
    });
    this.f.subjectId.get('subjectId').setValue(0);
    //this.getSubjects(); 

	}

  public OnClickSendStudentsOTP() {    
    this.testService.sendOTP(this.selectedTestId)
      .subscribe(() => {
        Swal.fire('OTP Sent', 'One Time Pin has been sent to the students.', 'success');
      })
  }

   public onClickNewOTP(){
    //PARAMETERS @Code as int,@TestId as int, @CenterId as int,@SectorId as int,@SubjectId as int,@ModifiedDate as datetime
    this.testService.createNewOTP(0,this.selectedTestId,0,this.selectedGrade,this.selectedSubject)
    .subscribe(() => {
      Swal.fire('OTP Generated', 'OTP was successfully created', 'success');
      this.onSubmit();
    })
  }

   public onSort(a: any) {
        
  }
   public onSubmit() {

     this.submitted = true;
     
     if(this.OtpSearchForm.value.gradeId == 0){
      Swal.fire('Grade', 'Please select a grade', 'error')
      return;
    }

    if(this.OtpSearchForm.value.subjectId == 0){
      Swal.fire('Subject', 'Please select a subject', 'error')
      return;
    }
    
    if(this.OtpSearchForm.value.testId== 0){
     Swal.fire('Test', 'Please select a test', 'error')
     return;
    }


       if (this.OtpSearchForm.invalid) return;

      
       this.testService.searchTestOTP(this.OtpSearchForm.value)
        .subscribe((data) => {
          this.randomOTPs = data
          console.log(this.randomOTPs); 
           //this.tests = data
           this.paginationService.setData(data)
       })
  }

}
