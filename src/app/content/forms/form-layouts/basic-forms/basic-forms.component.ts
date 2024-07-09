import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-basic-forms',
  templateUrl: './basic-forms.component.html',
  styleUrls: ['./basic-forms.component.css']
})
export class BasicFormsComponent implements OnInit {

  @ViewChild('f', { read: true }) userProfileForm: NgForm;

  model: any = {};

  @BlockUI('projectInfo') blockUIProjectInfo: NgBlockUI;
  @BlockUI('userProfile') blockUIUserProfile: NgBlockUI;

  options = {
    minimize: true,
    reload: true,
    expand: true,
    close: true
  };
  public breadcrumb: any;

  projectInfo: FormGroup;
  userProfile: FormGroup;
  issueTracking: FormGroup;
  timeSheet: FormGroup;
  complaintForm: FormGroup;
  donation: FormGroup;
  eventRegistration1: FormGroup;
  eventRegistration2: FormGroup;

  submitted = false;

  interestedIn = ['design', 'development', 'illustration', 'branding', 'video'];
  budget = ['less than 5000$', '5000$ - 10000$', '10000$ - 20000$', 'more than 20000$'];
  priority = ['Low', 'Medium', 'High'];
  status = ['Not Started', 'Started', 'Fixed'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Basic Forms',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form Layouts',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Basic Forms',
          'isLink': false
        }
      ]
    };

    this.projectInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      interestedIn: ['', Validators.required],
      budget: ['', Validators.required],
      selectFile: [, Validators.required],
      aboutProject: ['', Validators.required],
    });


    this.issueTracking = this.formBuilder.group({
      issueTitle: ['', Validators.required],
      openedBy: ['', Validators.required],
      dateOpened: ['', Validators.required],
      dateFixed: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.timeSheet = this.formBuilder.group({
      employeeName: ['', Validators.required],
      projectname: ['', Validators.required],
      date: ['', Validators.required],
      ratePerHour: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      notes: ['', Validators.required]
    });

    this.complaintForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      employeeName: ['', Validators.required],
      complaintDate: ['', Validators.required],
      supervisorName: ['', Validators.required],
      complaintDetails: ['', Validators.required],
      signature: ['', Validators.required]
    });

    this.donation = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      donationType: ['', Validators.required],
      amount: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.eventRegistration1 = this.formBuilder.group({
      fullname: ['', Validators.required],
      title: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      customer: ['', Validators.required]
    });

    this.eventRegistration2 = this.formBuilder.group({
      fullname: ['', Validators.required],
      title: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      customer2: ['', Validators.required]
    });
  }

  get f() {
    return this.projectInfo.controls;
  }

  onProjectInfoSubmit() {
    this.submitted = true;

    if (this.projectInfo.invalid) {
      return;
    }
  }

  reloadProjectInfo() {
    this.blockUIProjectInfo.start('Loading..');

    setTimeout(() => {
      this.blockUIProjectInfo.stop();
    }, 2500);
  }

  reloadUserProfile() {
    this.blockUIUserProfile.start('Loading..');

    setTimeout(() => {
      this.blockUIUserProfile.stop();
    }, 2500);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
