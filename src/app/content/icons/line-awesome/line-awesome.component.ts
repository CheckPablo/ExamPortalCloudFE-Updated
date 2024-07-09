import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-line-awesome',
  templateUrl: './line-awesome.component.html',
  styleUrls: ['./line-awesome.component.css']
})
export class LineAwesomeComponent implements OnInit {

@BlockUI('lineAwesome') blockUILineAwesome: NgBlockUI;

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
      'mainlabel': 'Line Awesome',
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
          'name': 'Line Awesome',
          'isLink': false
        }
      ]
    };
  }

  reloadLineAwesome() {
    this.blockUILineAwesome.start('Loading..');

    setTimeout(() => {
      this.blockUILineAwesome.stop();
    }, 2500);
  }

}
