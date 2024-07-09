import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ChartApiService } from '../../../../_services/chart.api';
/**
 * Interface
 */
export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-linecharts',
  templateUrl: './linecharts.component.html',
  styleUrls: ['./linecharts.component.css']
})
export class LinechartsComponent implements OnInit {

  @BlockUI('lineWithAreaChartOne') blockUILineWithAreaChartOne: NgBlockUI;
  @BlockUI('lineWithAreaChartTwo') blockUILineWithAreaChartTwo: NgBlockUI;
  public breadcrumb: any;
  data: any;
  loadDataURL: string;
  lineArea1: any;
  lineArea2: any;
  lineArea3: any;
  lineArea4: any;
  donutChart1: any;
  donutChart2: any;
  scatterChart: any;
  scatterlineChart: any;
  lineChart1: any;
  lineChart2: any;
  lineChart3: any;
  biPolarLineChart: any;
  barChart: any;
  distributedSeriesBarChart: any;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  constructor(private chartApiservice: ChartApiService) {
  }
  /**
   * Get chart data
   */
  getlineArea() {
    const Chartdata = this.data;
    // Line with Area Chart 1 Starts
    this.lineArea1 = {
      type: 'Line',
      data: Chartdata['lineArea1'],
      options: {
        height: '300px',
        low: 0,
        showArea: true,
        fullWidth: true,
        onlyInteger: true,
        axisY: {
          low: 0,
          scaleMinSpace: 50,
        },
        axisX: {
          showGrid: false
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
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
          }).elem('stop', {
            offset: 0,
            'stop-color': 'rgba(255, 255, 255, 1)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(38, 198, 218, 1)'
          });
        },

      },
    };
    // Line with Area Chart 1 Ends

    // Line with Area Chart 2 Starts
    this.lineArea2 = {
      type: 'Line',
      data: Chartdata['lineArea2'],
      options: {
        height: '300px',
        showArea: true,
        fullWidth: true,
        lineSmooth: Chartist.Interpolation.none(),
        axisX: {
          showGrid: false,
        },
        axisY: {
          low: 0,
          scaleMinSpace: 50,
        },
        chartPadding: { top: 0, right: 25, bottom: 0, left: 0 },
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
            y1: 1,
            x2: 0,
            y2: 0
          }).elem('stop', {
            offset: 0.2,
            'stop-color': 'rgba(255, 255, 255, 1)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(38, 198, 218, 1)'
          });

          defs.elem('linearGradient', {
            id: 'gradient2',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
          }).elem('stop', {
            offset: 0.5,
            'stop-color': 'rgba(255, 255, 255, 1)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(255,141,96, 1)'
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
    // Line with Area Chart 2 Ends

    // Line with Area Chart 3 Starts
    this.lineArea3 = {
      type: 'Line',
      data: Chartdata['lineArea3'],
      options: {
        height: '300px',
        low: 0,
        showArea: true,
        fullWidth: true,
        onlyInteger: true,
        axisY: {
          low: 0,
          scaleMinSpace: 50,
        }
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
            id: 'gradient',
            x1: 0,
            y1: 1,
            x2: 0,
            y2: 0
          }).elem('stop', {
            offset: 0,
            'stop-color': 'rgba(255, 255, 255, 1)'
          }).parent().elem('stop', {
            offset: 1,
            'stop-color': 'rgba(38, 198, 218, 1)'
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
    // Line with Area Chart 3 Ends

    // Line with Area Chart 4 Starts
    this.lineArea4 = {
      type: 'Line',
      data: Chartdata['lineArea4'],
      options: {
        fullwidth: true,
        height: '300px',
        low: 0,
        showArea: true,
        fullWidth: true,
      },
    };
    // Line with Area Chart 4 Ends

    // Line Chart 1 Starts
    this.lineChart1 = {
      type: 'Line',
      data: Chartdata['line1'],
      options: {
        fullwidth: true,
        height: '300px',
        axisX: {
          showGrid: false,
        },
        axisY: {
          low: 0,
          scaleMinSpace: 50,
        },
        fullWidth: true,
        chartPadding: { top: 0, right: 25, bottom: 0, left: 0 }
      },
    };
    // Line Chart 1 Ends

    // Line Chart 2 Starts
    this.lineChart2 = {
      type: 'Line',
      data: Chartdata['line2'],
      options: {
        fullwidth: true,
        height: '300px',
        axisX: {
          showGrid: false,
        },
        axisY: {
          low: 0,
          scaleMinSpace: 50,
        },
        fullWidth: true,
        chartPadding: { top: 0, right: 25, bottom: 0, left: 0 },
      },
      responsiveOptions: [
        [{
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
    // Line Chart 2 Ends

    // Line Chart 3 Starts
    this.lineChart3 = {
      type: 'Line',
      data: Chartdata['Line3'],
      options: {
        fullwidth: true,
        height: '300px',
        axisX: { showGrid: false }, axisY: {
          scaleMinSpace: 30,
        }, fullWidth: true,
        chartPadding: { top: 0, right: 50, bottom: 0, left: 0 },
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
    };
    // Line Chart 3 Ends

    // Scatter Line Chart Starts
    this.scatterlineChart = {
      type: 'Line',
      data: Chartdata['ScatterLine'],
      options: {
        fullwidth: true,
        height: '300px',
        axisX: { showGrid: false }, axisY: {
          scaleMinSpace: 30,
        }, fullWidth: true,
      },
      responsiveOptions: [
        ['screen and (max-width: 640px) and (min-width: 381px) and (min-hight: 300px)', {
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
    };
    // Scatter Line Chart Ends

    // Scatter Chart Starts
    this.scatterChart = {
      type: 'Line',
      data: Chartdata['Scatter'],
      options: {
        fullwidth: true,
        height: '300px',
        showLine: false,
        axisX: {
          labelInterpolationFnc: function (value: number, index: number): string {
            return index % 13 === 0 ? `W${value}` : null;
          },
          showGrid: false
        },
        axisY: {
          scaleMinSpace: 30,
        }
      },
      responsiveOptions: [
        [
          'screen and (min-width: 640px)',
          {
            axisX: {
              labelInterpolationFnc: function (value: number, index: number): string {
                return index % 4 === 0 ? `W${value}` : null;
              }
            }
          }
        ]
      ]
    };
    // Scatter Chart Ends

    // Bi-polar Line Chart Starts
    this.biPolarLineChart = {
      type: 'Line',
      data: Chartdata['Bi-PolarLine'],
      options: {
        fullwidth: true,
        height: '350px',
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
          showGrid: false,
          offset: 100,
          labelInterpolationFnc: function (value: number, index: number): number {
            return index % 2 === 0 ? value : null;
          }
        },
        axisY: {
          scaleMinSpace: 30,
        }
      }
    };
    // Bi-polar Line Chart Ends

    // Bar Chart Starts
    this.barChart = {
      type: 'Bar',
      data: Chartdata['Bar'],
      options: {
        fullwidth: true,
        height: '350px',
        seriesBarDistance: 21,
        axisX: {
          showGrid: false, offset: 100
        },
        axisY: {
          scaleMinSpace: 30,
        }
      },
    };
    // Bar Chart Ends

    // Distributed Series Bar Chart Starts
    this.distributedSeriesBarChart = {
      type: 'Bar',
      data: Chartdata['DistributedSeries'],
      options: {
        fullwidth: true,
        height: '300px',
        showGrid: false,
        distributeSeries: true,
        axisY: {
          scaleMinSpace: 30,
        }
      },
    };
    // Distributed Series Bar Chart Ends

    // Donut Chart 1 Starts
    this.donutChart1 = {
      type: 'Pie',
      data: Chartdata['donut'],
      options: {
        fullwidth: true,
        height: '400px',
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        total: 200,
        showLabel: true,
      },
    };
    // Donut Chart 1 Ends

    // Donut Chart 2 Starts
    this.donutChart2 = {
      type: 'Pie',
      data: Chartdata['donut'],
      options: {
        fullwidth: true,
        height: '400px',
        donut: true,
        showLabel: true,
        labelDirection: 'implode',
      },
    };
    // Donut Chart 2 Ends
  }

  /**
   * OnInit
   */
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Chartist Charts',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Chartist',
          'isLink': true,
          'link': '#'
        }
      ]
    };

    this.chartApiservice.getChartistData().subscribe(Response => {
      this.data = Response;
      this.getlineArea();
    });
  }

  /**
   * Reload card
   */
  reloadLineWithAreaChartOne() {
    this.blockUILineWithAreaChartOne.start('Loading..');

    setTimeout(() => {
      this.blockUILineWithAreaChartOne.stop();
    }, 2500);
  }

  /**
   * Reload card
   */
  reloadLineWithAreaChartTwo() {
    this.blockUILineWithAreaChartTwo.start('Loading..');

    setTimeout(() => {
      this.blockUILineWithAreaChartTwo.stop();
    }, 2500);
  }
}
