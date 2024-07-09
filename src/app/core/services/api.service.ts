import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

let httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + window.localStorage.getItem('token')
  })
};

export abstract class ApiService<T> {
  basePath = environment.apiUrl;
  apiURL = `${this.basePath}api/`;

  constructor(protected httpClient: HttpClient, protected actionUrl: string) {
    httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
      })
    }
  }

  public create(model: T): Observable<T> {
    return this.httpClient.post<T>(this.apiURL + `${this.actionUrl}`, model, httpOptions);
  }
 
  public update(id: number, model: T): any {
    return this.httpClient.put<T>(`${this.apiURL}${this.actionUrl}/${id}`, model, httpOptions);
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiURL}${this.actionUrl}/${id}`, httpOptions);
  }

  public deleteUrl(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiURL}${this.actionUrl}/${url}`, httpOptions);
  }

  public download(url: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.apiURL}${url}`, httpOptions);
  }

  public get(url?: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiURL}${this.actionUrl}`, httpOptions);
  }

  public getUrl(url?: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}${this.actionUrl}/${url}`, httpOptions);
  }

  public getById(id: string | null | undefined): Observable<T> {
    return this.httpClient.get<T>(`${this.apiURL}${this.actionUrl}/${id}`, httpOptions);
  }

  public getEndpoint(endPoint?: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.apiURL}${this.actionUrl}/${endPoint}`, httpOptions);
  }

  public postAnonymous(endPoint: string, model: any): Observable<any> {
    return this.httpClient.post<T>(this.apiURL + `${this.actionUrl}/${endPoint}`, model, httpOptions);
  }

  public postEndpoint(endPoint: string, model: any): Observable<T> {
    return this.httpClient.post<T>(this.apiURL + `${this.actionUrl}/${endPoint}`, model, httpOptions);
  }
  
  postFileEndpoint(endPoint:string , model: T, file: File): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify(model));
    return this.httpClient.post<T>(this.apiURL + `${this.actionUrl}/${endPoint}`, formData, httpOptions);
  }

  public postUrl(endPoint: string, model: any): Observable<any> {
    return this.httpClient.post(this.apiURL + `${this.actionUrl}/${endPoint}`, model, httpOptions).pipe(catchError(err => {
          
      throw 'error in source. Details: ' + JSON.stringify(err);
    }));
  }

  public updateUrl(endPoint: string, model: any): Observable<any> {
    return this.httpClient.put(this.apiURL + `${this.actionUrl}/${endPoint}`, model, httpOptions);
  }

}