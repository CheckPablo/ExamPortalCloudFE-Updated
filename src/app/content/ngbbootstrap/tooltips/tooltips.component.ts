import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.css']
})
export class TooltipsComponent implements OnInit {

  @BlockUI('staticDemo') blockUIStaticDemo: NgBlockUI;
  @BlockUI('tooltipPositions') blockUITooltipPositions: NgBlockUI;

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
      'mainlabel': 'Tooltip',
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
          'name': 'Tooltip',
          'isLink': false
        }
      ]
    };
  }

  tooltipShowEvent() {
      }

  tooltipShownEvent() {
      }

  tooltipHideEvent() {
      }

  tooltipHiddenEvent() {
      }

  doAlert() {
    
  }

  reloadStaticDemo() {
    this.blockUIStaticDemo.start('Loading..');

    setTimeout(() => {
      this.blockUIStaticDemo.stop();
    }, 2500);
  }

  reloadTooltipPositions() {
    this.blockUITooltipPositions.start('Loading..');

    setTimeout(() => {
      this.blockUITooltipPositions.stop();
    }, 2500);
  }


}
