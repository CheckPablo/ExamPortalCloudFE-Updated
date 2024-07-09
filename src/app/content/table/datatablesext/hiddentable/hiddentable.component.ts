import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-hiddentable',
  templateUrl: './hiddentable.component.html',
  styleUrls: ['./hiddentable.component.css']
})
export class HiddentableComponent implements OnInit {

  @BlockUI('hiddenByDefalut') blockUIHiddenByDefalut: NgBlockUI;
  public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  expanded: any = {};
  timeout: any;
  public breadcrumb: any;
  constructor(private tableApiservice: TableApiService) { }
  tab1 = true;
  tab2 = false;
  data: any;
  rows: any;
  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Hidden On Load',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'DataTable',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Hidden On Load',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableHiddenData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.rows = this.data.rows;
  }

  reloadHiddenByDefalut() {
    this.blockUIHiddenByDefalut.start('Loading..');

    setTimeout(() => {
      this.blockUIHiddenByDefalut.stop();
    }, 2500);
  }
}
