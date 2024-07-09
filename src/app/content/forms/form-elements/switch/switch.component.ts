import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

@BlockUI('basicSwitcheryToggle') blockUIBasicSwitcheryToggle: NgBlockUI;
@BlockUI('rightSwitcheryToggle') blockUIRightSwitcheryToggle: NgBlockUI;

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
      'mainlabel': 'Switch',
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
          'name': 'Switch',
          'isLink': false
        }
      ]
    };
  }

  reloadBasicSwitcheryToggle() {
    this.blockUIBasicSwitcheryToggle.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicSwitcheryToggle.stop();
    }, 2500);
  }

  reloadRightSwitcheryToggle() {
    this.blockUIRightSwitcheryToggle.start('Loading..');

    setTimeout(() => {
      this.blockUIRightSwitcheryToggle.stop();
    }, 2500);
  }

}
