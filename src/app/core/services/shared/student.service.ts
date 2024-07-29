import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';
import { RandomOtp } from '../../models/randomOtp';


@Injectable({
  providedIn: 'root'
})
export class StudentService extends ApiService<Student>{
  constructor(
    private http: HttpClient) {
    super(http, "Students");
  }

  public createLoginCredentials = (studentIds: number[]): Observable<any> => {
    return this.postUrl('create-login-credentials', studentIds)
  }

  public getInvigilatorLinks = (userId: number, gradeId:number,subjectId?:number): Observable<any[]> => {
    return this.getUrl(`get-by-invigilator/${userId}/${gradeId}/${(subjectId == null)?'':subjectId}`)
  }

  public getSelectedCenterGrade = (payload: any) => {
    const url = `get-by-centerGrade?centerId=&gradeId=${payload.gradeId}&userId=${payload.userId}`
    return this.postUrl(url, payload)
  }

  public linkSubjects = (subjects: Subject[], studentId?: string) => {
    const ids = subjects.map((s) => s.id);
    console.log(ids);
    console.log(studentId); 
    return this.postUrl(`${studentId}/link-to-subjects`, ids)
  }

  public delinkSubjects = (subjects: Subject[], studentId?: string) => {
    const ids = subjects.map((s) => s.id);
    return this.postUrl(`${studentId}/delink-from-subjects`, ids)
  }

  public search = (payload: any) => {
    const url = `search-students?gradeId=${payload.gradeId ?? ''}&subjectId=${payload.subjectId ?? ''}&name=${payload.name ?? ''}`

    return this.postUrl(url, payload)
  }

  public sendLoginCredentials = (studentIds: number[]): Observable<any> => {
    return this.postUrl('send-login-credentials', studentIds)
  }
  
  public sendEmail = (mailData: any): Observable<any> => {
    console.log(mailData); 
    return this.postUrl('send-student-email', mailData)
  }

}
