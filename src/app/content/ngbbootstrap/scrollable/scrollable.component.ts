import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent, PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.css']
})
export class ScrollableComponent implements OnInit {

  public breadcrumb: any;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: false};

  public speed1: PerfectScrollbarConfigInterface = { wheelSpeed: 1 , wheelPropagation: false };

  public speed10: PerfectScrollbarConfigInterface = { wheelSpeed: 10 , wheelPropagation: false };

  public speed: PerfectScrollbarConfigInterface = { wheelSpeed: 0.1 , wheelPropagation: false };

  public visibleScroll: PerfectScrollbarConfigInterface = {wheelPropagation: false};

  public minScrollbarLength: PerfectScrollbarConfigInterface = { minScrollbarLength: 200 , wheelPropagation: false };

  public margins: PerfectScrollbarConfigInterface = { scrollXMarginOffset: 40, scrollYMarginOffset: 90 , wheelPropagation: false };

  public handlers: PerfectScrollbarConfigInterface = { wheelPropagation: false,
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'] };

  public noKeyboard: PerfectScrollbarConfigInterface = {wheelPropagation: false,
    handlers: ['click-rail', 'drag-thumb', 'wheel', 'touch'] };

  public clickDrag: PerfectScrollbarConfigInterface = {wheelPropagation: false,
    handlers: ['click-rail', 'drag-thumb'] };


  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Scrollable',
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
          'name': 'Scrollable',
          'isLink': false
        }
      ]
    };
  }


}
