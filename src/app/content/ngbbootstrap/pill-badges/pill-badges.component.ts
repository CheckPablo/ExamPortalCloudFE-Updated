import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill-badges',
  templateUrl: './pill-badges.component.html',
  styleUrls: ['./pill-badges.component.css']
})
export class PillBadgesComponent implements OnInit {

  public breadcrumb: any;
  placement = 'top-left';

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Pill Badges',
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
          'name': 'Pill Badges',
          'isLink': false
        }
      ]
    };
  }
}
