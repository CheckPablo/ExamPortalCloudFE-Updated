import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'User Cards',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Users',
          'isLink': true,
          'link': ''
        },
        {
          'name': 'User Cards',
          'isLink': false
        }
      ]
    };
  }

}
