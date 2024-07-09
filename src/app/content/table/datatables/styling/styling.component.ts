import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit {

  @BlockUI('baseStyle') blockUIBaseStyle: NgBlockUI;
  @BlockUI('noStylingClasses') blockUINoStylingClasses: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;

  constructor(private tableApiservice: TableApiService) { }
  public breadcrumb: any;
  data: any;
  rows: any = [];
  stylerows: any;
  baserows: any;
  temp2 = this.rows;

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Styling DataTable',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'DataTables',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Styling DataTable',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getStylingData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.rows = this.data.rows;
    this.stylerows = this.data.stylerows;
    this.baserows = this.data.baserows;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.rows];
    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }
  updatedefaultFilter(event) {
    const val = event.target.value.toLowerCase();
    this.stylerows = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.stylerows];
    // filter our data
    const temp = this.stylerows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.stylerows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }
  updatecompactFilter(event) {
    const val = event.target.value.toLowerCase();
    this.baserows = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.baserows];
    // filter our data
    const temp = this.baserows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.baserows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  reloadBaseStyle() {
    this.blockUIBaseStyle.start('Loading..');

    setTimeout(() => {
      this.blockUIBaseStyle.stop();
    }, 2500);
  }

  reloadNoStylingClasses() {
    this.blockUINoStylingClasses.start('Loading..');

    setTimeout(() => {
      this.blockUINoStylingClasses.stop();
    }, 2500);
  }
}
