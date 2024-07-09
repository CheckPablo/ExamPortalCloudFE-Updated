import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NgbTypeahead, NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {Observable,  Subject, merge, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, tap, switchMap} from 'rxjs/operators';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

declare var require: any;
const statesJson = require('../../../../assets/data/extra-components/typeahead/typeahead.json');
const states = statesJson.states;
const statesWithFlags = statesJson.statesWithFlags;

/* Typeahead with Service */
const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(WIKI_URL, {params: PARAMS.set('search', term)}).pipe(
        map(response => response[1])
      );
  }
}
/* Typeahead with Service */

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  providers: [WikipediaService, NgbTypeaheadConfig],
  styleUrls: ['./type-ahead.component.css']
})
export class TypeAheadComponent implements OnInit {

  @BlockUI('typeAhead') blockUITypeAhead: NgBlockUI;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  public breadcrumb: any;

  constructor(private _service: WikipediaService,
    config: NgbTypeaheadConfig) {
      config.showHint = true;
   }


  /* Basic Typeahed : START */
  public basicModel: any;
  /* Basic Typeahed : END */

  /* Open on Focus : START */
  public openOnFocusModel: any;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  /* Open on Focus : END */

  /* Formatted Results : START */
  public formattedResultsModel: any;

  /* Formatted Resutls : END */

  /* Typeahead with Service */
  public searviceModel: any;
  searching = false;
  searchFailed = false;
  /* Typehead with service */

  /* Typeahead with template */
  public typeaheadTemplateModel: any;

  /* Typeahead with template */

  /* Typeahead with Config */
  public typeaheadConfigModel: any;

  popupOpen: Observable<boolean>;

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'TypeAhead',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Extra Components',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'TypeAhead',
          'isLink': false
        }
      ]
    };
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? []
      : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  searchOnFocus = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  reloadTypeAhead() {
    this.blockUITypeAhead.start('Loading..');

    setTimeout(() => {
      this.blockUITypeAhead.stop();
    }, 2500);
  }

  formatter = (result: string) => result.toUpperCase();

  searchForFormattedResults = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchFromService = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this._service.search(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )
  formatter1 = (x: {name: string}) => x.name;

  searchWithTemplate = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchWithConfig = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : states.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
    )
  /* Typeahead with Config */
}
