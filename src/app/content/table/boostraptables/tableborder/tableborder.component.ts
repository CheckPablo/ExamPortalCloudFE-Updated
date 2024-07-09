import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-tableborder',
  templateUrl: './tableborder.component.html',
  styleUrls: ['./tableborder.component.css']
})
export class TableborderComponent implements OnInit {
  TableborderData: any;
  countries: any;
   @BlockUI('tableRowBorders') blockUITableRowBorders: NgBlockUI;
  @BlockUI('borderlessTable') blockUIBorderlessTable: NgBlockUI;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  loadingIndicator: true;
  timeout: any;
  public breadcrumb: any;

  constructor(private tableApiservice: TableApiService) {}
   ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Table border',
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
          'name': 'Table border',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableBorderData().subscribe(Response => {
      this.TableborderData = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.countries = this.TableborderData.rows;
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      
    }, 100);
  }

  reloadTableRowBorders() {
    this.blockUITableRowBorders.start('Loading..');

    setTimeout(() => {
      this.blockUITableRowBorders.stop();
    }, 2500);
  }

  reloadBorderlessTable() {
    this.blockUIBorderlessTable.start('Loading..');

    setTimeout(() => {
      this.blockUIBorderlessTable.stop();
    }, 2500);
  }
}
