import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  public breadcrumb: any;
  salesData: any;
  ChartistData: any;
  lineArea: any;
  earningchart: any;
  DonutChart: any;
  barChart: any;
  lineArea1: any;
  ecommercesaleslineArea: any;
  donutChart2: any;
  donutChart1: any;
  constructor(private chartApiservice: ChartApiService) { }
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
  getlineArea() {
    const Chartdata = this.ChartistData;
    this.lineArea = {
      type: 'Line',
      data: Chartdata['lineArea'],
      options: {
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 1.8
        }),
        fullwidth: true,
        height: '320px',
        low: 0,
        showArea: true,
        fullWidth: true,
        showPoint: false,
        axisX: {
          showGrid: false
        },
        axisY: {
          low: 0,
          offset: 16,
          scaleMinSpace: 40,
          labelInterpolationFnc: function (value) {
            return value + 'K';
          }
        }
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px) and (min-width: 200px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          }
        ],
        [
          'screen and (max-width: 380px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 3 === 0 ? value : null;
              }
            }
          }
        ]
      ],
      events: {
        created(data: any): void {
          const defs = data.svg.elem('defs');
          defs
            .elem('linearGradient', {
              id: 'gradient1',
              x1: 1,
              y1: 1,
              x2: 1,
              y2: 1
            })
            .elem('stop', {
              offset: 0,
              'stop-color': 'rgba(22, 141, 238, 1)'
            })
            .parent()
            .elem('stop', {
              offset: 1,
              'stop-color': 'rgba(98, 188, 270, 11)'
            });
        }
      }
    };


    this.DonutChart = {
      type: 'Pie',
      data: Chartdata['donutDashboard'],
      options: {
        width: '100%',
        height: '280px',
        donut: true,
        startAngle: 0,
        labelInterpolationFnc: function (value) {
          const total = Chartdata['donutDashboard'].series.reduce(function (
            prev,
            series
          ) {
            return prev + series.value;
          },
            0);
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
    this.barChart = {
      type: 'Bar',
      data: Chartdata['Bar'],
      options: {
        fullwidth: true,
        height: '320px',
        seriesBarDistance: 21,
        chartPadding: {
          top: 0
        },
        axisX: {
          showLable: true,
          showGrid: false,
          offset: 60,
          labelInterpolationFnc: function (value) {
            return value.slice(0, 3);
          }
        },

        axisY: {
          scaleMinSpace: 40
        }
      }
    };

    this.ecommercesaleslineArea = {
      type: 'Line',
      data: Chartdata['lineArea2'],
      options: {
        height: '300px',
        low: 0,
        showArea: true,
        fullWidth: true,
        onlyInteger: true,
        axisX: {
          showGrid: false
        },
        axisY: {
          low: 0,
          scaleMinSpace: 40,
          showGrid: false
        }
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px) and (min-width: 381px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          }
        ],
        [
          'screen and (max-width: 380px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 3 === 0 ? value : null;
              }
            }
          }
        ]
      ],
      events: {
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
      }
    };

  }
  getChartData() {
    const SaleschartData = this.salesData;
    this.earningchart = {
      type: 'Line',
      data: SaleschartData['earningchart'],
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
        }
      },
      responsiveOptions: [
        [
          'screen and (max-width: 640px) and (min-width: 381px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          }
        ],
        [
          'screen and (max-width: 380px)',
          {
            axisX: {
              labelInterpolationFnc: function (value, index) {
                return index % 3 === 0 ? value : null;
              }
            }
          }
        ]
      ],
      events: {
        created(data: any): void {
          const defs = data.svg.elem('defs');
          defs
            .elem('linearGradient', {
              id: 'gradient1',
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 0
            })
            .elem('stop', {
              offset: 0,
              'stop-color': 'rgb(255,73,97)'
            })
            .parent()
            .elem('stop', {
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
      }
    };
    this.lineArea1 = {
      type: 'Line',
      data: SaleschartData['lineArea'],

      options: {
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 2.8
        }),
        fullWidth: true,
        height: '320px',
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
        }
      },
      events: {
        created(data: any): void {
          const defs = data.svg.elem('defs');
          defs
            .elem('linearGradient', {
              id: 'gradient2',
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 0
            })
            .elem('stop', {
              offset: 0,
              'stop-color': 'rgb(255,73,97)'
            })
            .parent()
            .elem('stop', {
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
      }
    };
    this.donutChart2 = {
      type: 'Pie',
      data: SaleschartData['donut1'],
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
      data: SaleschartData['donut2'],
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
  ngOnInit() {
    this.breadcrumb = {
      mainlabel: 'Advance Charts Cards',
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
          name: 'Charts',
          isLink: false,
          link: '#'
        }
      ]
    };
    this.chartApiservice.getSalesData().subscribe(Response => {
      this.salesData = Response;
      this.getChartData();
    });
    this.chartApiservice.getEcommerceData().subscribe(Response => {
      this.ChartistData = Response;
      this.getlineArea();
    });
  }
}
