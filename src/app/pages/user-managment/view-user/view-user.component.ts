import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CenterType } from 'src/app/core/models/centerType';
import { User } from 'src/app/core/models/user';
import { CenterTypeService } from 'src/app/core/services/shared/centerType.service';
import { UserService } from 'src/app/core/services/shared/user.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  centerType: CenterType;
  contactDetails:string;
  form: FormGroup;
  resetPasswordForm: FormGroup;
  saveButtonClicked = false; 
  submitted = false;
  userId!: string;
  user?: User;
  name:string;
  surname: string;
  userEmailAddress:string;
  numbernumberOfCandidatesOf:number;
  centerTypeId:number;
  


  constructor(
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private centerTypeService: CenterTypeService,
  ) {
    this.router.params
      .subscribe((p) => {
        this.userId = p['id']
      })  
  }

  ngOnInit(): void {
    this.initForms();
    this.getUser();
    //this.getCenterTypes(); 
  }

  get f() { return this.form.controls; }
  get g() { return this.resetPasswordForm.controls; }


  private getCenterTypes() {
    this.centerTypeService.get()
      .subscribe((data) => {
        //this.centerType = data;
        //.initEditForm(data);
      })
  }

  private getUser() {
    this.userService.getById(this.userId)
      .subscribe((data) => {
        this.user = data;
        this.initEditForm(data);
      })
  }

  private initEditForm(user?: User): void {
    this.form = this.formBuilder.group({
      id: [user.id, [Validators.required]],
      centerId:[user.center.id, [Validators.required]],
      username: [user?.username ?? '', [Validators.required]],
      name: [user?.name ?? '', [Validators.required]],
      surname: [user?.surname ?? '', [Validators.required]],
      contactDetails: [user?.contactDetails ?? '', [Validators.required]],
      userEmailAddress: [user?.userEmailAddress ?? '', [Validators.required, Validators.email]],
      numberOfCandidates: [user?.numberOfCandidates ?? 1,[Validators.required]],
      centerTypeId: [user.center.centerType.id ?? '', [Validators.required]],
    });
    this.resetPasswordForm = this.formBuilder.group({
      id: [user.id, [Validators.required]],
      password: ['', [Validators.required]],
      
    });

    this.submitted = false;

    //if (student) this.onGradeChange(student.gradeId);
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      centerId: ['', [Validators.required]],
      username: [ '', [Validators.required]],
      name: ['', [Validators.required]],
      surname: [ '', [Validators.required]],
      contactDetails: [ '', [Validators.required]],
      userEmailAddress: [ '', [Validators.required, Validators.email]],
      numberOfCandidates: [ '',[Validators.required]],
      centerTypeId: ['', [Validators.required]],
    });
    this.resetPasswordForm = this.formBuilder.group({
      id: [ '', [Validators.required]],
      password: ['', [Validators.required]],
      
    });
    this.submitted = false;

    //if (student) this.onGradeChange(student.gradeId);
  }
  public onEditSubmit() {
    this.submitted = true;
  
    
    
    //if (this.form.invalid) {return;}
    //this.userService.update(this.f['id'].value, this.form.value)
    this.userService.update(this.user?.id, this.form.value)
    .subscribe(() => {
      //this.getSubjects();
      this.initForms();
      this.modalService.dismissAll();
      Swal.fire('User Updated', ' information updated.', 'success');
    });
  }
  
  public onSubmit() {
    this.submitted = true;
  
    
    
    if (this.resetPasswordForm.invalid) {return;}
 
    this.userService.resetPassword(this.resetPasswordForm.value)
      .subscribe(() => {
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Password reset sucessfully', 'Reset has been successful.', 'success');
      });
  }

  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.sm);
  }
}
