import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { StudentTest} from '../../models/studentTest';
import { StudentTestAnswer } from '../../models/studentTestAnswer';
import { Observable } from 'rxjs';
import { RandomOtp } from '../../models/randomOtp';
import { StudentTestWriteInformation } from '../../models/StudentTestWriteInformation';


@Injectable({
  providedIn: 'root'
})
export class StudentTestWriteService extends ApiService<StudentTest>{
 
  constructor(
    private http: HttpClient) {
    super(http, "StudentTests");
  }
 
   public acceptDisclaimer(testId: number,studentId:number, isDisclaimerAccepted:boolean):Observable<StudentTest[]>{
    return this.getUrl(`accept-disclaimer/${testId}/${studentId}/${isDisclaimerAccepted}`);
   }

   public saveAnswersInterval(StudentTestAnswer: StudentTestAnswer):Observable<StudentTestWriteInformation[]>{
     return this.postUrl(`save-answers-interval`,StudentTestAnswer);
  }

  public getStudentTestDetails(testId: number, studentId:number):Observable<StudentTestWriteInformation[]>{
    const url = `get-students-testdetails?`+`testId=${testId}` + `&studentId=${studentId}`;
    return this.getUrl(url);
 }

   public search = (payload: any) => {
    const url = `save-answers-interval?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&name=${payload.name ?? ''}`
    return this.postUrl(url, payload)
  }

  public finishTest = (testId:number, studentId:number): Observable<any> => {
    const payload = {testId,studentId}
    return this.postUrl('finish-test', payload);
    }
}
