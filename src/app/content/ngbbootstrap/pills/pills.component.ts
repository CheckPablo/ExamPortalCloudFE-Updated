import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.css']
})
export class PillsComponent implements OnInit {

  public breadcrumb: any;
  currentOrientation = 'vertical';

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Pills',
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
          'name': 'Pills',
          'isLink': false
        }
      ]
    };
  }
}
