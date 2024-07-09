import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableApiService } from 'src/app/_services/table-api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
data: any;

  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  selected = [];
  id: number;
  loadingIndicator: true;
  rows: any;
  editing = {};
  row: any;
  public breadcrumb: any;

  constructor(private tableApiservice: TableApiService) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'API DataTable',
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
          'name': 'API DataTable',
          'isLink': false
        }
      ]
    };
      this.tableApiservice.getTableApiData().subscribe(Response => {
      this.data = Response;
      this.getTabledata();
      });
  }
  getTabledata() {
    this.rows = this.data.rows;
    this.row = this.data.row;
  }
  updateFiltername(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterposition(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.position.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilteroffice(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.office.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }

  updateFilterage(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.age.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFiltersalary(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.salary.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterstartdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.startdate.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private newAttribute = { 'id': 15, name: 'Mark', position: 'Otto', office: '@mdo', age: '31', salary: '12000', startdate: '16/05/2017' };

  addFieldValue() {
    this.rows.push(this.newAttribute);
    this.rows = [...this.rows];
  }
  deleteFieldValue(index) {
    this.rows.splice(index, 1);
  }
  deleteRow(id) {
    let i = 0;
    for (const row of this.rows) {
      if (row.id === id) {
        break;
      }
      i++;
    }
    const temp = [...this.rows];
    temp.splice(i, 1);
    this.rows = temp;
  }
   updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;
    this.row[rowIndex][cell] = event.target.value;
    const temp = [...this.row];
    this.row = temp;
  }

  reloadAddRows() {
    this.blockUIAddRows.start('Loading..');

    setTimeout(() => {
      this.blockUIAddRows.stop();
    }, 2500);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  reloadRowSelection() {
    this.blockUIRowSelection.start('Loading..');

    setTimeout(() => {
      this.blockUIRowSelection.stop();
    }, 2500);
  }
  deleteCheckedRow() {
    let index = 0;
    const removedIndex = [];
    const temp = [...this.rows];
    for (const row of temp) {
      for (const selectedRow of this.selected) {
        if (row.id === selectedRow.id) {
          removedIndex.push(index);
        }
      }
      index++;
    }

    for (let i = removedIndex.length - 1; i >= 0; i--) {
      temp.splice(removedIndex[i], 1);
    }
    this.rows = temp;
    this.selected = [];
  }
}
