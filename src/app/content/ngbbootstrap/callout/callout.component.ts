import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.css']
})
export class CalloutComponent implements OnInit {

  @BlockUI('basicCallouts') blockUIBasicCallouts: NgBlockUI;
  @BlockUI('rightBorderedCallouts') blockUIRightBorderedCallouts: NgBlockUI;

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
      'mainlabel': 'Callout',
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
          'name': 'Callout',
          'isLink': false
        }
      ]
    };
  }

  reloadBasicCallouts() {
    this.blockUIBasicCallouts.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicCallouts.stop();
    }, 2500);
  }
  reloadRightBorderedCallouts() {
    this.blockUIRightBorderedCallouts.start('Loading..');

    setTimeout(() => {
      this.blockUIRightBorderedCallouts.stop();
    }, 2500);
  }

}
