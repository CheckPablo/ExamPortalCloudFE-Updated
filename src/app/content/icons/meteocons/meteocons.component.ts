import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-meteocons',
  templateUrl: './meteocons.component.html',
  styleUrls: ['./meteocons.component.css']
})
export class MeteoconsComponent implements OnInit {

@BlockUI('meteocons') blockUIMeteocons: NgBlockUI;

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
      'mainlabel': 'Meteocons',
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
          'name': 'Meteocons',
          'isLink': false
        }
      ]
    };
  }

  reloadMeteocons() {
    this.blockUIMeteocons.start('Loading..');

    setTimeout(() => {
      this.blockUIMeteocons.stop();
    }, 2500);
  }
}
