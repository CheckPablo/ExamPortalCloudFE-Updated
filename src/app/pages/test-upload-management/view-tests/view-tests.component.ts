import { Component, QueryList, ViewChildren } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { TestService } from 'src/app/core/services/shared/test.service';
import { Subject } from 'src/app/core/models/subject';
import { TestTypeService } from 'src/app/core/services/shared/testType.Service';
import { TestType } from 'src/app/core/models/testType';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/core/models/test';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SortEvent, SortableHeaderDirective, compare } from 'src/app/core/directives/sortable-header.directive';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.css']
})
export class ViewTestsComponent {
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
  tests: Test[] = [];
  testTypes: TestType[] = [];
  testTypeId: number;
  searchTestsForm!: UntypedFormGroup;
  onViewTestClicked: boolean = false;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor( 
    private gradeService: GradesService,
    public  paginationService: PaginationService,
    private router: Router,
    private subjectService: SubjectService,
    private testTypeService: TestTypeService,
    private testService:TestService,
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private storageService: TokenStorageService,){}

    ngOnInit(): void {
      if (localStorage.getItem('currentgrade')) {
        let currentGrade = localStorage.getItem('currentgrade');
        //var cg: number =+currentGrade; 
        this.selectedGrade = Number(currentGrade);
        this.selectedGrade = JSON.parse(localStorage.getItem('currentgrade')); 
        this.paginationService.setData([])
        this.initForms();
         this.getGrades();
        this.getTestTypes();
        this.onSetSavedGradeParam(this.selectedGrade) 
    }
      else{
        this.paginationService.setData([])
        this.getGrades(); 
        this.getTestTypes();
        this.initForms();
        this.selectedGrade = 0; 
      }
    }

    get f() { return this.searchTestsForm.controls; }


    private getGrades() {
      const moment = require('moment');
      const today = moment();
      this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
        this.paginationService.onSearchInputChange(''); 
      });
    }
   
    private getTestTypes() {
      this.testTypeService.get()
        .subscribe((res) => {
          this.testTypes = res;
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
          this.baseSubjects = data;
          this.selectedSubjects = [];
          this.selectedGrade = gradeId; 
          this.storageService.saveSelectedGrade(String(this.selectedGrade))
          //this.filterBaseSubjects();
        })
    }

    public onChangeSubject(subjectId: number) { 
      this.selectedSubject = subjectId; 
    }

    private initForms(): void {      
      this.searchTestsForm = this.formBuilder.group({
        gradeId: [this.selectedGrade ?? '', [Validators.required]],
        subjectId: [this.selectedSubject ??'', []],
        testTypeId: [this.testTypeId ??'', []],
        /*fromDate: [this.datePipe.transform(new Date(), 'yyyy/MM/dd'), []],
        endDate: [this.datePipe.transform(new Date(), 'yyyy/MM/dd'), []],*/
        fromDate: [this.datePipe.transform(null, 'yyyy-MM-ddThh:mm'), []],
        endDate: [this.datePipe.transform(null, 'yyyy-MM-ddThh:mm'), []],
      });
      //this.setDefaultValue();
      this.submitted = false;  
    };
   
    public onSetSavedGradeParam(selectedGrade: number) {
      this.selectedGrade = selectedGrade;
      this.searchTestSavedParams(); 
    }

    onSort({ column, direction }: SortEvent) {
      
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
    
      if (direction === ''|| column ==='') {
        this.paginationService.paginatedData = this.paginationService.paginatedData;
    
      } else {
          const sorted = this.paginationService.paginatedData.sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
        this.paginationService.paginatedData = [...sorted];
      }
    }
    public onSubmit() { 
      this.submitted = true;
  
      if (this.searchTestsForm.invalid) return;
    
  
      this.testService.search(this.searchTestsForm.value)
       .subscribe((data) => {
          this.tests = data
          this.paginationService.setData(data)
          this.initForms();

       })
    }

    public searchTestSavedParams() {

      if (this.searchTestsForm.invalid) return;
    
  
      this.testService.search(this.searchTestsForm.value)
       .subscribe((data) => {
          this.tests = data
          this.paginationService.setData(data)
          this.initForms();

       })
      }

    public onViewTest(test: Test) {

      this.onViewTestClicked = true; 
      this.router.navigate(['/portal/testupload', test.id]);

    }

    ngOnDestroy()
    {
      if(!this.onViewTestClicked){
        
        this.storageService.removeSelectedGrade(); 
      }
  
    }
    
  }

