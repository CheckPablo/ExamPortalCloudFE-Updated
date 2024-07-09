import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarComponent, PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-basicinitialisation',
  templateUrl: './basicinitialisation.component.html',
  styleUrls: ['./basicinitialisation.component.css']
})
export class BasicinitialisationComponent implements OnInit {

  @BlockUI('zeroConfiguration') blockUIZeroConfiguration: NgBlockUI;
  @BlockUI('defaultOrdering') blockUIDefaultOrdering: NgBlockUI;

  public configScroll: PerfectScrollbarConfigInterface = { suppressScrollY : false, wheelPropagation: false };
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
  constructor(private tableApiservice: TableApiService) {

  }
 data: any;
  rows: any = [];
  defaultrows: any;
  DOMrows: any;
  Scrollrows: any;
  public breadcrumb: any;
  temp2 = this.rows;
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Basic DataTables',
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
          'name': 'Basic DataTables',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableInitialisationData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.rows = this.data.rows;
    this.defaultrows = this.data.defaultrows;
    this.DOMrows = this.data.DOMrows;
    this.Scrollrows = this.data.Scrollrows;
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
    this.defaultrows = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.defaultrows];
    // filter our data
    const temp = this.defaultrows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.defaultrows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  updateDOMFilter(event) {
    const val = event.target.value.toLowerCase();
    this.DOMrows = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.DOMrows];
    // filter our data
    const temp = this.DOMrows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.DOMrows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;

  }

  reloadZeroConfiguration() {
    this.blockUIZeroConfiguration.start('Loading..');

    setTimeout(() => {
      this.blockUIZeroConfiguration.stop();
    }, 2500);
  }

  reloadDefaultOrdering() {
    this.blockUIDefaultOrdering.start('Loading..');

    setTimeout(() => {
      this.blockUIDefaultOrdering.stop();
    }, 2500);
  }

}


