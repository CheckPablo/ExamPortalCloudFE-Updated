import { Component, QueryList, ViewChildren } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { Subject } from 'src/app/core/models/subject';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Test } from 'src/app/core/models/test';
import { SortEvent, SortableHeaderDirective, compare } from 'src/app/core/directives/sortable-header.directive';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { Center } from 'src/app/core/models/center';
import { AttendanceRegisterService } from 'src/app/core/services/shared/attendanceRegister.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TestService } from 'src/app/core/services/shared/test.service';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';


@Component({
  selector: 'app-attendance-register',
  templateUrl: './attendance-register.component.html',
  styleUrls: ['./attendance-register.component.css']
})
export class AttendanceRegisterComponent {
  selectedGrade: number;
  selectedGradeOnViewStudent: number;
  submitted = false;
  baseSubjects: Subject[] = [];
  durations: string[] = [];
  grades: Grade[] = [];
  filter: string;
  itemsPerPage = 10;
  selectedSubject: number;
  selectedSubjects: Subject[] = [];
  subjects: Subject[];
  testId: number;
  searchForm!: UntypedFormGroup;
  selectedTestId: number | null;
  centers: Center[] = [];
  attendanceRegisters: any;
  centerId: number;
  tests: Test[];

  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  user: User;

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'attendanceRegisterTable',
  }
  
  constructor(
    private centerService: CenterService,
    private gradeService: GradesService,
    public paginationService: PaginationService,
    private subjectService: SubjectService,
    private attendanceRegisterService: AttendanceRegisterService,
    private testService: TestService,
    private formBuilder: UntypedFormBuilder,
    private storage: TokenStorageService,
    private exportAsService: ExportAsService,) { }

  ngOnInit(): void {
    // this.attendanceRegisterService.keys = ['testName', 'examNo', 'surname', 'name', 'idNumber', 'startDate', 'endDate', 'password'];
    this.paginationService.setData([])
    this.user = this.storage.getUser();
    //this.getUser();
    this.getGrades();
    this.getCenters();
    this.initForms();
    this.selectedGrade = 0;
    //this.refreshPage();
  }
  // refreshPage() {
  //   this.getCenters();
  // }
  get f() { return this.searchForm.controls; }

  private getCenters() {
    //this.centerService.get()
    this.centerService.getUserCenter(0)
      .subscribe((res) => {
        this.centers = res;
        
        
        this.centerId = res[0].id;
        this.initForms();
        //this.paginationService.setData(res); 
      
      });
  }

  private getGrades() {
    const moment = require('moment');
    this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
        this.paginationService.onSearchInputChange('');
      });
  }

  public onChangeTest = (testId: number) => {
    this.selectedTestId = testId;
  }

  public onChangeSubject(subjectId: number) {
    this.selectedSubject = subjectId;
    this.testService.getOTPTest(this.selectedGrade,subjectId).subscribe((res) => {
      this.tests = res;
      this.f.testId.get('testId').setValue(0);
    });
  }
  public getSubjects = () => {
    this.subjectService.getByGradeId(this.selectedGrade)
      .subscribe((data) => {
        this.subjects = data;
      })
  }

  public onGradeChange(gradeId: number) {

    this.subjectService.getByGradeId(gradeId)
      .subscribe((data) => {
        this.subjects = data;
        this.selectedGrade = gradeId;
         this.getTests(this.selectedGrade, 0);
      })
        this.f.subjectId.get('subjectId').setValue(0);
  }


  private getTests(selectedGrade:number, subject:number) {
    this.tests = [];
    this.testService.getOTPTest(selectedGrade,subject).subscribe((res) => {
      this.tests = res;
      this.f.testId.setValue(0);
      this.f.testId.get('testId').setValue(0);
    });
  }


  private initForms(): void {
    this.searchForm = this.formBuilder.group({
      gradeId: [this.selectedGrade ?? 0, []],
      subjectId: [this.selectedSubject ?? 0, []],
      testId: [this.selectedTestId ?? 0, []],
      centerId : [this.centerId ?? '', []],
    });
  };


  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {

      this.paginationService.paginatedData = this.paginationService.paginatedData;

    } else {
      //this.grades.sort((a, b) => {
      //this.grades = [...this.grades].sort((a, b) => {
      const sorted = this.paginationService.paginatedData.sort((a, b) => {
        //this.gradePaginationService.paginatedData = [...this.gradePaginationService.paginatedData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.paginationService.paginatedData = [...sorted];
    }
    //this.service.sortColumn = column;
    //this.service.sortDirection = direction;
  }

  public onExportClick() {
    console.log(""); 
    this.exportAsService.save(this.exportAsConfig, 'Attendance Register Export').subscribe(() => {
    }); 
  }
  public onSubmit() {
    this.submitted = true;

    //if (this.searchForm.invalid) return;
  
    this.getAttendanceRegister();
  }

 public resetTest(studentId: number, testId: number){
  this.attendanceRegisterService.resetTest(studentId,testId)
  .subscribe(() => {
    this.getAttendanceRegister();
  });
 }

 public setStudentAbsentism(studentId: number, testId: number, absent:number){
    this.attendanceRegisterService.setStudentAbsentism(studentId,testId,absent)
    .subscribe(() => {
      this.getAttendanceRegister();
    });
 }

 private getAttendanceRegister(){
   
   
  // gradeId: [this.selectedGrade ?? 0, []],
  // subjectId: [this.selectedSubject ?? 0, []],
  // testId: [this.selectedTestId ?? 0, []],
  // //centerId : [this.user?.centerId ?? 0, []],
  // centerId : [this.centerId ?? '', []],
  if(this.searchForm.value.gradeId == 0){
    Swal.fire('Grade', 'Please select a grade', 'error')

    return;
  }

  if(this.searchForm.value.subjectId == 0){
    Swal.fire('Subject', 'Please select a subject', 'error')
    return;
  }
  
  if(this.searchForm.value.testId== 0){
   Swal.fire('Test', 'Please select a test', 'error')
   return;
  }

  this.attendanceRegisterService.search(this.searchForm.value)
  .subscribe((data) => {
    console.log(data);
    this.attendanceRegisters = data
    this.paginationService.setData(data)
  });
 }
}