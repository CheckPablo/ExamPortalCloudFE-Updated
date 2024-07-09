import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-row-separator',
  templateUrl: './row-separator.component.html',
  styleUrls: ['./row-separator.component.css']
})
export class RowSeparatorComponent implements OnInit {

  @BlockUI('projectInfo') blockUIProjectInfo: NgBlockUI;
  @BlockUI('userProfile') blockUIUserProfile: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  interestedIn = ['design', 'development', 'illustration', 'branding', 'video'];
  budget = ['less than 5000$', '5000$ - 10000$', '10000$ - 20000$', 'more than 20000$'];

  projectInfo: FormGroup;
  userProfile: FormGroup;
  timeSheet: FormGroup;
  eventRegistration: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Row Reparator Forms',
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
          'name': 'Row Reparator Forms',
          'isLink': true
        }
      ]
    };

    this.projectInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      interestedIn: ['', Validators.required],
      budget: ['', Validators.required],
      selectFile: ['', Validators.required],
      aboutProject: ['', Validators.required],
    });

    this.userProfile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      phone: ['', Validators.required],
      bio: ['', Validators.required]
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
    this.eventRegistration = this.formBuilder.group({
      fullname: ['', Validators.required],
      title: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      customer1: ['', Validators.required]
    });
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
}
