import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { ChartApiService } from '../../../../_services/chart.api';
interface Sales {
  name: string;
  sales: string;
  receipts: string;
  due: string;

}


@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit {
  data: any;
  chartOption: any;
  Sales: any;
  ExpenseschartOption: any;
  public breadcrumb: any;
  constructor(private chartApiservice: ChartApiService) { }
  @BlockUI('totalReceivables') blockUITotalReceivables: NgBlockUI;
  @BlockUI('salesRecieptsDues') blockUISalesRecieptsDues: NgBlockUI;
 getInvoicechart() {
  this.Sales = this.data['sales'];
  this.chartOption = {
    grid: {
      x: 40,
      x2: 40,
      y: 35,
      y2: 25
    },

    // Add tooltip
    tooltip: {
      trigger: 'axis',
      enterable: false,
    },

    // Add legend
    legend: {
      data: ['Total Sales', 'Total Receipts', 'Total Expenses']
    },

    // Add custom colors
    color: ['#3BAFDA', '#37BC9B', '#F6BB42'],

    // Horizontal axis
    xAxis: [{
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }],

    // Vertical axis
    yAxis: [{
      type: 'value'
    }],

    // Add series
    series: [
      {
        name: 'Total Sales',
        type: 'bar',
        data: this.data.TotalSales.TotalSales[0],
      },
      {
        name: 'Total Receipts',
        type: 'bar',
        data: this.data.TotalReceipts.TotalReceipts[0],
      },
      {
        name: 'Total Expenses',
        type: 'bar',
        data: this.data.TotalExpenses.TotalExpenses[0],
      }
    ]
  };
  this.ExpenseschartOption = {
    legend: {
      orient: 'horizontal',
      x: 'center',
      data: ['Internet', 'Infrastructure', 'Party', 'Assets', 'Electricity']
    },

    // Add custom colors
    color: ['#FECEA8', '#FF847C', '#E84A5F', '#2A363B', '#99B898'],

    // Display toolbox
    toolbox: {
      show: true,
      orient: 'vertical',
    },

    // Enable drag recalculate
    // calculable: true,

    // Add series
    series: [
      {
        name: 'Browsers',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '57.5%'],
        itemStyle: {
          normal: {
            label: {
              show: true
            },
            labelLine: {
              show: true
            }
          },
          emphasis: {
            label: {
              show: true,
              formatter: '{b}' + '\n\n' + '{c} ({d}%)',
              position: 'center',
              textStyle: {
                fontSize: '17',
                fontWeight: '500'
              }
            }
          }
        },
        data: [
          { value: 335, name: 'Internet' },
          { value: 1548, name: 'Infrastructure' },
          { value: 135, name: 'Party' },
          { value: 234, name: 'Assets' },
          { value: 650, name: 'Electricity' }
        ]
      }
    ]
  };
}
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Invoice Summary',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Invoice',
          'isLink': true,
          'link': ''
        },
        {
          'name': 'Invoice Summary',
          'isLink': false
        }
      ]
    };
      this.chartApiservice.getInvoiceData().subscribe(Response => {
      this.data = Response;
      this.getInvoicechart();
      });
  }

  reloadTotalReceivables() {
    this.blockUITotalReceivables.start('Loading..');

    setTimeout(() => {
      this.blockUITotalReceivables.stop();
    }, 2500);
  }

  reloadSalesRecieptsDues() {
    this.blockUISalesRecieptsDues.start('Loading..');

    setTimeout(() => {
      this.blockUISalesRecieptsDues.stop();
    }, 2500);
  }
}
