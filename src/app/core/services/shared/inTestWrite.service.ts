

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StudentTest} from '../../models/studentTest';
import { StudentTestAnswer } from '../../models/studentTestAnswer';
import { BehaviorSubject, Observable } from 'rxjs';
import { RandomOtp } from '../../models/randomOtp';
import { StudentTestWriteInformation } from '../../models/StudentTestWriteInformation';
import { VoiceInfo } from '../../models/voiceInfo';
import { KeyPressTracking } from '../../models/keyPressTracking';
import { ImageScan } from '../../models/ImageScan';
import { OperationResponse } from '../../models/OperationResponse';
import { Upload } from '../../models/upload';
import { environment } from 'src/environments/environment';
//import { CoreService } from   '@anglular'


@Injectable({
  providedIn: 'root'
})
export class InTestWriteService extends ApiService<StudentTestWriteInformation>{
  core: any;
  private uploads = new BehaviorSubject<Upload[]>(null);

  uploads$ = this.uploads.asObservable();
  //headers: HttpHeaders;
  constructor(
    private http: HttpClient, 
     /*private headers: HttpHeaders,
    private core: CoreService,*/) {
    super(http, "InTestWrite");
  }
 
   public getAllInstalledVoices():Observable<SpeechSynthesisVoice[]>{
    const testId = 0; 
    return this.getUrl(`installedVoices`);
   }

   public saveIrregularities(keyPressTracking:KeyPressTracking):Observable<KeyPressTracking[]>{
    
    return this.postUrl(`save-irregular-keypressevent`,keyPressTracking);
   }
 
   public verifyScannedOTP = (OTP:number,testId:number,studentId:number):Observable<any>=>{
    const payload = { OTP, testId,studentId }
    
    return this.postEndpoint('verify-scanned-imagesotp',payload);

   }
   
   public setQRCode = (payload: any) => {
    //const url = `scandocument?testId=${payload.testId ?? 0}&studentId=${payload.studentId ?? 0}`
    const url = `scandocument`
     
    return this.postUrl(url,payload);
   }

  public qrCodeScanResult =(imageScan: ImageScan): Observable<OperationResponse> =>{
    // return this.http.post<OperationResponse>(this.baseUrl, imageScan); 
   return this.http.post<OperationResponse>("", imageScan);
 }

 /*public qrCodeScanResultString =(imageScan: string): Observable<OperationResponse> =>{
  // return this.http.post<OperationResponse>(this.baseUrl, imageScan); 
 return this.http.post<OperationResponse>("", imageScan);
}*/
}
