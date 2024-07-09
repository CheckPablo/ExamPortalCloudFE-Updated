import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-input-grid',
  templateUrl: './input-grid.component.html',
  styleUrls: ['./input-grid.component.css']
})
export class InputGridComponent implements OnInit {

@BlockUI('horizontalGrid') blockUIHorizontalGrid: NgBlockUI;
@BlockUI('gridWithRowLabel') blockUIGridWithRowLabel: NgBlockUI;

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
      'mainlabel': 'Input Grid',
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
          'name': 'Input Grid',
          'isLink': false
        }
      ]
    };
  }

  reloadHorizontalGrid() {
    this.blockUIHorizontalGrid.start('Loading..');

    setTimeout(() => {
      this.blockUIHorizontalGrid.stop();
    }, 2500);
  }

  reloadGridWithRowLabel() {
    this.blockUIGridWithRowLabel.start('Loading..');

    setTimeout(() => {
      this.blockUIGridWithRowLabel.stop();
    }, 2500);
  }


}
