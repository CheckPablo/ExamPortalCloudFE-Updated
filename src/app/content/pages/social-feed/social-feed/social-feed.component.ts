import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.css']
})
export class SocialFeedComponent implements OnInit {

  public breadcrumb: any;
  currentOrientation = 'horizontal';
  start: any;
  end: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Social Feed',
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
          'name': 'Social Feed',
          'isLink': false
        }
      ]
    };

  }

}
