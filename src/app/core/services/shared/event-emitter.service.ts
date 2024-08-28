import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription'; 
import { DocumentEditorAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor'; 
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';   
    
@Injectable({    
  providedIn: 'root'    
})    
export class EventEmitterService {
 
  //public onChange: EventEmitter<MyServiceEvent> = new EventEmitter<MyServiceEvent>()
  invokeFirstComponentFunction = new EventEmitter();  
  invokeSetStudentUserNameFunction = new EventEmitter(); 
  invokeValidateScannedImagesOTP = new EventEmitter();     
  invokeOnReadAnswerTTSButtonClick = new EventEmitter();  
  invokeOnReadAnswerChangeTTSBtnText = new EventEmitter();  
  invokeOnReadAnswerChangeSelectedVoice = new EventEmitter();
  invokeOnSetAnswerSpeechRate = new EventEmitter();
  invokeOnSetAnswerPitchValue = new EventEmitter();
  invokeOnChangeAnswerButtonText = new EventEmitter(); 
  invokeOnSetWordText = new EventEmitter(); 
  invokeSetTestSecurityLevel = new EventEmitter(); 
  invokeSetStudentsFullName = new EventEmitter(); 
  invokeSetTestName  = new EventEmitter(); 

 public invokeInvigilatorInTestMessage = new EventEmitter(); 

  subsVar: Subscription; 
  offlineInTestDownloadVar:Subscription;
  testVar:Subscription; 
  studentFullname:Subscription;    
  answerEvent:Subscription;
  changePlayBtnOnAnsRead: Subscription;
  selectedVoiceAnsTxt: Subscription;
  selectedRate: Subscription;
  selectedPitch: Subscription;
  answerTextButton: Subscription;
  invigilatorTextMsg: Subscription;
  wordCount:Subscription; 
  //securityTestLevel: Subscription;
 
  //subsScannedOTPVar: Subscription;   
  constructor() { }    
    
  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
  }    

  onSetStudentUserName(studentUserName:string) {    
    this.invokeSetStudentUserNameFunction.emit(studentUserName);    
  }  

  onSetStudentsHeaderDetailsName(studentsFullName: string,testName:string) {
    this.invokeSetStudentsFullName.emit(studentsFullName); 
    this.invokeSetStudentsFullName.emit(testName)
  }
  onSetStudentsHeaderDetailsTestName(testName:string) {
    this.invokeSetTestName.emit(testName)
  }

  onValidateScannedImagesOTP(data:string[]) {    
    this.invokeValidateScannedImagesOTP.emit(data);    
  }    
  onReadAnswerTTSButtonClick(readAnswerButtonText:string) {
    this.invokeOnReadAnswerTTSButtonClick.emit(readAnswerButtonText)
    
  }    
  onReadAnswerChangeTTSBtnsText(playButtonChangeText: string , pauseButtonChangeText : string) {
    this.invokeOnReadAnswerChangeTTSBtnText.emit(playButtonChangeText)
  }
  onGetReadAnswerSelectedVoice(selectedVoiceAnsTxt: SpeechSynthesisVoice) {
    this.invokeOnReadAnswerChangeSelectedVoice.emit(selectedVoiceAnsTxt)
  }
  onSetAnswerSpeechRate(selectedRate:number){
    this.invokeOnSetAnswerSpeechRate.emit(selectedRate)
  }
  onSetAnswerPitchValue(selectedPitch:number){
    this.invokeOnSetAnswerPitchValue.emit(selectedPitch)
  }  
  onSetAnswerButtonText(answerButtonText:string){
    this.invokeOnChangeAnswerButtonText.emit(answerButtonText)
  }

  onSetWordCount(wordCount:number){
    this.invokeOnSetWordText.emit(wordCount)
  }

  onSetInvigilatorInTestMessage(invigilatorTextMsg:string){
    //alert("check here"); 
    this.invokeInvigilatorInTestMessage.emit(invigilatorTextMsg)
  }

 /*  onSetAnswerButtonText(answerButtonText:string){
    this.invokeOnChangeAnswerButtonText.emit(answerButtonText)
  } */
 /*  onSetTestSecurityLevel(testSecurityLevel:number) {
     
    this.invokeSetTestSecurityLevel.emit(testSecurityLevel)
  }
  
  onSecondComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit(); 
  } */
} 