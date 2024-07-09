import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var require: any;
const formInputData = require('../../../../../assets/data/forms/form-elements/form-inputs.json');

@Component({
  selector: 'app-form-inputs',
  templateUrl: './form-inputs.component.html',
  styleUrls: ['./form-inputs.component.css']
})
export class FormInputsComponent implements OnInit {

  @ViewChild('labelImport', { static: true })
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  public breadcrumb: any;
  multipleMultiSelect: any;
  public multipleSelectArray = formInputData.multipleSelectArray;
  public focucedElement = '';

  constructor() {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Form Basic Elements',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Basic Elements',
          'isLink': false
        }
      ]
    };
  }

  focusElement(focucedElement: any) {
    this.focucedElement = focucedElement;
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }
}
