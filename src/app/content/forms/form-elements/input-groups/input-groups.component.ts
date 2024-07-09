import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.css']
})
export class InputGroupsComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Input Groups',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Input Groups',
          'isLink': false
        }
      ]
    };
  }

}
