import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-videos',
  templateUrl: './search-videos.component.html',
  styleUrls: ['./search-videos.component.css']
})
export class SearchVideosComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Search Videos',
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
          'name': 'Search Videos',
          'isLink': false
        }
      ]
    };
  }

}
