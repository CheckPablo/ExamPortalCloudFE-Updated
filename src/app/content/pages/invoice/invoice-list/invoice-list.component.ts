import { Component, OnInit } from '@angular/core';
import { TableApiService } from 'src/app/_services/table-api.service';

// declare var require: any;
// const data: any = require('../../../../../assets/data/invoice/invoicelist/invoicetable.json');

interface Invoice {
  date: string;
  invoice: string;
  orderno: string;
  customername: string;
  due: string;
  amount: string;
  balancedue: string;
  actions: string;
}
interface Invoice1 {
  date: string;
  invoice: string;
  orderno: string;
  customername: string;
  due: string;
  amount: string;
  balancedue: string;
  actions: string;
}
interface Invoice2 {
  date: string;
  invoice: string;
  orderno: string;
  customername: string;
  due: string;
  amount: string;
  balancedue: string;
  actions: string;
}
interface Invoice3 {
  date: string;
  invoice: string;
  orderno: string;
  customername: string;
  due: string;
  amount: string;
  balancedue: string;
  actions: string;
}
interface Invoice4 {
  date: string;
  invoice: string;
  orderno: string;
  customername: string;
  due: string;
  amount: string;
  balancedue: string;
  actions: string;
}

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  public breadcrumb: any;
  data: any;
  INVOICE: any;
  INVOICE1: any;
  INVOICE2: any;
  INVOICE3: any;
  INVOICE4: any;
  allRowsSelected: boolean;
  // invoices = this.INVOICE;
  // invoices1 = this.INVOICE1;
  // invoices2 = this.INVOICE2;
  // invoices3 = this.INVOICE3;
  // invoices4 = this.INVOICE4;
  getTabledata() {
   this.INVOICE = this.data['invoice'];
   this.INVOICE1 = this.data['invoice1'];
  this.INVOICE2 = this.data['invoice2'];
  this.INVOICE3 = this.data['invoice3'];
  this.INVOICE4 = this.data['invoice4'];
  }
  constructor( private tableApiservice: TableApiService) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Invoice List',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Invoice',
          'isLink': true,
          'link': ''
        },
        {
          'name': 'Invoice List',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getInvoiceTableData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
}
