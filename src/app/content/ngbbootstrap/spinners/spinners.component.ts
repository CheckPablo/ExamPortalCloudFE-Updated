import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.css']
})
export class SpinnersComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Spinners',
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
          'name': 'Spinners',
          'isLink': false
        }
      ]
    };
  }

}
