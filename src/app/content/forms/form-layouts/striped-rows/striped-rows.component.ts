import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-striped-rows',
  templateUrl: './striped-rows.component.html',
  styleUrls: ['./striped-rows.component.css']
})
export class StripedRowsComponent implements OnInit {

  @BlockUI('projectInfo') blockUIProjectInfo: NgBlockUI;
  @BlockUI('timesheet') blockUITimesheet: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  projectInfo: FormGroup;
  timeSheet: FormGroup;
  eventRegistration: FormGroup;

  interestedIn = ['design', 'development', 'illustration', 'branding', 'video'];
  budget = ['less than 5000$', '5000$ - 10000$', '10000$ - 20000$', 'more than 20000$'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Striped Row Forms',
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
          'name': 'Striped Row Forms',
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

  reloadTimesheet() {
    this.blockUITimesheet.start('Loading..');

    setTimeout(() => {
      this.blockUITimesheet.stop();
    }, 2500);
  }
}
