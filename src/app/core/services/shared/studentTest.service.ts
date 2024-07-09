import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { StudentTest} from '../../models/studentTest';
import { Observable } from 'rxjs';
import { RandomOtp } from '../../models/randomOtp';
import { Resulting } from '../../models/resulting';
import { saveAs } from "file-saver";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentsTestService extends ApiService<StudentTest>{
 
  
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
   public searchStudentTestList(studentId: number):Observable<StudentTest[]>{
    return this.getUrl(`studenttestlist/${studentId}`);
   }

  //  public validateTestOTP(testId: number, centerId:number, otp: string ):Observable<StudentTest[]>{
  //   return this.getUrl(`validateTestOTP/${testId}/${centerId}, ${otp}`);
  //  }
  
   public validateTestOTP(testId: number, centerId:number, otp:number):Observable<RandomOtp[]>{
    
    //otp='61271';
    return this.getUrl(`validateTestOTP/${testId}/${centerId}/${otp}`);
   }

   public setStudenTestStartDate(testId: number,studentId:number):Observable<StudentTest[]>{
    return this.getUrl(`setTestStartDate/${testId}/${studentId}`);
   }

   public acceptDisclaimer(testId: number,studentId:number, isDisclaimerAccepted:boolean):Observable<StudentTest[]>{
    return this.getUrl(`accept-disclaimer/${testId}/${studentId}/${isDisclaimerAccepted}`);
   }
  
    public getStudentAnswerList = (payload: any): Observable<Resulting[]> => {
     
    const url = `search-students-answers?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&testId=${payload.testId ?? ''}&regionId=${payload.regionId ?? ''}`
    return this.getUrl(url)
  }

/*   public downloadStudentAnswer = (testId: number, studentId:number): Observable<any[]> => {
     
    //const url = `get-converted-answerdoc/${4356}/${9476}`
     
     
    //const url = `get-converted-answerdoc/${testId}/${studentId}`
    const url = `get-converted-answerdoc/${testId}/${studentId}`
    return this.getUrl(url).subscribe(data => saveAs(data, 'Example.docx'));
  } */
/*   downloadFile =(testId: number, studentId:number) :Observable<Blob[]> =>{
    const url = `get-converted-answerdoc/${testId}/${studentId}`
    //return this.getUrl(url, { responseType: 'blob' });
    return this.getUrl(url);
   // window.location.href = `${environment.sebLaunchUrlSandboxWithS}api/InTestWrite/get-student-sebsettings/${this.uniqueName}/${this.testId}/${this.user.id}/${this.testName}/${environment.domain}`;
  } */

  downloadFile =(testId: number, studentId:number):Observable<Blob>  =>{
    const url = `get-converted-answerdoc/${testId}/${studentId}`
    //return this.getUrl(url, { responseType: 'blob' });
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    //return this.getUrl(url, httpOptions);
    return this.getUrl(url); 

  }

  public downloadStudentAnswer = (testId: number, studentId:number): Observable<any[]> => {
     
    //const url = `get-converted-answerdoc/${4356}/${9476}`
     
     
    const url = `get-converted-answerdoc/${testId}/${studentId}`
    return this.getUrl(url)
  }

  downloadFile2 =(testId: number, studentId:number):Observable<Blob>  =>{
    return this.http.get(`http://localhost:7066/api/Tests/get-converted-answerdoc/${testId}/${studentId}`,{
    //return this.http.get(`${this.url}/download?fileUrl=${fileUrl}`, {
        reportProgress: true,
        responseType: 'blob',
    });
}
 
  public downloadFileToclient = (filePath: string, fileName:string):Observable<any[]> =>{
    fileName = "TestName";
    //const url = `download-client-doc/${filePath}/${fileName}`
    //return this.getUrl(url)
    const payload = { filePath, fileName }
    payload.filePath = filePath; 
    payload.fileName = fileName; 
    
  return this.postUrl('download-client-doc',payload)
  }
  /*public downloadStudentAnswerBulk = (testId: number, studentIds:number[]): Observable<any[]> => {
     
    const url = `get-converted-answerdocbulk/${testId}/${studentIds}`
    return this.getUrl(url)
  }*/
  public downloadStudentAnswerBulk = (testId: number, studentIds:number[]): Observable<any[]> => {
     
     
    const payload = { testId, studentIds }
    payload.testId = testId; 
    payload.studentIds = studentIds; 
    
    return this.postUrl('get-answerdocbulksave', payload)
  }

 /* public sendLoginCredentials = (studentIds: number[]): Observable<any> => {
    return this.postUrl('send-login-credentials', studentIds)
  }*/
}
