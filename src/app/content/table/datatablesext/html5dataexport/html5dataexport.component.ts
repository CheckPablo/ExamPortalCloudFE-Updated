import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { TableexcelService } from '../../../../_services/tableexcel.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

@Component({
  selector: 'app-html5dataexport',
  templateUrl: './html5dataexport.component.html',
  styleUrls: ['./html5dataexport.component.css']
})
export class Html5dataexportComponent implements OnInit {

  @BlockUI('exportButtons') blockUIExportButtons: NgBlockUI;
  @BlockUI('printButtons') blockUIPrintButtons: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { suppressScrollY : true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  data: any;
  row: any;
  text1: string;
  textModal: string;
  isCopied1: boolean;
  isCopied2: boolean;
  isCopied3: boolean;
  basic = false;
  constructor(private _clipboardService: ClipboardService,
    private tableApiservice: TableApiService,
    private tableexcelService: TableexcelService) { }

  @ViewChild('reportContent') reportContent: ElementRef;
  loadingIndicator: true;
  public breadcrumb: any;

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'HTML 5 Data Export',
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
          'name': 'HTML 5 Data Export',
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
    this.row = this.data.rows;
  }
  callServiceToCopy() {
    this._clipboardService.copyFromContent(JSON.stringify(this.row));
  }

  onCopyFailure() {
      }
  getExcelData(): void {
    this.tableexcelService.exportAsExcelFile(this.row, 'Modern Admin - Clean Angular8+ Dashboard HTML Template');
  }

  getPdfData() {

    const doc = new jsPDF();
    const col = ['Name', 'Position', 'office', 'age', 'salary', 'startdate'];
    const rows = [];

    this.row.forEach(element => {
      const temp = [element.name, element.position, element.office, element.age, element.salary, element.startdate
      ];
      rows.push(temp);
    });
     doc.autoTable(col, rows);
    doc.save('Test.pdf');
  }
  getPrint(printME) {
    const printContents = document.getElementById(printME).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  reloadExportButtons() {
    this.blockUIExportButtons.start('Loading..');

    setTimeout(() => {
      this.blockUIExportButtons.stop();
    }, 2500);
  }

  reloadPrintButtons() {
    this.blockUIPrintButtons.start('Loading..');

    setTimeout(() => {
      this.blockUIPrintButtons.stop();
    }, 2500);
  }
}
