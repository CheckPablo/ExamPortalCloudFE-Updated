import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as chartsData from './data';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
  public config: PerfectScrollbarConfigInterface = { suppressScrollY: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  constructor() { }

  doctors = [
    {'name': 'Jane Andre','image':'../../../assets/images/portrait/small/avatar-s-4.png'},
    {'name': 'Kail Reack','image':'../../../assets/images/portrait/small/avatar-s-5.png'},
    {'name': 'Shail Black','image':'../../../assets/images/portrait/small/avatar-s-6.png'},
    {'name': 'Zena wall','image':'../../../assets/images/portrait/small/avatar-s-7.png'},
    {'name': 'Colin Welch','image':'../../../assets/images/portrait/small/avatar-s-8.png'}
  ]

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
  doctorList = [
    {
      'type': 'danger', 'designation': 'Dentist', 'name': 'Jane Andre',
      'image': this.firstRow, 'time': '8:00 A.M. - 12:00 P.M.', 'amount': '$ 1200.00', 'bagde': '+8 more'
    },
    {
      'type': 'success', 'designation': 'Dermatologist', 'name': 'Kail Reack',
      'image': this.secondRow, 'time': '10:00 A.M. - 1:00 P.M.', 'amount': '$ 1190.00', 'bagde': '+5 more'
    },
    {
      'type': 'danger', 'designation': 'Psychiatrist', 'name': 'Shail Black',
      'image': this.thirdRow, 'time': '11:00 A.M. - 2:00 P.M.', 'amount': '$ 999.00', 'bagde': '+3 more'
    },
    {
      'type': 'success', 'designation': 'Gastroenterologist', 'name': 'Zena wall',
      'image': this.fourthRow, 'time': '11:30 A.M. - 3:00 P.M.', 'amount': '$ 1150.00'
    },
    {
      'type': 'danger', 'designation': 'Pediatrician', 'name': 'Colin Welch',
      'image': this.fifthRow, 'time': '5:00 P.M. - 8:00 P.M.', 'amount': '$ 1180.00'
    }
  ];
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;
}
