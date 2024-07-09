import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-basictable',
  templateUrl: './basictable.component.html',
  styleUrls: ['./basictable.component.css']
})
export class BasictableComponent implements OnInit {
  BasictableData: any;
  countries: any;
  // public COUNTRIES = this.BasictableData.rows;
  // countries = this.COUNTRIES;
  @BlockUI('basicTables') blockUIBasicTables: NgBlockUI;
  @BlockUI('inverseTable') blockUIInverseTable: NgBlockUI;

   options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  loadingIndicator: true;
  public breadcrumb: any;

  constructor(private tableApiservice: TableApiService) {}

  ngOnInit() {
    this.breadcrumb = {
      mainlabel: 'Basic Tables',
      links: [
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
          'name': 'Basic Tables',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getBasicTableData().subscribe(Response => {
      this.BasictableData = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.countries = this.BasictableData.rows;
  }
  reloadBasicTables() {
    this.blockUIBasicTables.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicTables.stop();
    }, 2500);
  }

  reloadInverseTable() {
    this.blockUIInverseTable.start('Loading..');

    setTimeout(() => {
      this.blockUIInverseTable.stop();
    }, 2500);
  }

}
