///////////////////// start linechart ///////////
export const lineChartData: Array<any> = [
  {
    data: [56, 70, 55, 46, 67, 52, 70], label: 'Series C',
    backgroundColor: 'rgb(138,233,204,0.5)',
    borderColor: 'rgb(138,233,204,1)',
    pointBackgroundColor: 'rgb(138,233,204,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(138,233,204,0.2)',
    fill: true,
    lineTension: 0.4,
  },
  {
    data: [28, 48, 35, 29, 46, 27, 60], label: 'Series B',
    backgroundColor: 'rgb(68,186,239,0.7)',
    borderColor: 'rgb(168,186,239,1)',
    pointBackgroundColor: 'rgb(168,186,239,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(168,186,239,1)',
    fill: true,
    lineTension: 0.4,
  },
  {
    data: [0, 20, 11, 19, 10, 22, 9], label: 'Series A',
    backgroundColor: 'rgb(1,57,204,2.11)',
    borderColor: 'rgb(166,157,204,1)',
    pointBackgroundColor: 'rgb(166,157,204,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(166,157,204,1)',
    fill: true,
    lineTension: 0.4,
    }
];
export const lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const lineChartOptions: any = {
  animation: {
    duration: 1000, // general animation timebar
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      ticks: {
        padding: 4
      },
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      title:'Month',
      scaleLabel: {
        display: true,
        text: 'Month',
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      ticks: {
        padding: 4
      },
      scaleLabel: {
        display: true,
        labelString: 'Value',
      }
    }]
  },
};
export const lineChartColors: Array<any> = [
  {
    backgroundColor: 'rgb(138,233,204,0.5)',
    borderColor: 'rgb(138,233,204,1)',
    pointBackgroundColor: 'rgb(138,233,204,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(138,233,204,0.2)'
  },
  {
    backgroundColor: 'rgb(68,186,239,0.8)',
    borderColor: 'rgb(168,186,239,1)',
    pointBackgroundColor: 'rgb(168,186,239,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(168,186,239,1)'
  },
  {
    backgroundColor: 'rgb(1,57,204,2.5)',
    borderColor: 'rgb(166,157,204,1)',
    pointBackgroundColor: 'rgb(166,157,204,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(166,157,204,1)'
  }

];
export const lineChartLegend = true;
export const lineChartType = 'line';

///////////////////// Start AreaChart///////////

export const areaChartData: Array<any> = [
  { 
    data: [0, 150, 140, 105, 190, 230, 270], label: 'Series A',
    backgroundColor: 'rgb(237,238,240,0.4)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgb(237,238,240,0.4)',
    pointHoverBackgroundColor: 'rgb(237,238,240,0.4)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2',
    fill: true,
    lineTension: 0.4, },
  { 
    data: [0, 90, 120, 240, 140, 250, 190], label: 'Series B',
    backgroundColor: 'rgb(133,158,233,0.9)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgb(133,158,233,0.9)',
    pointHoverBackgroundColor: 'rgb(133,158,233,0.9)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2' ,
    fill: true,
    lineTension: 0.4,}
];
export const areaChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const areaChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      ticks: {
        padding: 4
    },
      scaleLabel: {
        display: true,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      ticks: {
        padding: 4
    },
      scaleLabel: {
        display: true,
        labelString: 'Value'
      }
    }]
  },
};
export const areaChartColors: Array<any> = [
  {
    backgroundColor: 'rgb(237,238,240,0.4)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgb(237,238,240,0.4)',
    pointHoverBackgroundColor: 'rgb(237,238,240,0.4)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2'
  },
  {

    backgroundColor: 'rgb(133,158,233,0.9)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgb(133,158,233,0.9)',
    pointHoverBackgroundColor: 'rgb(133,158,233,0.9)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2'
  },

];
export const areaChartLegend = true;
export const areaChartType = 'line';

///////////////////// End AreaChart///////////

///////////////////// End ScatterChart///////////
// scatterChart//
export const scatterChartData: Array<any> = [
  {
    data: [
      {
        x: 1,
        y: -0.01711,
      }, {
        x: 1.26,
        y: -2.708e-2,
      }, {
        x: 1.58,
        y: -4.285e-2,
      }, {
        x: 2.0,
        y: -6.772e-2,
      }, {
        x: 2.51,
        y: -1.068e-1,
      }, {
        x: 3.16,
        y: -1.681e-1,
      }, {
        x: 3.98,
        y: -2.635e-1,
      }, {
        x: 5.01,
        y: -4.106e-1,
      }, {
        x: 6.31,
        y: -6.339e-1,
      }, {
        x: 7.94,
        y: -9.659e-1,
      }, {
        x: 10.00,
        y: -1.445,
      }, {
        x: 12.6,
        y: -2.110,
      }, {
        x: 15.8,
        y: -2.992,
      }, {
        x: 20.0,
        y: -4.102,
      }, {
        x: 25.1,
        y: -5.429,
      }, {
        x: 31.6,
        y: -6.944,
      }, {
        x: 39.8,
        y: -8.607,
      }, {
        x: 50.1,
        y: -1.038e1,
      }, {
        x: 63.1,
        y: -1.223e1,
      }, {
        x: 79.4,
        y: -1.413e1,
      }, {
        x: 100.00,
        y: -1.607e1,
      }, {
        x: 126,
        y: -1.803e1,
      }, {
        x: 158,
        y: -2e1,
      }, {
        x: 200,
        y: -2.199e1,
      }, {
        x: 251,
        y: -2.398e1,
      }, {
        x: 316,
        y: -2.597e1,
      }, {
        x: 398,
        y: -2.797e1,
      }, {
        x: 501,
        y: -2.996e1,
      }, {
        x: 631,
        y: -3.196e1,
      }, {
        x: 794,
        y: -3.396e1,
      }, {
        x: 1000,
        y: -3.596e1,
      }
    ],
     label: 'V(node2)',
    backgroundColor: 'rgba(81,117,224,.6)',
    borderColor: 'transparent',
    pointBorderColor: '#5175E0',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  }

];
export const scatterChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const scatterChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  
   scales: {
    myScale: {
        type: 'logarithmic',
        position: 'bottom',
        gridLines: {
          zeroLineColor: 'rgba(0,0,0,.1)',
          color: '#f3f3f3',
          drawTicks: false,
        },
        ticks: {
          padding: 4
        },
        scaleLabel: {
          labelString: 'Frequency',
          display: true,
        }
      },
      yAxes: [{
        type: 'linear',
        ticks: {
          padding: 4,
          userCallback: function (tick) {
            return tick.toString() + 'dB';
          }
        },
        gridLines: {
          zeroLineColor: 'rgba(81,117,224,1)',
          color: '#f3f3f3',
          drawTicks: false,
        },
        scaleLabel: {
          labelString: 'Voltage',
          display: true
        }
      }]
  }
};

export const scatterChartLegend = true;
export const scatterChartType = 'scatter';

///////////////////// Start scatterChart ///////////////

///////////////////// Start Barchart ///////////////
export const barChartOptions: any = {
  responsive: true,
  scaleShowVerticalLines: false,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
          categoryPercentage: 0.5
        }]
}
};
export const barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
export const barChartType = 'bar';
export const barChartLegend = true;
export const barChartData: any[] = [
  { 
    data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',
    backgroundColor: '#28d094',
    borderColor: '#28d094',
    pointBackgroundColor: '#28d094',
    pointBorderColor: '#28d094',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#28d094',
    barPercentage: 0.9,
    categoryPercentage: 0.5 },
  { 
    data: [28, 48, 40, 59, 86, 27, 90], label: 'Series B',
    backgroundColor: '#f98e76',
    borderColor: '#f98e76',
    pointBackgroundColor: '#f98e76',
    pointBorderColor: '#f98e76',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#f98e76',
    barPercentage: 0.9,
    categoryPercentage: 0.5 }
];
export const barChartColors: Array<any> = [
  {
    
    },
  {
    
  },
];

///////////////////// End barchart////////////////

///////////////////// Start Doughnut////////////////

export const doughnutChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
export const doughnutChartData: any[] = [350, 250, 100, 200, 80];
export const doughnutChartType = 'doughnut';
export const doughnutChartColors: any[] = ['#00a5a8', '#28d094', '#ff4558', '#ff7d4d', '#626e82'];
export const doughnutChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};

///////////////////// End Doughnut////////////////

///////////////////// Start Radar////////////////

export const radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
export const radarChartData: any[] = [
  { label: 'Series A',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(245,0,87,.3)',
    borderColor: 'rgba(229,229,229,0.7)',
    pointBackgroundColor: 'rgba(245,0,87,.3)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(245,0,87)'},
    
  { label: 'Series B',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(29,233,182,.6)',
    borderColor: 'rgba(229,229,229,0.7)',
    pointBackgroundColor: 'rgb(29, 233,182)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(29, 233,182)' }
];
export const radarChartType = 'radar';

export const radarChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};
///////////////////// End Radar////////////////


///////////////////// start PieChart////////////////

export const pieChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
export const pieChartData: any[] = [300, 200, 100, 150, 80];
export const pieChartType = 'pie';
export const pieChartColors: any[] = ['#00a5a8', '#28d094', '#ff4558', '#ff7d4d', '#626e82'];
export const pieChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};
///////////////////// end Pie chart ////////////////

///////////////////// start polar-chart///////////
// PolarArea
export const polarAreaChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
export const polarAreaChartData: any[] = [300, 500, 100, 40, 120];
export const polarAreaLegend = true;
export const ploarChartColors: any[] = ['#00a5a8', '#28d094', '#ff4558', '#ff7d4d', '#626e82'];
export const polarChartBorderColor: any = '#fff';
export const polarAreaChartType = 'polarArea';
export const polarChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};
///////////////////// end polar-chart///////////

// lineChartsData//
export const lineChartsData: Array<any> = [

  {
    data: [65, 59, 80, 81, 56, 55, 40],
     label: 'My First dataset',
    fill: false,
    borderDash: [5, 5],
    borderColor: '#9C27B0',
    pointBorderColor: '#9C27B0',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    lineTension: 0.4,
    },
  {
    data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset',
    fill: false,
    borderDash: [5, 5],
    borderColor: '#00A5A8',
    pointBorderColor: '#00A5A8',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    lineTension: 0.4,
  },

  {
    data: [45, 25, 16, 36, 67, 18, 76], label: 'My Third dataset - No bezier',
    lineTension: 0,
    fill: false,
    borderColor: '#FF7D4D',
    pointBorderColor: '#FF7D4D',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  }

];
export const lineChartsLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const lineChartsOptions: any = {
  animation: {
    duration: 1000, // general animation time
    },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
    mode: 'label'
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    myScale: [{
      display: true,
      gridLines: {
        color: 'f3f3f3',
        drawTicks: false,
      },
      ticks: {
        padding: 4
      },
      scaleLabel: {
        display: true,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: '#f3f3f3',
        drawTicks: false,
      },
      ticks: {
        padding: 4
      },
      scaleLabel: {
        display: true,
        labelString: 'Value'
      }
    }]
  },
  title: {
    display: true,
    text: 'Chart.js Line Chart - Legend'
  }
};
export const lineChartsColors: Array<any> = [
  {
    fill: false,
    borderDash: [5, 5],
    borderColor: '#9C27B0',
    pointBorderColor: '#9C27B0',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {

    fill: false,
    borderDash: [5, 5],
    borderColor: '#00A5A8',
    pointBorderColor: '#00A5A8',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {
    lineTension: 0,
    fill: false,
    borderColor: '#FF7D4D',
    pointBorderColor: '#FF7D4D',
    pointBackgroundColor: '#FFF',
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
];
export const lineChartsLegend = true;
export const lineChartsType = 'line';

// lineChartsData//



