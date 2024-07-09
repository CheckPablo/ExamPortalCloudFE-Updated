import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-form-repeater',
  templateUrl: './form-repeater.component.html',
  styleUrls: ['./form-repeater.component.css']
})
export class FormRepeaterComponent implements OnInit {

  @BlockUI('repeatingForms') blockUIRepeatingForms: NgBlockUI;
  @BlockUI('projectInfo') blockUIProjectInfo: NgBlockUI;

  options = {
    minimize: true,
    reload: true,
    expand: true,
    close: true
  };

  repeatForm: FormGroup;
  projectInfoForm: FormGroup;
  userProfileForm: FormGroup;
  public repeatList: FormArray;
  public projectList: FormArray;
  public userList: FormArray;

  professions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  hobby = ['design', 'development', 'illustration', 'branding', 'video'];
  budget = ['Budget', 'less than 5000$', '5000$ - 10000$', '10000$ - 20000$', 'more than 20000$'];

  public breadcrumb: any;

  get repeatFormGroup() {
    return this.repeatForm.get('repeatArray') as FormArray;
  }
  get projectFormGroup() {
    return this.projectInfoForm.get('projectArray') as FormArray;
  }
  get userFormGroup() {
    return this.userProfileForm.get('userArray') as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Form Repeater',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form Repeater',
          'isLink': true,
          'link': '#'
        },
      ]
    };

    this.repeatForm = this.formBuilder.group({
      repeatArray: this.formBuilder.array([this.createRepeat()])
    });

    this.repeatList = this.repeatForm.get('repeatArray') as FormArray;

    this.projectInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      hobby: ['', Validators.required],
      budget: ['', Validators.required],
      projectArray: this.formBuilder.array([this.createFile()]),
      comment: ['', Validators.required]
    });

    this.projectList = this.projectInfoForm.get('projectArray') as FormArray;

    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      userArray: this.formBuilder.array([this.createPhone()]),
      occuption: ['', Validators.required],
      bio: ['', Validators.required],
    });

    this.userList = this.userProfileForm.get('userArray') as FormArray;
  }

  createRepeat(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      bio: ['', Validators.required],
      phone: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }
  createFile(): FormGroup {
    return this.formBuilder.group({
      file: ['', Validators.required]
    });
  }
  createPhone(): FormGroup {
    return this.formBuilder.group({
      phone: ['', Validators.required]
    });
  }
  addRepeat() {
    this.repeatList.push(this.createRepeat());
  }
  addFile() {
    this.projectList.push(this.createFile());
  }
  addPhone() {
    this.userList.push(this.createPhone());
  }
  removeRepeat(index) {
    this.repeatList.removeAt(index);
  }
  removeFile(index) {
    this.projectList.removeAt(index);
  }
  removePhone(index) {
    this.userList.removeAt(index);
  }
  getRepeatFormGroup(index): FormGroup {
    const formGroup = this.repeatList.controls[index] as FormGroup;
    return formGroup;
  }
  getProjectFormGroup(index): FormGroup {
    const formGroup = this.projectList.controls[index] as FormGroup;
    return formGroup;
  }
  getUserFormGroup(index): FormGroup {
    const formGroup = this.userList.controls[index] as FormGroup;
    return formGroup;
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.projectInfoForm.patchValue({
          file: reader.result
        });
        this.cd.markForCheck();
      };
    }
  }

  reloadRepeatingForms() {
    this.blockUIRepeatingForms.start('Loading..');

    setTimeout(() => {
      this.blockUIRepeatingForms.stop();
    }, 2500);
  }

  reloadProjectInfo() {
    this.blockUIProjectInfo.start('Loading..');

    setTimeout(() => {
      this.blockUIProjectInfo.stop();
    }, 2500);
  }
}
