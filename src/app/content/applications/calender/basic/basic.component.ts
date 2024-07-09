import { Component, OnInit } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarView } from 'angular-calendar';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  @BlockUI('default') blockUIDefault: NgBlockUI;
  @BlockUI('basicViews') blockUIBasicViews: NgBlockUI;

  public breadcrumb: any;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  Bview: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  BviewDate: Date = new Date();
  modalData: {action: string};
  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean;

  /**
   * onInit
   */
  ngOnInit() {
    this.breadcrumb = {
      mainlabel: 'Calendar Basic',
      links: [
        {
          name: 'Home',
          isLink: true,
          link: '/dashboard/sales'
        },
        {
          name: 'Apps',
          isLink: true,
          link: '#'
        },
        {
          name: 'Calendars',
          isLink: true,
          link: '#'
        },
        {
          name: 'Basic',
          isLink: false,
          link: '#'
        }
      ]
    };
  }

  /**
   * realod card
   */
  reloadDefault() {
    this.blockUIDefault.start('Loading..');

    setTimeout(() => {
      this.blockUIDefault.stop();
    }, 2500);
  }

  /**
   * Realod card
   */
  reloadBasicViews() {
    this.blockUIBasicViews.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicViews.stop();
    }, 2500);
  }
}
