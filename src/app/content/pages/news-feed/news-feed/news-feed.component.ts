import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'News Feed',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Pages',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'News Feed',
          'isLink': false
        }
      ]
    };

  }

}
