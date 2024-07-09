import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-basic-buttons',
  templateUrl: './basic-buttons.component.html',
  styleUrls: ['./basic-buttons.component.css']
})
export class BasicButtonsComponent implements OnInit {

  @BlockUI('states') blockUIStates: NgBlockUI;
  @BlockUI('basicButtons') blockUIBasicButtons: NgBlockUI;

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
      'mainlabel': 'Buttons',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Component',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Buttons',
          'isLink': false
        }
      ]
    };
  }

  reloadStates() {
    this.blockUIStates.start('Loading..');

    setTimeout(() => {
      this.blockUIStates.stop();
    }, 2500);
  }
  reloadBasicButtons() {
    this.blockUIBasicButtons.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicButtons.stop();
    }, 2500);
  }
}
