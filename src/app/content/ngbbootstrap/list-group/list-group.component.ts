import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  @BlockUI('simpleListGroup') blockUISimpleListGroup: NgBlockUI;
  @BlockUI('disabledItems') blockUIDisabledItems: NgBlockUI;
  @BlockUI('badges') blockUIBadges: NgBlockUI;
  @BlockUI('labels') blockUILabels: NgBlockUI;

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
      'mainlabel': 'List Group',
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
          'name': 'List Group',
          'isLink': false
        }
      ]
    };
  }

  reloadSimpleListGroup() {
    this.blockUISimpleListGroup.start('Loading..');

    setTimeout(() => {
      this.blockUISimpleListGroup.stop();
    }, 2500);
  }

  reloadDisabledItems() {
    this.blockUIDisabledItems.start('Loading..');

    setTimeout(() => {
      this.blockUIDisabledItems.stop();
    }, 2500);
  }

  reloadBadges() {
    this.blockUIBadges.start('Loading..');

    setTimeout(() => {
      this.blockUIBadges.stop();
    }, 2500);
  }

  reloadLabels() {
    this.blockUILabels.start('Loading..');

    setTimeout(() => {
      this.blockUILabels.stop();
    }, 2500);
  }

}
