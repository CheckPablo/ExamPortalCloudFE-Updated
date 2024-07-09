import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Test} from '../../models/test';
import { Observable } from 'rxjs';
import { CenterAttendance } from '../../models/centerAttendance';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CenterAttendanceService extends ApiService<CenterAttendance>{
  //todaysDate: any;
  //datePipe: any;
 
  constructor(
    private http: HttpClient) {
    super(http, "CenterAttendance");
  }
  public search = (payload: any):Observable<CenterAttendance[]> => {
    //const {centerId,gradeId,subjectId,testId} =  payload;
    //payload = {centerId:2,sectorId:318,subjectId:2393,testId:4064,startDate:'2023-07-20', endExamDate:'2023-07-22'}
    const url = `centerAttendance`      
    return this.postUrl(url, payload);
  }
  /*public search = (payload: any) => {
    const url = `search-students?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&name=${payload.name ?? ''}`

    return this.postUrl(url, payload)
  }*/

  public overAllAttendance = (payload: any):Observable<CenterAttendance[]> => {
    //const {centerId,gradeId,subjectId,testId} =  payload;
    //this.todaysDate = this.datePipe.transform(this.todaysDate, 'MM/dd/yyyy HH:mm');
    //payload = {centerId:0,sectorId:0,subjectId:0,testId:0,endExamDate:''}
    payload = {centerId:0,sectorId:0,subjectId:0,testId:0,startDate:'', endExamDate:''}
    const url = `centerAttendance`      
    return this.postUrl(url, payload);
  }
 
}