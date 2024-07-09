import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.component.html',
  styleUrls: ['./invoice-template.component.css']
})
export class InvoiceTemplateComponent implements OnInit {
  public breadcrumb: any;
  constructor() { }

  ngOnInit() {
     this.breadcrumb = {
    'mainlabel': 'Invoice Template',
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
        'name': 'Invoice Template',
        'isLink': false
      }
    ]
  };
  }

}
