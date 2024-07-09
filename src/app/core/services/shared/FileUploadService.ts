import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
private baseUrl = 'http://localhost:8080';
  core: any;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

/*   uploadFiles(formData: FormData, id: number) {
    new Promise((resolve) => {
      this.http.post(
        `/api/upload/uploadFiles/${userId}`,
        formData,
        { headers: this.core.getUploadOptions() }
      )
      .subscribe(
        () => {
          //this.snacker.sendSuccessMessage('Uploads successfully processed');
          resolve(true);
        },
        err => {
          
          //this.snacker.sendErrorMessage(err.error);
          resolve(false);
        }
      )
    });
    //throw new Error('Method not implemented.');
  } */
}
