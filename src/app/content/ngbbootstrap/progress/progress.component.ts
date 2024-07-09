import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @BlockUI('basicProgress') blockUIBasicProgress: NgBlockUI;
  @BlockUI('coloredProgress') blockUIColoredProgress: NgBlockUI;

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
      'mainlabel': 'Progress',
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
          'name': 'Progress',
          'isLink': false
        }
      ]
    };
  }

  reloadBasicProgress() {
    this.blockUIBasicProgress.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicProgress.stop();
    }, 2500);
  }

  reloadColoredProgress() {
    this.blockUIColoredProgress.start('Loading..');

    setTimeout(() => {
      this.blockUIColoredProgress.stop();
    }, 2500);
  }
}
