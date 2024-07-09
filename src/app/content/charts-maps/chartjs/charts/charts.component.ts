import { Component, OnInit } from "@angular/core";
import { NgBlockUI, BlockUI } from "ng-block-ui";
import { ChartConfiguration, ChartOptions } from 'chart.js';

import * as chartsData from "./chartjs";
import { title } from "process";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  @BlockUI("barCharts") blockUIBarCharts: NgBlockUI;
  @BlockUI("lineCharts") blockUILineCharts: NgBlockUI;

  public breadcrumb: any;
  showNew: false;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true,
  };

  /**
   * barChart
   */
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;

  /**
   * lineChart
   */
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;

  /**
   * areaChart
   */
  public areaChartData = chartsData.areaChartData;
  public areaChartLabels = chartsData.areaChartLabels;
  public areaChartOptions = chartsData.areaChartOptions;
  public areaChartColors = chartsData.areaChartColors;
  public areaChartLegend = chartsData.areaChartLegend;
  public areaChartType = chartsData.areaChartType;

  /**
   * scatterChartData
   */
  public scatterChartData = chartsData.scatterChartData;
  public scatterChartLabels = chartsData.scatterChartLabels;
  public scatterChartOptions = chartsData.scatterChartOptions;
  //  public scatterChartColors = chartsData.scatterChartColors;
  public scatterChartLegend = chartsData.scatterChartLegend;
  public scatterChartType = chartsData.scatterChartType;
  /**
  * Doughnut
  */


  public doughnutChartLabels: string[] = chartsData.doughnutChartLabels;;
  public doughnutChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    {
      data: chartsData.doughnutChartData,
      backgroundColor: chartsData.doughnutChartColors,
    },
  ];
  public doughnutChartOptions = chartsData.doughnutChartOptions;
  /**
  * Radar
  */
   public radarChartLabels = chartsData.radarChartLabels;
   public radarChartData = chartsData.radarChartData;
   public radarChartType = chartsData.radarChartType;
   public radarChartOptions = chartsData.radarChartOptions;

  /**
   * Pie
   */
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = chartsData.pieChartLabels;
  public pieChartData = [{
    data: chartsData.pieChartData,
    backgroundColor: chartsData.pieChartColors,
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartType = chartsData.pieChartType;

  /**
   * PolarArea
   */
  public polarAreaChartLabels = chartsData.polarAreaChartLabels;
  public polarAreaChartData: ChartConfiguration<'polarArea'>['data']['datasets'] = [
    {
      data: chartsData.polarAreaChartData,
      backgroundColor: chartsData.ploarChartColors,
      borderColor: chartsData.polarChartBorderColor,
    }
  ];
  public polarAreaLegend = chartsData.polarAreaLegend;
  public polarAreaChartType = chartsData.polarAreaChartType;
  public polarChartOptions = chartsData.polarChartOptions;

  /**
   * lineChart
   */
  public lineChartsData = chartsData.lineChartsData;
  public lineChartsLabels = chartsData.lineChartsLabels;
  public lineChartsOptions = chartsData.lineChartsOptions;
  public lineChartsColors = chartsData.lineChartsColors;
  public lineChartsLegend = chartsData.lineChartsLegend;
  public lineChartsType = chartsData.lineChartsType;

  /**
   * OnInit
   */
  ngOnInit() {
    this.breadcrumb = {
      mainlabel: "Chartjs Charts",
      links: [
        {
          name: "Home",
          isLink: true,
          link: "/dashboard/sales",
        },
        {
          name: "Chartjs",
          isLink: true,
          link: "#",
        },
      ],
    };
  }
  /**
   * Reload card
   */
  reloadBarCharts() {
    this.blockUIBarCharts.start("Loading..");

    setTimeout(() => {
      this.blockUIBarCharts.stop();
    }, 2500);
  }

  reloadLineCharts() {
    this.blockUILineCharts.start("Loading..");

    setTimeout(() => {
      this.blockUILineCharts.stop();
    }, 2500);
  }
}
