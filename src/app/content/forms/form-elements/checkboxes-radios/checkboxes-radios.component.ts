import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-checkboxes-radios',
  templateUrl: './checkboxes-radios.component.html',
  styleUrls: ['./checkboxes-radios.component.css']
})
export class CheckboxesRadiosComponent implements OnInit {

  @BlockUI('basicTable') blockUIBasicTable: NgBlockUI;
  @BlockUI('basicRightCheckbox') blockUIBasicRightCheckbox: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Checkboxes and Radio Buttons',
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
          'name': 'Checkboxes and Radio Buttons',
          'isLink': false
        }
      ]
    };
  }

  reloadBasicTable() {
    this.blockUIBasicTable.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicTable.stop();
    }, 2500);
  }

  reloadBasicRightCheckbox() {
    this.blockUIBasicRightCheckbox.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicRightCheckbox.stop();
    }, 2500);
  }

}

