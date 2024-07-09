import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Subject} from '../../models/subject';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService<Subject>{
  constructor(
    private http: HttpClient) {
    super(http, "Subjects");
  }

  public getByGradeId = (gradeId: number): Observable<Subject[]> => {
    return this.getUrl(`get-by-grade/${gradeId}`);
  }

  public updateSubject(subject: Subject): Observable<any> {
    //return this.postUrl(`${isLinkToAll}/subject-update`, subject)
    return this.postUrl('subject-update', subject);
  }

  public UpdateSubjectLinkToAllStudents = (id:number, payload: any):Observable<Subject[]> => {
    //const {centerId,gradeId,subjectId,testId} =  payload;
    //payload = {centerId:2,sectorId:318,subjectId:2393,testId:4064,startDate:'2023-07-20', endExamDate:'2023-07-22'}
    const url = `link-subjectupdate-allstudents`      
    return this.postUrl(url, payload);
  }

  public LinkSubjectToAllStudents = (payload: any):Observable<Subject[]> => {
    //const {centerId,gradeId,subjectId,testId} =  payload;
    //payload = {centerId:2,sectorId:318,subjectId:2393,testId:4064,startDate:'2023-07-20', endExamDate:'2023-07-22'}
    const url = `link-subject-allstudents`      
    return this.postUrl(url, payload);
  }
}
