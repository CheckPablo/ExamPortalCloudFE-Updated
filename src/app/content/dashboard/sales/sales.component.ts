import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as Chartist from 'chartist';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ChartEvent, ChartType } from 'ng-chartist';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ChartApiService } from '../../../_services/chart.api';
import { Router } from '@angular/router';
export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  @BlockUI('revenue') blockUIRevenue: NgBlockUI;
  @BlockUI('hitrate') blockUIHitRate: NgBlockUI;
  @BlockUI('email') blockUIEmail: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { suppressScrollY: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  salesData: any;
  lineArea: any;
  earningchart: any;
  donutChart2: any;
  donutChart1: any;
  options = {
    bodyClass: ['pt-0'],
    close: false,
    expand: false,
    minimize: false,
    reload: true
  };

  hitRateOptions = {
    bodyClass: ['bg-hexagons', 'pt-0'],
    headerClass: ['bg-hexagons'],
    cardClass: ['pull-up'],
    close: false,
    expand: false,
    minimize: false,
    reload: true
  };

  dealsOptions = {
    bodyClass: ['bg-hexagons-danger'],
    cardClass: ['pull-up'],
    contentClass: ['bg-gradient-directional-danger']
  };

  emailsOptions = {
    bodyClass: ['pt-0'],
    close: false,
    expand: false,
    minimize: false,
    reload: true
  };
  loadingIndicator = true;

  firstRow = ['../../../assets/images/portrait/small/avatar-s-4.png',
    '../../../assets/images/portrait/small/avatar-s-5.png',
    '../../../assets/images/portrait/small/avatar-s-6.png'];
  secondRow = ['../../../assets/images/portrait/small/avatar-s-7.png',
    '../../../assets/images/portrait/small/avatar-s-8.png'];
  thirdRow = ['../../../assets/images/portrait/small/avatar-s-1.png',
    '../../../assets/images/portrait/small/avatar-s-2.png',
    '../../../assets/images/portrait/small/avatar-s-3.png'];
  fourthRow = ['../../../assets/images/portrait/small/avatar-s-11.png',
    '../../../assets/images/portrait/small/avatar-s-12.png'];
  fifthRow = ['../../../assets/images/portrait/small/avatar-s-6.png',
    '../../../assets/images/portrait/small/avatar-s-4.png'];
  rows = [
    {
      'type': 'danger', 'value': 85, 'product': 'iPhone X',
      'image': this.firstRow, 'buttonname': 'Mobile', 'amount': '$ 1200.00', 'bagde': '+8 more'
    },
    {
      'type': 'success', 'value': 75, 'product': 'iPad',
      'image': this.secondRow, 'buttonname': 'Teblet', 'amount': '$ 1190.00', 'bagde': '+5 more'
    },
    {
      'type': 'danger', 'value': 65, 'product': 'OnePlus',
      'image': this.thirdRow, 'buttonname': 'Mobile', 'amount': '$ 999.00', 'bagde': '+3 more'
    },
    {
      'type': 'success', 'value': 55, 'product': 'ZenPad',
      'image': this.fourthRow, 'buttonname': 'Teblet', 'amount': '$ 1150.00'
    },
    {
      'type': 'danger', 'value': 45, 'product': 'Pixel 2',
      'image': this.fifthRow, 'buttonname': 'Mobile', 'amount': '$ 1180.00'
    }
  ];

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  Daygraph = true;
  Weekgraph = false;
  Monthgraph = false;
  ngOnInit() {
    this.chartApiservice.getSalesData().subscribe(Response => {
      this.salesData = Response;
      this.getChartdata();
    });
  }
  constructor(private _renderer: Renderer2, private route: Router,
    private chartApiservice: ChartApiService) { }
  reloadRevenue() {
    this.blockUIRevenue.start('Loading..');

    setTimeout(() => {
      this.blockUIRevenue.stop();
    }, 2500);
  }

  reloadHitRate() {
    this.blockUIHitRate.start('Please Wait..');

    setTimeout(() => {
      this.blockUIHitRate.stop();
    }, 2500);
  }

  reloadEmail() {
    this.blockUIEmail.start();

    setTimeout(() => {
      this.blockUIEmail.stop();
    }, 2500);
  }
  rotueInvoice() {
    this.route.navigate(['/invoice/invoice-summary']);
  }
  getChartdata() {
    const Chartdata = this.salesData;
    this.lineArea = {
      type: 'Line',
      data: Chartdata['lineArea'],
      options: {
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 2.8
        }),
        fullWidth: true,
        height: '270px',
        showArea: false,
        showPoint: false,
        axisX: {
          showGrid: false,
          showLabel: true,
          offset: 32
        },
        axisY: {
          showGrid: true,
          showLabel: true,
          scaleMinSpace: 28,
          offset: 44
        },
      },
      events: {
        created(data: any): void {
          const defs = data.svg.elem('defs');
          defs.elem('linearGradient', {
            id: 'gradient2',
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 0
          }).elem('stop', {
            offset: 0,
            'stop-color': 'rgb(255,73,97)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgb(255,73,97)'
          });
        },
        draw(data: any): void {
          const circleRadius = 4;
          if (data.type === 'point') {
            const circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: circleRadius,
              class: 'ct-point-circle'
            });
            data.element.replace(circle);
          } else if (data.type === 'label') {
            // adjust label position for rotation
            const dX = data.width / 2 + (26 - data.width);
            data.element.attr({ x: data.element.attr('x') - dX });
          }
        }
      },
    };
    this.earningchart = {
      type: 'Line',
      data: Chartdata['earningchart'],
      options: {
        chartPadding: 0,
        height: '440px',
        low: 0,
        showArea: true,
        fullWidth: true,
        onlyInteger: true,
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: -1
        },
        axisY: {
          scaleMinSpace: 40,
          showGrid: false,
          showLabel: false,
          offset: -2
        },
      },
      responsiveOptions: [
        ['screen and (max-width: 640px) and (min-width: 381px)', {
          axisX: {
            labelInterpolationFnc: function (value, index) {
              return index % 2 === 0 ? value : null;
            }
          }
        }],
        ['screen and (max-width: 380px)', {
          axisX: {
            labelInterpolationFnc: function (value, index) {
              return index % 3 === 0 ? value : null;
            }
          }
        }]
      ],
      events: {
        created(data: any): void {
          const defs = data.svg.elem('defs');
          defs.elem('linearGradient', {
            id: 'gradient1',
            x1: 0,
            y1: 0,
            x2: 1,
            y2: 0
          }).elem('stop', {
            offset: 0,
            'stop-color': 'rgb(255,73,97)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgb(255,73,97)'
          });
        },
        draw(data: any): void {
          const circleRadius = 6;
          if (data.type === 'point') {
            const circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: circleRadius,
              class: 'ct-point-circle'
            });
            data.element.replace(circle);
          }
        }
      },
    };
    // Doughnut
    this.donutChart2 = {
      type: 'Pie',
      data: Chartdata['donut1'],
      options: {
        chartPadding: 0,
        fullwidth: true,
        height: '273px',
        donut: true,
        showLabel: true,
        startAngle: 0,
        labelInterpolationFnc: function (value) {
          const total = 82;
          return total + '%';
        }
      },
      events: {
        draw(data: any): void {
          if (data.type === 'label') {
            if (data.index === 0) {
              data.element.attr({
                dx: data.element.root().width() / 2,
                dy: data.element.root().height() / 2
              });
            } else {
              data.element.remove();
            }
          }
        }
      }
    };
    this.donutChart1 = {
      type: 'Pie',
      data: Chartdata['donut2'],
      options: {
        chartPadding: 0,
        fullwidth: true,
        height: '273px',
        donut: true,
        showLabel: true,
        labelInterpolationFnc: function (value) {
          const total = 76;
          return total + '%';
        }
      },
      events: {
        draw(data: any): void {
          if (data.type === 'label') {
            if (data.index === 0) {
              data.element.attr({
                dx: data.element.root().width() / 2,
                dy: data.element.root().height() / 2
              });
            } else {
              data.element.remove();
            }
          }
        }
      }
    };
  }
}
