import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.css']
})
export class PopoversComponent implements OnInit {

  @BlockUI('staticDemo') blockUIStaticDemo: NgBlockUI;
  @BlockUI('popoverPositions') blockUIPopoverPositions: NgBlockUI;
  @BlockUI('popoverEvents') blockUIPopoverEvents: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Popovers',
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
          'name': 'Popovers',
          'isLink': false
        }
      ]
    };
  }

  popoverShowEvent() {
      }

  popoverShownEvent() {
      }

  popoverHideEvent() {
      }

  popoverHiddenEvent() {
      }

  doAlert() {
    
  }

  reloadStaticDemo() {
    this.blockUIStaticDemo.start('Loading..');

    setTimeout(() => {
      this.blockUIStaticDemo.stop();
    }, 2500);
  }

  reloadPopoverPositions() {
    this.blockUIPopoverPositions.start('Loading..');

    setTimeout(() => {
      this.blockUIPopoverPositions.stop();
    }, 2500);
  }

  reloadPopoverEvents() {
    this.blockUIPopoverEvents.start('Loading..');

    setTimeout(() => {
      this.blockUIPopoverEvents.stop();
    }, 2500);
  }

 }
