import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  @BlockUI('basicInitialization') blockUIBasicInitialization: NgBlockUI;
  @BlockUI('customButton') blockUICustomButton: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  loadingIndicator: true;
  data: any;
  rows: any;

  constructor(private tableApiservice: TableApiService) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Button Basic DataTable',
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
          'name': 'Button',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableButtonData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.rows = this.data.rows;
  }
  onSingleEvents() {
    
  }
  onSingleEventsitem() {
    
  }
  onSingleEventsitems() {
      }

  reloadBasicInitialization() {
    this.blockUIBasicInitialization.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicInitialization.stop();
    }, 2500);
  }

  reloadCustomButton() {
    this.blockUICustomButton.start('Loading..');

    setTimeout(() => {
      this.blockUICustomButton.stop();
    }, 2500);
  }
}
