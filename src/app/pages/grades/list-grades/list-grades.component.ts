
import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Grade } from 'src/app/core/models/grade';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { TableService } from 'src/app/core/services/table.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SortableHeaderDirective, SortEvent, compare} from 'src/app/core/directives/sortable-header.directive'
import { PaginationService } from 'src/app/core/services/pagination.service';
//import { HttpErrorResponse } from '@angular/common/http';
//import { ErrorInterceptor } from 'src/app/core/helpers/error.interceptor';

@Component({
  selector: 'app-list-grades',
  templateUrl: './list-grades.component.html',
  styleUrls: ['./list-grades.component.css'],
  providers: [TableService, DecimalPipe]
})
export class ListGradesComponent implements OnInit {
  grades: Grade[] = [];
  filter: string;
  data: Array<Grade>;
  isAllSelected = false;
  isPageLoaded = false;
  submitted = false;
  returnUrl: string;
  TableData: any;
  //GRADEDATASORT: Grade;
  form: FormGroup;
  loading = false;
  error!: any;
  // Table data
  tables$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  content: string;
  title: string;
  show: boolean;
  showModal: boolean;
  message: string;

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private gradeService: GradesService, 
    private formBuilder: UntypedFormBuilder,
    public paginationService: PaginationService,
    //private errorHandler: ErrorInterceptor,

  ) {
  }

  ngOnInit(): void {
    this.paginationService.setData([]);
    this.getGrades();  
    this.initForms();
  }

  get f() { return this.form.controls; }

  public getGrades()
  {
    this.gradeService.get()
      .subscribe((res) => {
        
        this.grades = res;
        this.paginationService.setData(res);
        this.paginationService.onSearchInputChange(''); 
        this.TableData = res;
      });
  }

  currentSortKey: string = ''; // Keeps track of the current sort column
  sortDirection: string = 'asc'; // 'asc' for ascending, 'desc' for descending
 
  
  sortColumns(column:string){
   this.paginationService.setSortConfig(column, 'desc'); 
   this.paginationService.paginate(); 
  }
  sort(column: string) {
    if (this.currentSortKey === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortKey = column;
      this.sortDirection = 'asc';
    }

    this.grades.sort((a, b) => {
      if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private initEditForms(grade: Grade): void {
    this.form = this.formBuilder.group({
      id: [grade.id, [Validators.required]],
      code: [grade.code, [Validators.required]],
      description: [grade.description, [Validators.required]],
    });
    this.submitted = false;
  }

  private initForms(): void {
    this.paginationService.setData([])
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  
    this.submitted = false;
  }

  public onDeleteGrade(grade: Grade) {
    Swal.fire({
      title: 'Are you sure you want to delete this grade?',
      text: 'This will also delete any subjects and students linked to this grade.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.gradeService.delete(grade.id)
          .subscribe(() => {
            this.getGrades();
            Swal.fire('Grade Deleted', 'Grade deleted successfully.', 'success');
          });
      }
    });
  }

  public onEditSubmit() {
    this.submitted = true;
     
    if (this.form.invalid) {return;}

   /*  const newGradeCode = this.form.value.code;
    const existingGrade = this.grades.find(grade => grade.code === newGradeCode);

    if (existingGrade) {
        Swal.fire('Error', 'Grade with this code already exists.', 'error');
        return;
    }
 */
    this.gradeService.update(this.f['id'].value, this.form.value)
    .subscribe({next: (value: any) => {
      this.getGrades();
      this.initForms();
      this.modalService.dismissAll();
      Swal.fire('Grade Updated', 'Grade information updated.', 'success');
       },
      error: (error: any) => { 
      console.log(error); 
      this.title = "Add grade unsuccessful";
      this.message = 'Grade Already Exists';
      this.showModal = true;
      return; 
      },
      complete: () => { }
    });
  }
  /**
 *Sortable Table
 * '@param' param0
 */
/*onSort$({column, direction}: SortEvent) {

  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  // sorting employeeSortable
  if (direction === '') {
    //this.grades = this.GRADEDATASORT;
  } else {
    this.grades.sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}*/

onSort({ column, direction }: SortEvent) {
  
  //resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  if (direction === ''|| column ==='') {
    //this.grades = this.grades;
    //this.grades = this.grades; 
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

    if (this.form.invalid) {return;}

    this.gradeService.create(this.form.value).subscribe({
      next: (value: any) => {
        console.log(value); 
        this.getGrades();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Grade Saved', 'Grade information saved. You may capture a new grade.', 'success');
       },
      error: (error: any) => { 
      console.log(error); 
      this.title = "Add grade unsuccessful";
      this.message = 'Grade Already Exists';
      this.showModal = true;
      return; 
      },
      complete: () => { }
    });
      /* .subscribe((data) => {
        console.log(data); 
        this.getGrades();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Grade Saved', 'Grade information saved. You may capture a new grade.', 'success');
      }, ); */
    }
 

  public openUpdateModal(modal,grade: Grade) {
    this.initEditForms(grade); 
    this.modalService.open(modal, ModalSizes.lg);
  }

  public openModal(modal: any) {
    this.form.reset(); 
    this.modalService.open(modal, ModalSizes.lg);
  }
}


