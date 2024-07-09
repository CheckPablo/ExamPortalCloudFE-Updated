
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageScan } from '../../models/ImageScan';
import { OperationResponse } from '../../models/OperationResponse';
//import { environment } from '../environments/environment';
import { ApiService } from '../api.service';
import { Grade } from '../../models/grade';

@Injectable({
    providedIn: 'root'
  })
  
  export class ScanLogService extends ApiService<Grade>{

    constructor(
        private http: HttpClient) {
        super(http, "Grades");
    }
    //baseUrl: string = environment.apiUrl + 'log/appointment';
  

    public logAppointment =(imageScan: ImageScan): Observable<OperationResponse> =>{
       // return this.http.post<OperationResponse>(this.baseUrl, imageScan); 
      return this.http.post<OperationResponse>("", imageScan);
    }
  
  }