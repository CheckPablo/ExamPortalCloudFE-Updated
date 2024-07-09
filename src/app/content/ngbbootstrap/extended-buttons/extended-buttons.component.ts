import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-extended-buttons',
  templateUrl: './extended-buttons.component.html',
  styleUrls: ['./extended-buttons.component.css']
})
export class ExtendedButtonsComponent implements OnInit {

  @BlockUI('floatingButtons') blockUIFloatingButtons: NgBlockUI;
  @BlockUI('floatingOutlineButtons') blockUIFloatingOutlineButtons: NgBlockUI;

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
      'mainlabel': 'Buttons Extended',
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
          'name': 'Buttons Extended',
          'isLink': false
        }
      ]
    };
  }

  reloadFloatingButtons() {
    this.blockUIFloatingButtons.start('Loading..');

    setTimeout(() => {
      this.blockUIFloatingButtons.stop();
    }, 2500);
  }
  reloadFloatingOutlineButtons() {
    this.blockUIFloatingOutlineButtons.start('Loading..');

    setTimeout(() => {
      this.blockUIFloatingOutlineButtons.stop();
    }, 2500);
  }


}
