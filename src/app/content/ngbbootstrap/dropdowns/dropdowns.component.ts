import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.css']
})
export class DropdownsComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Dropdowns',
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
          'name': 'Dropdowns',
          'isLink': false
        }
      ]
    };
  }


}
