import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-feather',
  templateUrl: './feather.component.html',
  styleUrls: ['./feather.component.css']
})
export class FeatherComponent implements OnInit {

  @BlockUI('featherIcons') blockUIFeatherIcons: NgBlockUI;

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
      'mainlabel': 'Feather Icons',
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
          'name': 'Feather Icons',
          'isLink': false
        }
      ]
    };
  }
  reloadFeatherIcons() {
    this.blockUIFeatherIcons.start('Loading..');

    setTimeout(() => {
      this.blockUIFeatherIcons.stop();
    }, 2500);
  }

}
