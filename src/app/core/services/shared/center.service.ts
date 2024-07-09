import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Center } from '../../models/center';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CenterService extends ApiService<Center>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Centers");
  }

  public getUserCenter = (centerId?: number): Observable<Center[]> => {
    let url = `get-user-center`

    if (centerId) url = `${url}/${centerId}`

    return this.getUrl(url);
  }

  public getCenterByUserId = (username?: string): Observable<Center[]> => {
    let url = `get-user-centerbyid`

    //if (centerId) url = `${url}/${centerId}`
    url = `${url}/${username}`


    return this.getUrl(url);
  }

  public search = (payload: any):Observable<Center[]> => {
    //const {centerId,gradeId,subjectId,testId} =  payload;
    //payload = {centerId:2,sectorId:318,subjectId:2393,testId:4064,startDate:'2023-07-20', endExamDate:'2023-07-22'}
    const url = `centerSummary`      
    return this.postUrl(url, payload);
  }

}
