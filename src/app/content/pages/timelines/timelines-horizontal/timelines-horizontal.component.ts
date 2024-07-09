import { Component, OnInit } from '@angular/core';
import { TimelineElement } from './horizontal-timeline-page/timeline-horizontal';

@Component({
  selector: 'app-timelines-horizontal',
  templateUrl: './timelines-horizontal.component.html',
  styleUrls: ['./timelines-horizontal.component.css']
})
export class TimelinesHorizontalComponent implements OnInit {

  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae
    ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae,
    ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam
    quisquam, quae, temporibus dolores porro doloribus.`;

  timeline: TimelineElement[] = [
    { date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
    { date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
    { date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
    { date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
    { date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
    { date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
    { date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
    { date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
    { date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
    { date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
    { date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
  ];

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Horizontal Timeline',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Timelines',
          'isLink': true,
          'link': ''
        },
        {
          'name': 'Timelines Horizontal',
          'isLink': false
        }
      ]
    };
  }

}
