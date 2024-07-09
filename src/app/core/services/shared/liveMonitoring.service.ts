
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiveMonitoring } from '../../models/liveMonitoring';
import { Injectable } from '@angular/core';
import { AnswerProgressTracking } from '../../models/answerProgressTracking';
import { KeyPressTracking } from '../../models/keyPressTracking';

@Injectable({
  providedIn: 'root'
})

export class LiveMonitoringService extends ApiService<LiveMonitoring>{
 
  constructor(
    private http: HttpClient) {
    super(http, "LiveMonitoring");
  }
  public search = (payload: any):Observable<LiveMonitoring[]> => {
    
    //const {testId = 209, invigilatorId = 92, candidateSearchType =1, name = 'Nelissa', centerId = 22} = payload
    const {testId , candidateSearchType, name} = payload

    const url = `getLiveMonitoringCanidateList?`
              + `testId=${testId}`
              + `&candidateSearchType=${candidateSearchType}`
              + `&name=${name}`;
    return this.postUrl(url,null);
  }

  public getIrregularities = (studentId :number ,testId : number):Observable<KeyPressTracking[]> => {

    const url = `GetLiveMonitoringIrregularities?`
              + `testId=${testId}`
              + `&studentId=${studentId}`;
    return this.postUrl(url,null);
  }

  public getInvalidKeyPresses = (studentId :number ,testId : number):Observable<KeyPressTracking[]> => {

    const url = `GetInvalidKeyPresses?`
              + `testId=${testId}`
              + `&studentId=${studentId}`;
    return this.postUrl(url,null);
  }

  public getStudentAnswerProgress = (studentId :number ,testId : number):Observable<AnswerProgressTracking[]> => {

    const url = `GetLiveMonitoringStudentAnswerProgress?`
              + `testId=${testId}`
              + `&studentId=${studentId}`;
    return this.postUrl(url,null);
  }

}

