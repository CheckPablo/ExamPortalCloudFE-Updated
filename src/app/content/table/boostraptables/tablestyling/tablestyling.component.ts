import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-tablestyling',
  templateUrl: './tablestyling.component.html',
  styleUrls: ['./tablestyling.component.css']
})
export class TablestylingComponent implements OnInit {
  TableStylingData: any;
  countries: any;
  @ViewChild('myTable', { static: true }) table: any;
  @BlockUI('defaultStyling') blockUIDefaultStyling: NgBlockUI;
  @BlockUI('tableHeaderStyling') blockUITableHeaderStyling: NgBlockUI;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  loadingIndicator: true;
  timeout: any;
  public breadcrumb: any;

  constructor(private tableApiservice: TableApiService) {
  }
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Tables styling',
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
          'name': 'Tables styling',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableStylingData().subscribe(Response => {
      this.TableStylingData = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.countries = this.TableStylingData.rows;
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      
    }, 100);
  }

  toggleExpandRow(row) {
    
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    
  }

  reloadDefaultStyling() {
    this.blockUIDefaultStyling.start('Loading..');

    setTimeout(() => {
      this.blockUIDefaultStyling.stop();
    }, 2500);
  }

  reloadTableHeaderStyling() {
    this.blockUITableHeaderStyling.start('Loading..');

    setTimeout(() => {
      this.blockUITableHeaderStyling.stop();
    }, 2500);
  }

}
