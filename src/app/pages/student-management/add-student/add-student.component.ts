import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Grade } from 'src/app/core/models/grade';
import { Region } from 'src/app/core/models/region';
import { Student } from 'src/app/core/models/student';
import { Subject } from 'src/app/core/models/subject';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { RegionService } from 'src/app/core/services/shared/region.service';
import { StudentService } from 'src/app/core/services/shared/student.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  @ViewChild("spinnerLoaderModalStudent") content;
  activeTabId = 1;
  active: number;
  selectedSubjects: Subject[] = [];
  studentSubjects: Subject[] = [];
  baseSubjects: Subject[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];
  regions: Region[] = [];
  grades: Grade[] = [];
  isPageLoaded = false;
  studentId?: string;
  submitted = false;
  itemsPerPage = 10;
  returnUrl: string;
  student: Student;
  form: FormGroup;
  loading = false;
  pageNumber = 1;
  error!: any;
  studentCenterId: number;
  isMoveAllToSource: boolean = false;
  spinnerDuration = 500;
  closeResult: string;
  modalReference: NgbModalRef;
  title: string;
  message: string;
  showModal: boolean;
  mailData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private gradeService: GradesService,
    private regionSerbice: RegionService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.route.params
      .subscribe((p) => {
        this.studentId = p['id']
        this.getStudent()
      })
  }

  ngOnInit(): void {
    this.getStudentSubjects()
    this.getRegions()
    this.getGrades()
    this.initForms()
  }

  get f() { return this.form.controls; }

  public displayStudentInfoTab() {
    this.active = 1;
  }
  public setActiveTab() {
    this.active = 2;
  }

  private filterBaseSubjects() {
    if (!this.baseSubjects.length || !this.studentSubjects.length) return;

    this.studentSubjects.forEach(ss => {
      const fromBase = this.baseSubjects.find(x => x.id === ss.id)

      if (fromBase) {
        this.moveToTarget(fromBase)
      }
    });
  }

  private getGrades() {
    this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
      });
  }

  private refilterBaseSubjects() {
    if (!this.baseSubjects.length || !this.studentSubjects.length) return;

    this.studentSubjects.forEach(ss => {
      const fromBase = this.baseSubjects.find(x => x.id === ss.id);
    });

  }

  private getStudent() {
    //alert("getting student"); 
    if (!this.studentId) return;

    this.studentService.getById(this.studentId)
      .subscribe((data) => {
        this.student = data;
        this.initForms(data);
      })
  }

  private getStudentSubjects() {
    if (!this.studentId) return;

    this.subjectService.getUrl(`get-by-student/${this.studentId}`)
      .subscribe((data) => {
        this.studentSubjects = data;
        if (!this.isMoveAllToSource) {

          this.filterBaseSubjects();
        }
        else {
          this.refilterBaseSubjects();
        }
      });
  }

  private getRegions() {
    this.regionSerbice.get()
      .subscribe((data) => {
        this.regions = data;
      })
  }

  private initForms(student?: Student): void {
    this.form = this.formBuilder.group({
      name: [student?.name ?? '', [Validators.required]],
      surname: [student?.surname ?? '', [Validators.required]],
      idNumber: [student?.idNumber ?? '', [Validators.required]],
      studentNo: [student?.studentNo ?? '', [Validators.required]],
      emailAddress: [student?.emailAddress ?? '', [Validators.required, Validators.email]],
      contactNo: [student?.contactNo ?? ''],
      gradeId: [student?.gradeId ?? '', [Validators.required]],
      password: [{ value: student ? '[Encryped]' : '', disabled: true }],
      //examNo: [{value: student?.examNo ?? '', disabled: true}],// disabled attributed dont post to the server so edit wont work. 
      examNo: [student?.examNo ?? '', []],
      regionId: [student?.regionId ?? '', [Validators.required]],
      externalEmail: [student?.externalEmail ?? '', [Validators.email]],
      //eligibleForExternalLogin:[, []],
      eligibleForExternalLogin: [student?.eligibleForExternalLogin ?? false, []]
    });

    this.submitted = false;

    if (student) this.onGradeChange(student.gradeId);
  }

  onCheck() {
    this.form.value['eligibleForExternalLogin'] = !this.form.value['eligibleForExternalLogin']

  }

  public moveAllToSource() {
    this.isMoveAllToSource = true;
    this.baseSubjects = this.subjects;
    this.selectedSubjects = [];
  }

  public moveAllToTarget() {
    this.setMoveSubjectsBoolean();

    this.selectedSubjects = this.subjects;
    this.baseSubjects = [];
  }

  public moveToSource(subject: Subject) {

    this.setMoveSubjectsBoolean();
    this.baseSubjects.push(subject);
    this.selectedSubjects = this.selectedSubjects.filter(x => x.id !== subject.id);
  }

  public moveToTarget(subject: Subject) {
    console.log("Move to target line 198"); 
    console.log(this.studentId); 
    this.setMoveSubjectsBoolean();

    this.selectedSubjects.push(subject);
    this.baseSubjects = this.baseSubjects.filter(x => x.id !== subject.id);
    console.log("Selected Subjects line 203", this.selectedSubjects); 
    console.log("Base Subjects line 204", this.baseSubjects); 
    console.log("Move to target line 206"); 
    console.log(this.studentId); 
  }

  private onGradeChange(gradeId: number) {
    this.subjectService.getByGradeId(gradeId)
      .subscribe((data) => {
        this.subjects = data;
        this.baseSubjects = data;
        this.selectedSubjects = [];
        this.filterBaseSubjects();
      })
  }

  public onLinkClick() {
    console.log(this.studentId); 
    this.checkStudentId(); 
    if (this.isMoveAllToSource == true) {
      console.log("216")
      this.delinkAllStudentSubjects();
      return;
    }

    else {
      console.log("223")
      console.log(this.studentId); 
     
      this.studentService.linkSubjects(this.selectedSubjects, this.studentId)
        .subscribe(() => {
          Swal.fire('Student Subjects Linked', 'The subjects have been linked to the student.', 'success');
          this.getStudent();
          this.getStudentSubjects()
        })

      this.setMoveSubjectsBoolean();
    }
  }

  checkStudentId() {
   if(!this.studentId)
   {
    this.studentId = JSON.parse(localStorage.getItem('newStudentId')); 
    console.log(this.studentId); 
   }
  }

  public delinkAllStudentSubjects() {

    if (this.studentId) {
      this.studentService.delinkSubjects(this.baseSubjects, this.studentId)
        .subscribe(() => {
          Swal.fire('Student subjects links have been removed', 'The subjects links have been removed.', 'success');
          this.getStudent();
          this.getStudentSubjects()
        })
    }
  }

  public onSubmit($event: MouseEvent) {
    this.submitted = true;

    if (this.form.invalid) { return; }
    this.open(this.content)
    console.log(this.student);
    if (!this.student) {
      console.log(this.student); 
      console.log("if not student"); 
      this.studentService.create(this.form.value).subscribe({
        next: (data:Student) =>{
          //data.map
          this.mailData = data; 
          this.student = data; 
          this.studentId = String(this.student[0].id); 
          console.log(this.studentId)
          //console.log(JSON.stringify(data)); 
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          Swal.fire('Student Information Saved', 'Student information saved and has been sent to the student via email. You may now link subjects to the student.', 'success');
          //this.studentId = JSON.stringify(data.id); 
          //this.initForms();
          localStorage.setItem('newStudentId',this.studentId)
          this.getStudent(); 
          this.router.navigate(['/portal/students/view-student', this.studentId]);

        },error:(error:any) =>{
          console.log(error); 
          /* this.title = "Add/Update unsuccessful";
          this.message = 'The specified student number already exists';
          this.showModal = true; */ 
          this.closeSpinnerModal(this.modalReference)
          
          if(error.message[0] =="This center has reached its student license limit. Please contact support to renew"){
            Swal.fire('Student Information Not Saved',error.message[0], 'error');
            return; 
          }
          else{
            Swal.fire('Student Information Not Saved', 'The specified student number already exists.', 'error');
            return; 
          }
        },  complete:() =>{ this.mailStudent(this.mailData)}
      
      });
       /*  .subscribe((data) => {
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          Swal.fire('Student Information Saved', 'Student information saved and has been sent to the student via email. You may now link subjects to the student.', 'success');
          this.initForms();
          this.router.navigate(['/portal/students/view-student', data.id]);
        }); */
    } else {
      const payload = this.form.value;

      payload.id = this.student.id;

      payload.centerId = this.student.centerId;

      this.studentService.updateUrl(`${payload.id}/update-student`, payload).subscribe({
        next: (data:any) =>{
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          Swal.fire('Student Information Updated', 'Student information has been updated.', 'success');
          this.router.navigate(['/portal/students/view-student', data.id]);
        }, 
        error:(error:any) =>{
        console.log(error); 
        this.title = "Add/Update unsuccessful";
        this.message = 'The specified student number already exists';
        this.showModal = true;
        return; 
          //The specified student number already exists
        }, 
        complete:() =>{}
      }); 
       /*  .subscribe((data) => {
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          Swal.fire('Student Information Updated', 'Student information has been updated.', 'success');
          this.router.navigate(['/portal/students/view-student', data.id]);
        }); */
    }
  }
  mailStudent(mailData:any) {
    //console.log(JSON.stringify(mailData));
    console.log(mailData);
    const mail = mailData.map((s) => s.emailAddress);
    const exNo = mailData.map((s) => s.examNo);
    const pwd  = mailData.map((s) => s.plainPassword);
    const name = mailData.map((s) => s.name);
    console.log(mail + '   '+ exNo +'   '+pwd +' '+ name);
    const payload = {
      emailAddress: String(mail),
      ExamNo:String(exNo),
      Password:String(pwd),
      Name:String(name), 
    }
     console.log(payload)
    this.studentService.sendEmail(payload).subscribe({
      next: (data:any) =>{
        console.log(data); 
      },
      error:(error:any) =>{
        console.log(error); 
        return; 
          //The specified student number already exists
        }, 
        complete:() =>{}


    })
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, () => {
      this.closeResult = `Dismissed `;
    });

  }

  public closeSpinnerModal(modalReference) {
    modalReference.dismiss();
  }

  public setMoveSubjectsBoolean() {

    this.isMoveAllToSource = false;
  }
  ngOnDestroy() {
    this.setMoveSubjectsBoolean();
  }
}
