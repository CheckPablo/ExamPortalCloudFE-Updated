import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-mediaobjects',
  templateUrl: './mediaobjects.component.html',
  styleUrls: ['./mediaobjects.component.css']
})

export class MediaobjectsComponent implements OnInit {

  @BlockUI('leftAlignedMediaObjects') blockUILeftAlignedMediaObjects: NgBlockUI;
  @BlockUI('leftMediaWithRightText') blockUILeftMediaWithRightText: NgBlockUI;

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
      'mainlabel': 'Media Objects',
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
          'name': 'Media Objects',
          'isLink': false
        }
      ]
    };
  }

  reloadLeftAlignedMediaObjects() {
    this.blockUILeftAlignedMediaObjects.start('Loading..');

    setTimeout(() => {
      this.blockUILeftAlignedMediaObjects.stop();
    }, 2500);
  }

  reloadLeftMediaWithRightText() {
    this.blockUILeftMediaWithRightText.start('Loading..');
    setTimeout(() => {
      this.blockUILeftMediaWithRightText.stop();
    }, 2500);
  }

}
