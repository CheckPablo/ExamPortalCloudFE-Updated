import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/core/services/shared/student.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/core/models/student';
import { TableService } from 'src/app/core/services/table.service';
import { DecimalPipe } from '@angular/common';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { Grade } from 'src/app/core/models/grade';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { Subject } from 'src/app/core/models/subject';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.component.html',
  styleUrls: ['./search-students.component.css'],
  providers: [TableService, DecimalPipe]
})
export class SearchStudentsComponent {
  selectedStudentIds: number[] = [];
  searchForm!: UntypedFormGroup;
  students: Student[] = [];
  studentMailList: [];
  selectedSubject: number;
  selectedGrade: number;
  selectedGradeOnViewStudent: number;
  isAllSelected = false;
  onViewStudentClicked: boolean = false;
  grades: Grade[] = [];
  isPageLoaded = false;
  subjects: Subject[];
  submitted = false;
  returnUrl: string;
  itemsPerPage = 10;
  loading = false;
  pageNumber = 1;
  multiplier = 1;
  error!: any;


  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'studentsTable',
  }
  total: number;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public paginationService: PaginationService,
    private gradeService: GradesService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private formBuilder: UntypedFormBuilder,
    private exportAsService: ExportAsService,
    private storageService: TokenStorageService,

  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentgrade')) {
      let currentGrade = localStorage.getItem('currentgrade');
      this.selectedGrade = Number(currentGrade);
      this.selectedGrade = JSON.parse(localStorage.getItem('currentgrade'));
      console.log(this.paginationService.paginatedData) // this log is here ot check why the table sometimes stretches by ten empty rows
      console.log(this.paginationService.pageSize) // this log is here ot check why the table sometimes stretches by ten empty rows
      this.paginationService.setData([])
      this.initForms();
      this.onSetSavedGradeParam(this.selectedGrade)
      this.getGrades();;
    }
    else {
      this.paginationService.setData([])
      this.initForms();
      this.getGrades();
      this.selectedGrade = 0;
    }
  }

  get f() { return this.searchForm.controls; }

  public generateCredentialsAsync(modal: any) {
    this.studentService.createLoginCredentials(this.selectedStudentIds)
    .subscribe((studentMailList) => {
      this.studentMailList = studentMailList;
      this.isAllSelected = false;
      this.total = this.selectedStudentIds.length;
      this.selectedStudentIds = [];
      this.openModal(modal);
      })
  }

  private getGrades() {
    this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
        this.paginationService.onSearchInputChange('');
      });
  }

  public getStudents() {
    this.students = [];
    this.studentService.get()
      .subscribe((res) => {
        this.students = res;
        this.paginationService.setData(res);
      });
  }

  public getSubjects() {
    if (this.selectedGrade != 0 || undefined) {
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
    this.searchForm = this.formBuilder.group({
      gradeId: [this.selectedGrade ?? '', [Validators.required]],
      subjectId: [this.selectedSubject ?? '', []],
      name: ['', []],
    });
    this.submitted = false;
  }



  public isStudentSelected(studentId: number): boolean {
    return (this.selectedStudentIds.some(x => x === studentId))
  }

  public onDeleteStudent(student: Student) {
    Swal.fire({
      title: 'Are you sure you want to delete this student?',
      text: 'This will also delete any links to this student.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.studentService.delete(student.id)
          .subscribe(() => {
            Swal.fire('Student Deleted', 'Student deleted successfully.', 'success');
            this.onSubmit();
          });
      }
    });
  }

  public onChangeGrade(gradeId: number) {
    if (gradeId == 0) return;
    this.selectedGrade = gradeId;
    this.storageService.saveSelectedGrade(String(this.selectedGrade))

    this.getSubjects();
  }

  public onSetSavedGradeParam(gradeId: number) {
    this.selectedGrade = gradeId;
    this.searchStudentsSavedParams();
    this.getSubjects();
  }

  public onChangeSubject(subjectId: number) {
    this.selectedSubject = subjectId;

  }

  public onSetSavedSubjectParam(subjectId: number) {
    this.selectedSubject = subjectId;
  }

  public onExportClick() {
    this.exportAsService.save(this.exportAsConfig, 'Students Export').subscribe(() => {
    });
  }

  public onSelectAll() {
    this.isAllSelected = !this.isAllSelected
    this.selectedStudentIds = []

    if (this.isAllSelected) {
      this.paginationService.searchedData.forEach(student => {
        this.selectedStudentIds.push(student.id)
      });
    }
  }

  public onSort(a: any) {

  }

  public onStudentClick(studentId: number) {
    if (this.selectedStudentIds.find(x => x == studentId)) {
      this.selectedStudentIds = this.selectedStudentIds.filter(x => x != studentId)
    } else {
      this.selectedStudentIds.push(studentId);
    }
  }

  public onSubmit() {

    this.submitted = true;

    if (this.searchForm.invalid) return;


    this.studentService.search(this.searchForm.value)
      .subscribe((data) => {
        this.students = data
        console.log(this.students)
        this.paginationService.setData(data)
        this.initForms();
      })
  }

  public searchStudentsSavedParams() {

    if (this.searchForm.invalid) return;

    this.studentService.search(this.searchForm.value)
      .subscribe((data) => {
        this.students = data
        console.log(data) // this log is here ot check why the table sometimes stretches by ten empty rows
        this.paginationService.setData(data)
        this.initForms();
      })
  }

  public onViewStudent(student: Student) {
    this.onViewStudentClicked = true;
    this.selectedGradeOnViewStudent = this.selectedGrade;
    this.router.navigate(['/portal/students/view-student', student.id]);
  }

  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.md);
  }

  public searchStudents() {
    this.studentService.getUrl(`search-students?` + `sectorId=${this.selectedGrade}`)
      .subscribe((res) => {
        this.selectedStudentIds = [];
        this.isAllSelected = false;
        this.students = res;
      });
  }

  public sendLoginCredentialsAsync(modal: any) {
    this.studentService.sendLoginCredentials(this.selectedStudentIds)
    .subscribe((studentMailList) => {
      this.studentMailList = studentMailList;
      this.isAllSelected = false;
      this.total = this.selectedStudentIds.length;
      this.selectedStudentIds = [];
      this.openModal(modal);
      })
  }

  ngOnDestroy() {
    if (!this.onViewStudentClicked) {
      this.storageService.removeSelectedGrade();
    }
  }
}
