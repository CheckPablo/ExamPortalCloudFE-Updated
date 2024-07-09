import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @BlockUI('basicAlerts') blockUIBasicAlerts: NgBlockUI;
  @BlockUI('dismissibleAlerts') blockUIDismissibleAlerts: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  public isPrimaryClosed2 = false;
  public isSecondaryClosed2 = false;
  public isSuccessClosed2 = false;
  public isDangerClosed2 = false;
  public isWarningClosed2 = false;
  public isInfoClosed2 = false;
  public isLightClosed2 = false;
  public isDarkClosed2 = false;

  public isPrimaryClosed5 = false;
  public isSuccessClosed5 = false;
  public isDangerClosed5 = false;
  public isWarningClosed5 = false;
  public isInfoClosed5 = false;
  public isCustomClosed5 = false;

  public isPrimaryClosed6 = false;
  public isSuccessClosed6 = false;
  public isDangerClosed6 = false;
  public isWarningClosed6 = false;
  public isInfoClosed6 = false;
  public isCustomClosed6 = false;

  public isPrimaryClosed7 = false;
  public isSuccessClosed7 = false;
  public isDangerClosed7 = false;
  public isWarningClosed7 = false;
  public isInfoClosed7 = false;
  public isCustomClosed7 = false;

  public isPrimaryClosed8 = false;
  public isSuccessClosed8 = false;
  public isDangerClosed8 = false;
  public isWarningClosed8 = false;
  public isInfoClosed8 = false;
  public isCustomClosed8 = false;

  public isPrimaryClosed9 = false;
  public isSuccessClosed9 = false;
  public isDangerClosed9 = false;
  public isWarningClosed9 = false;
  public isInfoClosed9 = false;
  public isCustomClosed9 = false;

  public isPrimaryClosed10 = false;
  public isSuccessClosed10 = false;
  public isDangerClosed10 = false;
  public isWarningClosed10 = false;
  public isInfoClosed10 = false;
  public isCustomClosed10 = false;

  public isPrimaryClosed11 = false;
  public isSuccessClosed11 = false;
  public isDangerClosed11 = false;
  public isWarningClosed11 = false;
  public isInfoClosed11 = false;
  public isCustomClosed11 = false;

  public isPrimaryClosed12 = false;
  public isSuccessClosed12 = false;
  public isDangerClosed12 = false;
  public isWarningClosed12 = false;
  public isInfoClosed12 = false;
  public isCustomClosed12 = false;

  public isPrimaryClosed13 = false;
  public isSuccessClosed13 = false;
  public isDangerClosed13 = false;
  public isWarningClosed13 = false;
  public isInfoClosed13 = false;
  public isCustomClosed13 = false;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Alerts',
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
          'name': 'Alerts',
          'isLink': false
        }
      ]
    };
  }

  reloadBasicAlerts() {
    this.blockUIBasicAlerts.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicAlerts.stop();
    }, 2500);
  }
  reloadDismissible() {
    this.blockUIDismissibleAlerts.start('Loading..');

    setTimeout(() => {
      this.blockUIDismissibleAlerts.stop();
    }, 2500);
  }

}
