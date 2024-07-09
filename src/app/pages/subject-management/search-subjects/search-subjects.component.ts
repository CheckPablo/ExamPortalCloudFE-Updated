import { Subject } from 'src/app/core/models/subject';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit,QueryList, ViewChildren } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/core/directives/advanced-sortable.directive';
import { Grade } from 'src/app/core/models/grade';
import { GradesService } from 'src/app/core/services/shared/grades.service'; 
import { TableService } from 'src/app/core/services/table.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SortableHeaderDirective, compare } from 'src/app/core/directives/sortable-header.directive';
import { PaginationService } from 'src/app/core/services/pagination.service';


@Component({
  selector: 'app-search-subjects',
  templateUrl: './search-subjects.component.html',
  styleUrls: ['./search-subjects.component.css'],
  providers: [TableService, DecimalPipe]
})
export class SearchSubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  grades: Grade[] = [];
  filter: string;
  isPageLoaded = false;
  submitted = false;
  returnUrl: string;
  form: FormGroup;
  loading = false;
  error!: any;
  // Table data
  tables$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  updatedSelected = false; 
  isLinkToAll= false; 
  title: string;
  message: string;
  showModal: boolean;
  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private subjectService: SubjectService,    
    private gradeService: GradesService, 
    private formBuilder: UntypedFormBuilder,
    public paginationService: PaginationService,
  ) 
  {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
   }

  ngOnInit(): void {
    this.paginationService.setData([]);
    this.getSubjects();
    this.getGrades();
    this.initForms();
  }
  get f() { return this.form.controls; }

  public onEditSubmit() {
    this.submitted = true;
    const checkbox = document.getElementById(
      'chkLinktoAll',
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      this.isLinkToAll = true;
       
    }
    else{
      this.isLinkToAll = true;
 
       
       
    }
   
     
     
    if (this.form.invalid) {return;}

   if(!this.isLinkToAll){
    
    this.subjectService.update(this.f['id'].value, this.form.value)
    .subscribe(() => {
      this.getSubjects();
      this.initForms();
      this.modalService.dismissAll();
      Swal.fire('Subject Updated', 'Subject information updated.', 'success');
    });
  }
  else{
    this.subjectService.UpdateSubjectLinkToAllStudents(this.f['id'].value,this.form.value)
    .subscribe(() => {
      this.getSubjects();
      this.initForms();
      this.modalService.dismissAll();
      Swal.fire('Subject Saved', 'Subject information saved.', 'success');
    });
  }
}


  public getGrades(){
    this.gradeService.get()
    .subscribe((res) => {
      
      this.grades = res;
      //this.paginationService.setData(res);
    });
  }

  public getSubjects()
  {
    this.subjectService.get()
    .subscribe((res) => {
      
      this.subjects = res;
      this.paginationService.setData(res);
      this.paginationService.onSearchInputChange(''); 
    });     
  }

  private initEditForms(subject: Subject): void {
    this.form = this.formBuilder.group({
      id: [subject.id, [Validators.required]],
      code: [subject.code, [Validators.required]],
      sectorId: [subject.sectorId, [Validators.required]],
      description: [subject.description, [Validators.required]],
    });
    this.submitted = false;
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required]],
      sectorId: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  
    this.submitted = false;
  }

    public linkSubjectToAllStudents(event:any): void {
        if (event.target.checked == true) {
      this.isLinkToAll = true;
       
    } else {
      
      this.isLinkToAll = false;
    }
    //return (this.selectedStudentIds.some(x => x === studentId))
  }

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
  /*public onSort(a: any) {
        
  }*/
  public onDeleteSubject(subject: Subject) {
    Swal.fire({
      title: 'Are you sure you want to delete this subject?',
      text: 'This will also delete any links to this subject.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        
        this.subjectService.delete(subject.id)     
          .subscribe(() => {
            this.getSubjects();
            Swal.fire('Subject Deleted', 'Subject deleted successfully.', 'success');
          });
      }
    });
  }

  public onSubmit() {
    this.submitted = true;  
   
    const checkbox = document.getElementById(
      'chkLinktoAll',
    ) as HTMLInputElement | null;
    if (checkbox != null) {
     
     this.isLinkToAll = false;
     console.log("checkbox is not null, checkbox set to true");
     console.log(this.isLinkToAll);
    }
    else{
      this.isLinkToAll = true;
      console.log("checkbox is not null, checkbox set to true");
      console.log(this.isLinkToAll);
    }
   
    if (this.form.invalid) {return;}

    if(!this.isLinkToAll){
      console.log("creating new subject under", '!this.isLinkToAll')
      this.subjectService.create(this.form.value).subscribe({
        next :(data:any) =>{
        this.getSubjects();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Subject Saved', 'Subject information saved.', 'success');
        }, 
        error:(error:any)=>{
          console.log(error, "creating new subject under '!this.isLinkToAll'")
          this.title = "Add/Update unsuccessful";
          this.message = 'The specified subject code and subject code already exists';
          this.showModal = true;
        }, 
        complete:()=>{}
      })
     /*  .subscribe(() => {
         this.getSubjects();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Subject Saved', 'Subject information saved.', 'success');
      }); */
    }
      else{
        console.log("creating new subject and this.isLinkToAll is true")
        this.subjectService.LinkSubjectToAllStudents(this.form.value).subscribe({
          next :(data:any) =>{
          this.getSubjects();
          this.initForms();
          this.modalService.dismissAll();
          Swal.fire('Subject Saved', 'Subject information saved.', 'success');
          }, 
          error:(error:any)=>{
            this.title = "Add/Update unsuccessful";
            this.message = 'The specified subject code and subject code already exists';
            this.showModal = true;
          }, 
          complete:()=>{}
        })
    /*   .subscribe(() => {
        this.getSubjects();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Subject Saved', 'Subject information saved.', 'success');
      }); */
      }
  }

  public openUpdateModal(modal,subject: Subject) {
    this.initEditForms(subject); 
    this.modalService.open(modal, ModalSizes.lg);
  }

  public openModal(modal: any) {
    this.form.reset(); 
    this.modalService.open(modal, ModalSizes.lg);
  }
}
