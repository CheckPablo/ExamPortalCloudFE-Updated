import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-simple-line-icons',
  templateUrl: './simple-line-icons.component.html',
  styleUrls: ['./simple-line-icons.component.css']
})
export class SimpleLineIconsComponent implements OnInit {

  @BlockUI('simpleLineIcons') blockUISimpleLineIcons: NgBlockUI;

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
      'mainlabel': 'Simple Line Icons',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Icons',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Simple Line Icons',
          'isLink': false
        }
      ]
    };
  }

  reloadSimpleLineIcons() {
    this.blockUISimpleLineIcons.start('Loading..');

    setTimeout(() => {
      this.blockUISimpleLineIcons.stop();
    }, 2500);
  }

}
