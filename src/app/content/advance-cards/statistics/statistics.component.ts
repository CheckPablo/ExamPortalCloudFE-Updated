import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { ChartApiService } from '../../../_services/chart.api';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Data: any;
  public breadcrumb: any;
  feedbacksdonutChart: any;
  subscribersdonutChart: any;
  usersdonutChart: any;
  lineArea: any;
  commentslineArea: any;
  viewslineArea: any;
  sparklineArea: any;
  barChart1: any;
  barChart: any;

  constructor(private chartApiservice: ChartApiService) {}

  getlineArea() {
 const ChartData = this.Data;
  this.feedbacksdonutChart = {
    type: 'Pie',
    data: ChartData['feedbacksdonutChart'],
    options: {
      showLabel: false,
      chartPadding: 0,
      fullwidth: true,
      height: '200px',
      donut: true,
      startAngle: 0
    }
  };
  this.subscribersdonutChart = {
    type: 'Pie',
    data: ChartData['subscribersdonutChart'],
    options: {
      chartPadding: 0,
      fullwidth: true,
      height: '200px',
      donut: true,
      showLabel: false,
      startAngle: 0
    }
  };
  this.usersdonutChart  = {
    type: 'Pie',
    data: ChartData['usersdonutChart'],
    options: {
      showLabel: false,
      chartPadding: 0,
      fullwidth: true,
      height: '200px',
      donut: true,
      startAngle: 0
    }
  };

  this.lineArea = {
    type: 'Line',
    data: ChartData['lineArea'],
    options: {
      // low: 650,
      fullwidth: true,
      height: '80px',
      showArea: true,
      axisX: {
        showGrid: false,
        showLabel: false
      },
      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
  this.commentslineArea = {
    type: 'Line',
    data: ChartData['commentslineArea'],
    options: {
      // low: 650,
      fullwidth: true,
      height: '80px',
      showArea: true,
      axisX: {
        showGrid: false,
        showLabel: false
      },
      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
  this.viewslineArea = {
    type: 'Line',
    data: ChartData['viewslineArea'],
    options: {
      // low: 650,
      fullwidth: true,
      height: '80px',
      showArea: true,
      axisX: {
        showGrid: false,
        showLabel: false
      },
      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
  this.sparklineArea = {
    type: 'Line',
    data: ChartData['sparklineArea'],
    options: {
      chartPadding: 0,
      showArea: true,
      showLine: false,
      showPoint: false,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
        offset: -1
      },
      axisY: {
        showGrid: false,
        offset: -1
      }
    }
  };
  this.barChart = {
    type: 'Bar',
    data: ChartData['Bar'],
    options: {
      fullwidth: true,
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 100
      },

      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
  this.barChart1 = {
    type: 'Bar',
    data: ChartData['Bar1'],
    options: {
      fullwidth: true,
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 100
      },

      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
  this.lineArea = {
    type: 'Line',
    data: ChartData['lineArea'],
    options: {
      // low: 650,
      fullwidth: true,
      height: '75px',
      showArea: true,
      axisX: {
        showGrid: false,
        showLabel: false
      },
      axisY: {
        showGrid: false,
        showLabel: false
      }
    }
  };
}
  ngOnInit() {
    this.breadcrumb = {
      mainlabel: 'Advance Statistics Cards',
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
          name: 'Statistics Cards',
          isLink: false,
          link: '#'
        }
      ]
    };
      this.chartApiservice.getStatisticsData().subscribe(Response => {
      this.Data = Response;
      this.getlineArea();
      });
  }
}
