import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ChartApiService } from '../../../../_services/chart.api';

/**
 * Interface
 */
interface Marker {
  lat: number;
  lng: number;
  label: string;
}
const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
  '7a', '8a', '9a', '10a', '11a',
  '12p', '1p', '2p', '3p', '4p', '5p',
  '6p', '7p', '8p', '9p', '10p', '11p'];

const days = ['Saturday', 'Friday', 'Thursday',
  'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
@Component({
  selector: 'app-timelines-left',
  templateUrl: './timelines-left.component.html',
  styleUrls: ['./timelines-left.component.css']
})
export class TimelinesLeftComponent implements OnInit {

  image1 = [
    {
      img: '../../../../../assets/images/gallery/1.jpg',
      thumb: '../../../../../assets/images/gallery/1.jpg',
      description: 'Image 1'
    }]
  image2 = [{
    img: '../../../../../assets/images/gallery/2.jpg',
    thumb: '../../../../../assets/images/gallery/2.jpg',
    description: 'Image 2'
  }]
  image3 = [{
    img: '../../../../../assets/images/gallery/3.jpg',
    thumb: '../../../../../assets/images/gallery/3.jpg',
    description: 'Image 3'
  }]
  image4 = [{
    img: '../../../../../assets/images/gallery/4.jpg',
    thumb: '../../../../../assets/images/gallery/4.jpg',
    description: 'Image 4'
  }]
  image5 = [{
    img: '../../../../../assets/images/gallery/5.jpg',
    thumb: '../../../../../assets/images/gallery/5.jpg',
    description: 'Image 5'
  }
  ]
  image6 = [
    {
      img: '../../../../../assets/images/gallery/6.jpg',
      thumb: '../../../../../assets/images/gallery/6.jpg',
      description: 'Image 6'
    }
  ]
  image7 = [
    {
      img: '../../../../../assets/images/gallery/7.jpg',
      thumb: '../../../../../assets/images/gallery/7.jpg',
      description: 'Image 7'
    }
  ]
  image8 = [
    {
      img: '../../../../../assets/images/gallery/8.jpg',
      thumb: '../../../../../assets/images/gallery/8.jpg',
      description: 'Image 8'
    }
  ]
  image9 = [
    {
      img: '../../../../../assets/images/gallery/9.jpg',
      thumb: '../../../../../assets/images/gallery/9.jpg',
      description: 'Image 9'
    }
  ]
  image10 = [
    {
      img: '../../../../../assets/images/gallery/10.jpg',
      thumb: '../../../../../assets/images/gallery/10.jpg',
      description: 'Image 10'
    }
  ]
  image11 =
    [
      {
        img: '../../../../../assets/images/gallery/11.jpg',
        thumb: '../../../../../assets/images/gallery/11.jpg',
        description: 'Image 11'
      }
    ];
  image12 =
    [
      {
        img: '../../../../../assets/images/gallery/12.jpg',
        thumb: '../../../../../assets/images/gallery/12.jpg',
        description: 'Image 12'
      }
    ];

  data: any;
  option: any;
  chartOption: any;
  options = {
    close: false,
    expand: true,
    minimize: false,
    reload: true
  };
  @BlockUI('projectWorkOne') blockUIProjectWorkOne: NgBlockUI;
  @BlockUI('projectWorkTwo') blockUIProjectWorkTwo: NgBlockUI;
  public breadcrumb: any;
  public zoom = 15;

  lat = 40.650002;
  lng = -73.949997;

  markers: Marker[] = [
    {
      lat: this.lat,
      lng: this.lng,
      label: ''
    }
  ];

  constructor(private chartApiservice: ChartApiService) { }
  /**
   *
   */
  getChordchart() {
    this.chartOption = {
      grid: {
        x: 40,
        x2: 40,
        y: 45,
        y2: 25
      },

      // Add tooltip
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // Axis indicator axis trigger effective
          type: 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
        }
      },

      // Add legend
      legend: {
        data: this.data['report'].data,
      },

      // Add custom colors
      color: ['#666EE8', '#FF9149', '#FF9966', '#FA8E57', '#FF637b', '#5175E0', '#A147F0', '#28D094', '#BABFC7'],

      // // Enable drag recalculate
      // calculable: true,
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [

        {
          name: 'Direct access',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Email marketing',
          type: 'bar',
          stack: 'advertising',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Advertising alliance',
          type: 'bar',
          stack: 'advertising',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video ads',
          type: 'bar',
          stack: 'advertising',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'Total',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
        },
        {
          name: 'Google',
          type: 'bar',
          barWidth: 12,
          stack: 'search engine',
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: 'Safari',
          type: 'bar',
          stack: 'search engine',
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: 'Opera',
          type: 'bar',
          stack: 'search engine',
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: 'Firefox',
          type: 'bar',
          stack: 'search engine',
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
    this.option = {
      legend: {
        data: ['Punch Card'],
        left: 'right'
      },
      polar: {},
      tooltip: {
        formatter: function (params) {
          return params.value[2] + ' commits in ' + hours[params.value[1]] + ' of ' + days[params.value[0]];
        }
      },
      angleAxis: {
        type: 'category',
        data: hours,
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#999',
            type: 'dashed'
          }
        },
        axisLine: {
          show: false
        }
      },
      radiusAxis: {
        type: 'category',
        data: days,
        axisLine: {
          show: false
        },
        axisLabel: {
          rotate: 45
        }
      },
      series: [{
        name: 'Punch Card',
        type: 'scatter',
        coordinateSystem: 'polar',
        symbolSize: function (val) {
          return val[2] * 2;
        },
        data: this.data['punchdata'].data,
        animationDelay: function (idx) {
          return idx * 5;
        }
      }]
    };
  }
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Timeline Left',
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
          'name': 'Timelines Left',
          'isLink': false
        }
      ]
    };
    this.chartApiservice.getTimelineData().subscribe(Response => {
      this.data = Response;
      this.getChordchart();
    });
  }

  reloadProjectWorkOne() {
    this.blockUIProjectWorkOne.start('Loading..');

    setTimeout(() => {
      this.blockUIProjectWorkOne.stop();
    }, 2500);
  }

  reloadProjectWorkTwo() {
    this.blockUIProjectWorkTwo.start('Loading..');

    setTimeout(() => {
      this.blockUIProjectWorkTwo.stop();
    }, 2500);
  }

}
