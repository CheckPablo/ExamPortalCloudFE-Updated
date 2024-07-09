import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChartApiService {

  apiBaseURL = 'assets/data';
  loadDataURL = null;
  loadSalesDataURL = null;
  loadEcommerceDataURL = null;
  loadStatisticsDataURL = null;
  loadTimelineDataURL = null;
  loadInvoiceDataURL = null;
  constructor(private http: HttpClient) {
    this.loadDataURL = `${this.apiBaseURL}/chartist/charts/chartist.json`;
    this.loadSalesDataURL = `${this.apiBaseURL}/dashboard/sales/chartist.json`;
    this.loadEcommerceDataURL = `${this.apiBaseURL}/dashboard/ecommerce/chartist.json`;
    this.loadStatisticsDataURL = `${this.apiBaseURL}/advancecard/statistics/chartist.json`;
    this.loadStatisticsDataURL = `${this.apiBaseURL}/advancecard/statistics/chartist.json`;
    this.loadTimelineDataURL = `${this.apiBaseURL}/user-profile/user-profile.json`;
    this.loadInvoiceDataURL = `${this.apiBaseURL}/invoice-summary/invoice-summary.json`;
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

  getChartistData(): Observable<any> {
    return this.http.get(this.loadDataURL, httpOptions);
  }
  getSalesData(): Observable<any> {
    return this.http.get(this.loadSalesDataURL, httpOptions);
  }
  getEcommerceData(): Observable<any> {
    return this.http.get(this.loadEcommerceDataURL, httpOptions);
  }
  getStatisticsData(): Observable<any> {
    return this.http.get(this.loadStatisticsDataURL, httpOptions);
  }
  getTimelineData(): Observable<any> {
    return this.http.get(this.loadTimelineDataURL, httpOptions);
  }
  getInvoiceData(): Observable<any> {
    return this.http.get(this.loadInvoiceDataURL, httpOptions);
  }
}
