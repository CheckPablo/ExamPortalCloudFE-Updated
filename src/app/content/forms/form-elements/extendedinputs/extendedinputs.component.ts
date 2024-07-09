import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbDateStruct, NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-extendedinputs',
  templateUrl: './extendedinputs.component.html',
  styleUrls: ['./extendedinputs.component.css']
})
export class ExtendedinputsComponent implements OnInit {
  @BlockUI('inputMask') blockUIInputMask: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  d3: any;
  d2: any;
  d1: any;

  model: NgbDateStruct;
  popupModel;

  @ViewChild('f', { read: true }) floatingLabelForm: NgForm;
  @ViewChild('vform', { read: true }) validationForm: FormGroup;
  inputForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.inputForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
      'textArea': new FormControl(null, [Validators.required]),
      'radioOption': new FormControl('Option one is this')
    }, { updateOn: 'blur' });

    this.breadcrumb = {
      'mainlabel': 'Extended Inputs',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Extra Components',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Extended Inputs',
          'isLink': false
        }
      ]
    };
  }

  onCustomFormSubmit() {
    this.validationForm.reset();
  }

  reloadInputMask() {
    this.blockUIInputMask.start('Loading..');

    setTimeout(() => {
      this.blockUIInputMask.stop();
    }, 2500);
  }
}
