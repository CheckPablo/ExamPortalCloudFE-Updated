import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  public breadcrumb: any;

  constructor() {}

  ngOnInit() {
    this.breadcrumb = {
      mainlabel: 'Advance Social Cards',
      links: [
        {
          name: 'Home',
          isLink: true,
          link: '/dashboard/sales'
        },
        {
          name: 'Advance Cards',
          isLink: true,
          link: '#'
        },
        {
          name: 'Social',
          isLink: false,
          link: '#'
        }
      ]
    };
  }
}
