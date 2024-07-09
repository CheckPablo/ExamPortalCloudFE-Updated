
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { Subject } from 'src/app/core/models/subject';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/core/models/test';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SortEvent, SortableHeaderDirective, compare } from 'src/app/core/directives/sortable-header.directive';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { Center } from 'src/app/core/models/center';
import { CenterAttendanceService } from 'src/app/core/services/shared/centerAttendance.service';
import Swal from 'sweetalert2';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-center-attendance-management',
  templateUrl: './center-attendance-management.component.html',
  styleUrls: ['./center-attendance-management.component.css']
})
export class CenterAttendanceManagementComponent {
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
    @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
    selectedTestId: number;
    centers: Center[] = [];
    centerAttendances: any; 
    centerId: string;
    selectedCenterId: number;
    tests: Test[];
    todaysDate: string;
    startDate?: string;
    endExamDate?: string;
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild("subjectId",{static:true})subjectContent:ElementRef;
    @ViewChild("txtExamDate",{static:true})startContent:ElementRef;
    @ViewChild("txtExamDate",{static:true})endDateCcontent:ElementRef;
   
  
    constructor(
      private centerService: CenterService,
      private gradeService: GradesService,
      public centerAttendanceService: CenterAttendanceService,
      private router: Router,
      private subjectService: SubjectService,
      public paginationService: PaginationService,
      private formBuilder: UntypedFormBuilder,
      private datePipe: DatePipe,) { }
  
      ngOnInit(): void {
        this.paginationService.setData([])
        //this.getGrades();
        this.getCenters();
        this.initForms();
        this.selectedGrade = 0;
        //this.OverallCenterAttendance(); 
        this.getCenterAttendance(); 
         
         
      }
  
      get f() { return this.searchForm.controls; }
 
      private getCenterAttendance(){
         
        
        
        if(this.centerId)
        {
           
        }
        
        
        this.centerAttendanceService.search(this.searchForm.value)
        .subscribe((data) => {
          this.centerAttendances = data
          this.paginationService.setData(data)
          
          //this.initForms();
        });
       }

      private getCenters() {
        this.centerService.get()
          .subscribe((res) => {
            
            this.centers = res;
            this.selectedCenterId = res[0].id; 
          
            //this.paginationService.setData(res);     
          });
      }
    
      public getGrades(centerId: number) {
        this.subjects = []; 
        const moment = require('moment');
        const today = moment();
        this.gradeService.getGradesByCenter(centerId)
          .subscribe((res) => {
            this.grades = res;
            this.paginationService.onSearchInputChange('');
            this.f.sectorId.get('sectorId').setValue(0);
            this.f.subjectId.get('subjectId').setValue(0);
          });
      //this.f.centerId.get
     
      }

      public onChangeSubject(subjectId: number) {
        
        this.selectedSubject = subjectId;
   
      }
      public getSubjects = () => {
        this.subjectService.getByGradeId(this.selectedGrade)
          .subscribe((data) => {
            this.f.subjectId.get('subjectId').setValue(0);
            this.subjects = data;
          })
      }
  
      public onGradeChange(gradeId: number) {
   
        this.subjectService.getByGradeId(gradeId)
          .subscribe((data) => {
            this.subjects = data;
            this.baseSubjects = data;
            this.selectedSubjects = [];
            this.selectedGrade = gradeId;
            this.setSectorControl(); 
           
            // this.f.subjectId.get('subjectId').setValue(0);
          
            
          })
         // this.subjectId.nativeElement.value = 0;
          //this.subjectContent.nativeElement.value = 0;
          //this.startContent.nativeElement.value = '';
          //this.endDateCcontent.nativeElement.value = '';
          //this.f.sectorId.get('sectorId').setValue(0);
          //this.f.sectorId.get('sectorId').setValue(0);
      }
  setSectorControl() {
    this.f.sectorId.get('sectorId').setValue(0);
    this.f.subjectId.get('subjectId').setValue(0);
    this.f.startDate.get('startDate').setValue(new Date().toISOString()) ; 
    this.f.endExamDate.get('endExamDate').setValue(new Date().toISOString()) ;
    //throw new Error('Method not implemented.');
  }

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

      public onSubmit() {
        this.submitted = true;
         
        if (this.searchForm.invalid) return;
      
        this.getCenterAttendance();
      }
 
      public OverallCenterAttendance() {
        this.centerAttendanceService.overAllAttendance(this.searchForm.value)
        .subscribe((data) => {
          this.centerAttendances = data
          this.paginationService.setData(data)
          this.initForms();
        });
      }

      private initForms(): void {
        this.searchForm = this.formBuilder.group({
          sectorId: [this.selectedGrade ?? 0, []],
          subjectId: [this.selectedSubject ?? 0, [Validators.required]],
          testId: [this.testId ?? 0, 0],
          centerId: [this.centerId ?? 0, []],
          startDate: [ this.startDate?? new Date().toISOString(),[Validators.required]],
          endExamDate: [this.endExamDate?? '', [Validators.required]],
        });
        this.submitted = false;
      };
}
