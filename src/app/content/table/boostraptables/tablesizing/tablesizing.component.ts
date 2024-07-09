import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-tablesizing',
  templateUrl: './tablesizing.component.html',
  styleUrls: ['./tablesizing.component.css']
})
export class TablesizingComponent implements OnInit {
  TablesizingData: any;
  countries: any;
  @BlockUI('extraLargeTable') blockUIExtraLargeTable: NgBlockUI;
  @BlockUI('largeTable') blockUILargeTable: NgBlockUI;

   options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  loadingIndicator: true;
  public breadcrumb: any;

  constructor(private tableApiservice: TableApiService) {
  }
  timeout: any;

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Tables Sizing',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Tables',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Tables Sizing',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableBorderData().subscribe(Response => {
      this.TablesizingData = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.countries = this.TablesizingData.rows;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      
    }, 100);
  }

  reloadExtraLargeTable() {
    this.blockUIExtraLargeTable.start('Loading..');

    setTimeout(() => {
      this.blockUIExtraLargeTable.stop();
    }, 2500);
  }

  reloadLargeTable() {
    this.blockUILargeTable.start('Loading..');

    setTimeout(() => {
      this.blockUILargeTable.stop();
    }, 2500);
  }
}
