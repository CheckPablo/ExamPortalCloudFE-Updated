import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/shared/user.service';
import { User } from 'src/app/core/models/user';
import { TableService } from 'src/app/core/services/table.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { DecimalPipe } from '@angular/common';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { InvigilatorStudentLinkService } from 'src/app/core/services/shared/invigilatorStudentLink.services';
import { Grade } from 'src/app/core/models/grade';
import { Subject } from 'src/app/core/models/subject';
import Swal from 'sweetalert2';
import { StudentService } from 'src/app/core/services/shared/student.service';
import { SortableHeaderDirective, SortEvent, compare} from 'src/app/core/directives/sortable-header.directive'
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [TableService, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent implements OnInit {
  links: any[] = [];
  selectedStudentIds: number[] = [];
  submitted = false;
  users: User[] = [];
  grades: Grade[] = [];
  filter: string;
  subjects: Subject[] = [];
  selectedUser: any;
  selectedSubject: any;
  selectedGrade: any;
  form: FormGroup;
  loading = false;
  error!: any;

  // Table data
  tables$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  state: boolean = false;

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private userService: UserService,
    private gradeService: GradesService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private formBuilder: UntypedFormBuilder,
    public paginationService: PaginationService,
    private linkService: InvigilatorStudentLinkService,
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    
    
    this.paginationService.setData([]);
    this.service.searchTerm = '';
    this.getUsers();
    this.getGrades();
    this.getSubjects();
    this.initForms();
  }

  get f() { return this.form.controls; }


  public changeSubject(value: number) {
    this.selectedSubject = value;
  }

  private getUsers() {
    this.userService.getByCenter()
      .subscribe((res) => {
        
        this.users = res;
      });
  }

  public getGrades() {
    this.gradeService.get()
      .subscribe((res) => {
        
        this.grades = res;
      });
  }

  public getSubjects() {
     
    if (this.selectedGrade == 0 || this.selectedGrade == "undefined" || !this.selectedGrade)
    {
      return; 
    }
    if (this.selectedGrade != 0 || this.selectedGrade != "undefined") {
      this.subjectService.getByGradeId(this.selectedGrade)
        .subscribe((data) => {
          this.subjects = data;
        })
    }
    else {
      this.subjectService.get()
        .subscribe((res) => {
          
          this.subjects = res;
        });
    }
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      gradeDesc: ['', [Validators.required]],
      subjectDesc: ['', [Validators.required]],

    });

    this.submitted = false;
  }

  public isStudentSelected(studentId: number): boolean {
    return (this.selectedStudentIds.some(x => x === studentId))
  }

  isUserSelected = (optional) => {
    return optional === 0 ? true : this.state;
  }

  public onChangeUser(userId: number) {
    if (userId == 0) return;
    this.selectedUser = userId;
    //this.getStudents();     
  }

  public getStudents() {
     
     
    
    if(!this.selectedUser ||this.selectedUser ===  undefined){
      Swal.fire('User', 'Please select a user', 'error')
      return;
    }
  
    if (this.selectedGrade == 0||this.selectedGrade === undefined){
      Swal.fire('Grade', 'Please select a user', 'error')
      return;
    }
  
    if (this.selectedSubject == 0|| this.selectedSubject === undefined){
      Swal.fire('Subject', 'Please select a user', 'error')
      return;
    }
    if (this.selectedUser == null) return;
    if (this.selectedGrade == null) return;
    this.links = [];
    this.studentService.getInvigilatorLinks(this.selectedUser, this.selectedGrade, this.selectedSubject)
      .subscribe((data) => {
        this.links = data
        this.selectedStudentIds = []
        this.paginationService.setData(data)
        

        const linked = this.links.filter(x => x.linked);

        linked.forEach(x => {
          this.selectedStudentIds.push(x.studentId)
        });
      })
  }

  public onChangeGrade(gradeId: number) {
    if (gradeId == 0) return;
    this.selectedGrade = gradeId;
    this.getSubjects();
  }

  public onLinkClick() {
     
     
     
    if(!this.selectedUser){
      Swal.fire('User', 'Please select a user', 'error')
      return;
    }
  
    if (this.selectedGrade == 0|| this.selectedGrade == "undefined"){
      Swal.fire('User', 'Please select a user', 'error')
      return;
    }
  
    if (this.selectedSubject == 0|| this.selectedSubject == "undefined"){
      Swal.fire('User', 'Please select a user', 'error')
      return;
    }

    if (!this.selectedUser || !this.selectedStudentIds.length) return;

    this.linkService.linkInvigilator(this.selectedUser, this.selectedStudentIds)
      .subscribe(() => {
        this.links = [];
        this.selectedStudentIds = [];
        this.paginationService.setData([]);
        Swal.fire('Linking Success', 'Students were successfully linked', 'success');
      })
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

  /*public onSort(a: any) {
    
  }*/

  public onStudentClick(studentId: number) {
    if (this.selectedStudentIds.find(x => x == studentId)) {
      this.selectedStudentIds = this.selectedStudentIds.filter(x => x != studentId)
    } else {
      this.selectedStudentIds.push(studentId);
    }
  }

  public onSubmit() {
    

    // if (this.form.invalid) {return;}

    this.linkService.create(this.form.value)
      .subscribe(() => {
        this.getGrades();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Students Linked', 'Student was successfully linked.', 'success');
      });
  }

  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.lg);
  }
}
