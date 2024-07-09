import { Component, OnInit, PipeTransform, Input, Output, Directive, EventEmitter, ViewChildren, QueryList} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TableApiService } from '../../../../_services/table-api.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Country } from './countries';
import { CountryService } from '../../../../_services/country.service';
import { NgbdSortableHeader, SortEvent } from '../../../../_directives/sortable.directive';

interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
}

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbSortable {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
@Component({
  selector: 'app-ngxboostraptables',
  templateUrl: './ngxboostraptables.component.html',
  styleUrls: ['./ngxboostraptables.component.css'],
  providers: [DecimalPipe, CountryService],
})
export class NgxboostraptablesComponent implements OnInit {
  breadcrumb: any;
  PERSON: any;
  TableData: any;
  pipe: any;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  column: any;
  employeeSearch: Observable<Employee[]>;
  filter = new FormControl('');
  employeeSortable: any;
  countries$: Observable<Country[]>;
  total$: Observable<number>;
@ViewChildren(NgbdSortableHeader) headers1: QueryList<NgbdSortableHeader>;
@ViewChildren(NgbSortable) headers: QueryList<NgbSortable>;

  constructor(private tableApiservice: TableApiService,
    public service: CountryService,
    pipe: DecimalPipe) {
    this.countries$ = service.countries$,
    this.total$ = service.total$;
     }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Ngxboostraptable',
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
          'name': 'Ngxboostraptable',
          'isLink': false,
          'link': '#'
        }
     ]
    };
    this.tableApiservice.getTableNgxData().subscribe(Response => {
      this.TableData = Response;
      this.getTabledata();
      this.searchData(this.pipe);
      this.employeeSortable = this.PERSON;
    });
  }

  getTabledata() {
    this.PERSON = this.TableData['EmployeeDetail'];
    this.collectionSize = this.PERSON.length;
  }
  /**
   * Pagination table
   */
  get PaginationData() {
    if (this.PERSON) {
      return this.PERSON.map((person, i) => ({ id: i + 1, ...person }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }
  }
  /**
   * Search table
   * '@param' text
   * '@param' pipe
   */
  search(text: string, pipe: PipeTransform) {
    return this.PERSON.filter(response => {
      const term = text.toLowerCase();
      return response.firstname.toLowerCase().includes(term)
         || response.lastname.toLowerCase().includes(term)
         || response.username.toLowerCase().includes(term);
    });
  }
/**
 *
 * '@param' pipe
 */
searchData(pipe: DecimalPipe) {
  this.employeeSearch = this.filter.valueChanges.pipe(
    startWith(''),
    map(text => this.search(text, pipe))
  );
}
/**
 *Sortable Table
 * '@param' param0
 */
onSort$({column, direction}: SortEvent) {

  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  // sorting employeeSortable
  if (direction === '') {
    this.employeeSortable = this.PERSON;
  } else {
    this.employeeSortable = [...this.PERSON].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

onSort({ column, direction }: SortEvent) {
  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}
}



