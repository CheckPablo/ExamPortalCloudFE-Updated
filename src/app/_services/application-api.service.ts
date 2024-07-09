import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {
  apiBaseURL = 'assets/data';
  loadChatsDataURL = null;
  loadEmailDataURL = null;
  loadChatContactDataURL = null;
   constructor(private http: HttpClient) {
    this.loadChatsDataURL = `${this.apiBaseURL}/application/chats.json`;
    this.loadChatContactDataURL = `${this.apiBaseURL}/application/chatcontact.json`;
    this.loadEmailDataURL = `${this.apiBaseURL}/application/email.json`;
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
  getChatsData(): Observable<any> {
    return this.http.get(this.loadChatsDataURL, httpOptions);
  }
  getChatContactData(): Observable<any> {
    return this.http.get(this.loadChatContactDataURL, httpOptions);
  }
  getEmailData(): Observable<any> {
    return this.http.get(this.loadEmailDataURL, httpOptions);
  }
}

