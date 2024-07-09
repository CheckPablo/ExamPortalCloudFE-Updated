import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Test} from '../../models/test';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService extends ApiService<Test>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
  public search = (payload: any) => {
    //const url = `search-tests?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&testType=${payload.testType ?? ''}`
    const url = `search-tests?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&testType=${payload.testType ?? ''}&fromDate=${payload.fromDate ?? ''}&endDate=${payload.endDate ?? ''}`
    return this.postUrl(url, payload)
  }
  public searchTestOTP = (payload: any) => {
    const url = `search-testsOTP?centerId=${payload.centerId ?? ''}&gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&testId=${payload.testId ?? ''}`

    return this.postUrl(url, payload)
  }

  public offlineTest = (payload: any) => {
    const url = `convert-offlinestring`
    return this.postUrl(url, payload)
  }
  public linkInvigilator = (userId: number, studentIds: number[]): Observable<any> => {
    const payload = { userId, studentIds }

    return this.postEndpoint('link-students', payload);
  }
  public createNewOTP = (code: number, testId:number,centerId:number, gradeId:number, subjectId:number): Observable<any> => {

   const payload = { code, testId,centerId,gradeId,subjectId}
   return this.postEndpoint('create-newOTP', payload);
   }

   public sendOTP =(selectedTestId: number): Observable<any> =>  {
    return this.postUrl(`${selectedTestId}/send-otp-toStudents`,selectedTestId)
  }

  public sendLoginCredentials = (studentIds: number[]): Observable<any> => {
    return this.postUrl('send-login-credentials', studentIds)
  }
   public getByTestId = (testId: number): Observable<Test[]> => {
    return this.getUrl(`get-by-testId/${testId}`);
  }

  public getOTPTest = (gradeId: number, subjectId: number): Observable<Test[]> => {
    return this.getUrl(`getTestBySubject/${gradeId}/${subjectId}`);
  }

}
