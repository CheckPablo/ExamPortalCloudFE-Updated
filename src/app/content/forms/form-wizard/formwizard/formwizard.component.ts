import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbDateStruct, NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formwizard',
  templateUrl: './formwizard.component.html',
  styleUrls: ['./formwizard.component.css']
})
export class FormwizardComponent implements OnInit {
  @BlockUI('numberTabs') blockUINumberTabs: NgBlockUI;
  @BlockUI('iconTabs') blockUIIconTabs: NgBlockUI;

  options = {
    minimize: true,
    reload: true,
    expand: true,
    close: true
  };
  d2: any;
  d3: any;
  d4: any;
  d5: any;
  model: NgbDateStruct;
  popupModel;
  numberTab: FormGroup;
  iconTab: FormGroup;
  verticalTab: FormGroup;

  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  stepFourForm: FormGroup;

  displayMonthsForStep1 = 1;

  displayMonthsForStep3 = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  isStepFourReached = false;
  isStepThreeReached = false;
  isStepTwoReached = false;
  isStepOneReached = false;


  countries = ['Amsterdam', 'Berlin', 'Frankfurt'];
  eventType = ['Banquet', 'Fund Raiser', 'Dinner Party', 'Wedding'];
  eventLocation = ['Amsterdam', 'Berlin', 'Frankfurt'];
  eventStatus = ['Planning', 'In Progress', 'Finished'];
  requirements1 = [{ id: 1, name: 'Staffing' }, { id: 2, name: 'Catering' }];
  requirements2 = [{ id: 3, name: 'Staffing' }, { id: 4, name: 'Catering' }];
  requirements3 = [{ id: 5, name: 'Staffing' }, { id: 6, name: 'Catering' }];
  requirements4 = [{ id: 7, name: 'Staffing' }, { id: 8, name: 'Catering' }];
  agendaItems1 = [{ id: 1, name: '1st item', idName: 'item1' }, { id: 2, name: '2st item', idName: 'item2'},
                  { id: 3, name: '3st item', idName: 'item3' }, { id: 4, name: '4st item', idName: 'item4' },
                  { id: 5, name: '5st item', idName: 'item5' }];
  agendaItems2 = [{ id: 6, name: '1st item', idName: 'item6' }, { id: 7, name: '2st item', idName: 'item7'},
                  { id: 8, name: '3st item', idName: 'item8' }, { id: 9, name: '4st item', idName: 'item9' },
                  { id: 10, name: '5st item', idName: 'item10' }];
  agendaItems3 = [{ id: 11, name: '1st item', idName: 'item11' }, { id: 12, name: '2st item', idName: 'item12'},
                  { id: 13, name: '3st item', idName: 'item13' }, { id: 14, name: '4st item', idName: 'item14' },
                  { id: 15, name: '5st item', idName: 'item15' }];
  agendaItems4 = [{ id: 16, name: '1st item', idName: 'item16' }, { id: 17, name: '2st item', idName: 'item17'},
                  { id: 18, name: '3st item', idName: 'item18' }, { id: 19, name: '4st item', idName: 'item19' },
                  { id: 20, name: '5st item', idName: 'item20' }];

  public breadcrumb: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Circle Style',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form Wizard',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Form Wizard Circle Steps',
          'isLink': false
        }
      ]
    };

    this.numberTab = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate1: ['', [Validators.required]],
      proposalTitle: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email2: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      videoURL: ['', [Validators.required]],
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventDate: ['', [Validators.required]],
      eventStatus: ['', [Validators.required]],
      requirementsArray: this.formBuilder.array(['', [Validators.required]]),
      meetingName: ['', Validators.required],
      location: ['', Validators.required],
      participantName: ['', Validators.required],
      decisionsReached: ['', Validators.required],
      agendaItems: this.formBuilder.array(['', [Validators.required]])
    });
    this.iconTab = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate2: ['', [Validators.required]],
      proposalTitle: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email2: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      videoURL: ['', [Validators.required]],
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventDate: ['', [Validators.required]],
      eventStatus: ['', [Validators.required]],
      requirementsArray: this.formBuilder.array(['', [Validators.required]]),
      meetingName: ['', Validators.required],
      location: ['', Validators.required],
      participantName: ['', Validators.required],
      decisionsReached: ['', Validators.required],
      agendaItems: this.formBuilder.array(['', [Validators.required]])
    });

    this.verticalTab = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate4: ['', [Validators.required]],
      proposalTitle: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email2: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      videoURL: ['', [Validators.required]],
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventDate: ['', [Validators.required]],
      eventStatus: ['', [Validators.required]],
      requirementsArray: this.formBuilder.array(['', [Validators.required]]),
      meetingName: ['', Validators.required],
      location: ['', Validators.required],
      participantName: ['', Validators.required],
      decisionsReached: ['', Validators.required],
      agendaItems: this.formBuilder.array(['', [Validators.required]])
    });


    this.stepOneForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate3: ['']
    });

    this.stepTwoForm = this.formBuilder.group({
      proposalTitle: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email2: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required]],
      videoURL: ['', [Validators.required]],
    });

    this.stepThreeForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventDate: [''],
      eventStatus: ['', [Validators.required]],
      requirementsArray: this.formBuilder.array(['', [Validators.required]])
    });

    this.stepFourForm = this.formBuilder.group({
      meetingName: ['', Validators.required],
      location: ['', Validators.required],
      participantName: ['', Validators.required],
      decisionsReached: ['', Validators.required],
      agendaItems: this.formBuilder.array(['', [Validators.required]])
    });
  }

  public previousFourthStep() {
    this.isStepFourReached = true;
  }
  get f() {
    return this.stepOneForm.controls;
  }
  get i() {
    return this.stepTwoForm.controls;
  }
  get j() {
    return this.stepThreeForm.controls;
  }
  get k() {
    return this.stepFourForm.controls;
  }
  submit() {
      }

  reloadNumberTabs() {
    this.blockUINumberTabs.start('Loading..');

    setTimeout(() => {
      this.blockUINumberTabs.stop();
    }, 2500);
  }

  reloadIconTabs() {
    this.blockUIIconTabs.start('Loading..');

    setTimeout(() => {
      this.blockUIIconTabs.stop();
    }, 2500);
  }

}
