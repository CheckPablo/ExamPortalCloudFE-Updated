import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TableApiService {

  apiBaseURL = 'assets/data';
  loadEcommerceTableDataURL = null;
  loadInvoiceTableDataURL = null;
  loadBasicTableDataURL = null;
  loadTableBorderDataURL = null;
  loadTableStylingDataURL = null;
  loadTableApiDataURL = null;
  loadTableInitialisationDataURL = null;
  loadStylingDataURL = null;
  loadTableButtonDataURL = null;
  loadTableExportDataURL = null;
  loadTableHiddenDataURL = null;
  loadTableNgxDataURL = null;
   constructor(private http: HttpClient) {
    this.loadEcommerceTableDataURL = `${this.apiBaseURL}/dashboard/ecommerce/datatable.json`;
    this.loadInvoiceTableDataURL = `${this.apiBaseURL}/invoice/invoicelist/invoicetable.json`;
    this.loadBasicTableDataURL = `${this.apiBaseURL}/boostraptable/basictable.json`;
    this.loadTableBorderDataURL = `${this.apiBaseURL}/boostraptable/tableborder.json`;
    this.loadTableStylingDataURL = `${this.apiBaseURL}/boostraptable/tablestyling.json`;
    this.loadTableApiDataURL = `${this.apiBaseURL}/datatables/tableapi/tableapi.json`;
    this.loadTableInitialisationDataURL = `${this.apiBaseURL}/datatables/tableinitialisation/tableinitialisation.json`;
    this.loadStylingDataURL = `${this.apiBaseURL}/datatables/tablestyling/tablestyling.json`;
    this.loadTableButtonDataURL = `${this.apiBaseURL}/datatables/buttons/tablebuttons.json`;
    this.loadTableExportDataURL = `${this.apiBaseURL}/datatables/html5dataexport/html5dataexport.json`;
    this.loadTableHiddenDataURL = `${this.apiBaseURL}/datatables/hiddentable/hiddentable.json`;
    this.loadTableNgxDataURL = `${this.apiBaseURL}/boostraptable/ngxboostraptables.json`;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error
      console.error('error:', error.error.message);
    } else {
      // Error
      console.error(
        `Api server returned ${error.status}, ` +
        `error body: ${error.error}`);
    }
    // throwError is observable
    return throwError('Error has happened');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }


  getEcommerceTableData(): Observable<any> {
    return this.http.get(this.loadEcommerceTableDataURL, httpOptions);
  }

  getInvoiceTableData(): Observable<any> {
    return this.http.get(this.loadInvoiceTableDataURL, httpOptions);
  }
  getBasicTableData(): Observable<any> {
    return this.http.get(this.loadBasicTableDataURL, httpOptions);
  }
  getTableBorderData(): Observable<any> {
    return this.http.get(this.loadTableBorderDataURL, httpOptions);
  }
  getTableStylingData(): Observable<any> {
    return this.http.get(this.loadTableStylingDataURL, httpOptions);
  }
  getTableApiData(): Observable<any> {
    return this.http.get(this.loadTableApiDataURL, httpOptions);
  }
  getTableInitialisationData(): Observable<any> {
    return this.http.get(this.loadTableInitialisationDataURL, httpOptions);
  }
  getStylingData(): Observable<any> {
    return this.http.get(this.loadStylingDataURL, httpOptions);
  }
  getTableButtonData(): Observable<any> {
    return this.http.get(this.loadTableButtonDataURL, httpOptions);
  }
  getTableExportData(): Observable<any> {
    return this.http.get(this.loadTableExportDataURL, httpOptions);
  }
  getTableHiddenData(): Observable<any> {
    return this.http.get(this.loadTableHiddenDataURL, httpOptions);
  }
  getTableNgxData(): Observable<any> {
    return this.http.get(this.loadTableNgxDataURL, httpOptions);
  }
}

