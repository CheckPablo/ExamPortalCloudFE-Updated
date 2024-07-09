import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.css']
})
export class NavsComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Navs',
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
          'name': 'Navs',
          'isLink': false
        }
      ]
    };
  }

}

