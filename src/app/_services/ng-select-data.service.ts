import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface City {
  item_id: number;
  item_text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgSelectDataService {

  constructor(private http: HttpClient) { }

  getPeople(term: string = null): Observable<City[]> {
      let items = getMockCity();
      if (term) {
          items = items.filter(x => x.item_text.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
      }
      return of(items).pipe(delay(500));
  }
}

function getMockCity() {
  return [
      { item_id: 1, item_text: 'Alaska' },
      { item_id: 2, item_text: 'California' },
      { item_id: 3, item_text: 'Colorado' },
      { item_id: 4, item_text: 'New Mexico' },
      { item_id: 5, item_text: 'Alabama' },
      { item_id: 6, item_text: 'Connecticut' },
      { item_id: 7, item_text: 'New York' }
  ];
}
