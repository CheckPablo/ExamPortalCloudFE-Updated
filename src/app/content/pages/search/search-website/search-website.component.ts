import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-website',
  templateUrl: './search-website.component.html',
  styleUrls: ['./search-website.component.css']
})
export class SearchWebsiteComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Search Website',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Search',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Search Website',
          'isLink': false
        }
      ]
    };
  }

}
