import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { StudentTest} from '../../models/studentTest';
import { StudentTestAnswer } from '../../models/studentTestAnswer';
import { Observable } from 'rxjs';
import { RandomOtp } from '../../models/randomOtp';
import { StudentTestWriteInformation } from '../../models/StudentTestWriteInformation';
import { VoiceInfo } from '../../models/voiceInfo';


@Injectable({
  providedIn: 'root'
})
export class InstalledVoiceService extends ApiService<VoiceInfo>{
 
  constructor(
    private http: HttpClient) {
    super(http, "InTestWrite");
  }
 
   public getAllInstalledVoices():Observable<SpeechSynthesisVoice[]>{
    const testId = 0; 
    return this.getUrl(`installedVoices`);
   }
 
   //public synthesizeSpeechWindowsOS =(selectedText: string, selectedVoice:SpeechSynthesisVoice):Observable<any> =>{
    public synthesizeSpeechWindowsOS =(selectedText: string, selectedVoice:string):Observable<any> =>{
    return this.postUrl('windowstts',{selectedText,selectedVoice});
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
}
