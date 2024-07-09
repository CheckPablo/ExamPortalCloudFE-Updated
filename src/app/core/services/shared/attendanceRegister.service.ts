import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Test} from '../../models/test';
import { Observable } from 'rxjs';
import { AttendanceRegister } from '../../models/attendanceRegister';


@Injectable({
  providedIn: 'root'
})
export class AttendanceRegisterService extends ApiService<AttendanceRegister>{
 
  constructor(
    private http: HttpClient) {
    super(http, "AttendanceRegister");
  }
  public search = (payload: any):Observable<AttendanceRegister[]> => {
     
     
    const {centerId,gradeId,subjectId,testId} =  payload;
    // const url = `attendanceRegister?centerId=2`
    //           + `&sectorId=318`
    //           + `&subjectId=2393`
    //           + `&testId=4064`;

    const url = `attendanceRegister?centerId=${centerId}`
              + `&sectorId=${gradeId}`
              + `&subjectId=${subjectId}`
              + `&testId=${testId}`;

    return this.postUrl(url, payload);
  }

  public setStudentAbsentism = (studentId: number, testId: number, absent: number):Observable<AttendanceRegister[]> => {

    const url = `setStudentAbsentism?studentId=${studentId}`
              + `&testId=${testId}
              + &absent=${absent}`;
      
    return this.updateUrl(url, null);
  }

  public resetTest = (studentId: number, testId: number):Observable<AttendanceRegister[]> => {

    const url = `resetTest?studentId=${studentId}`
              + `&testId=${testId}`;
    return this.updateUrl(url, null);
  }
}