import { Injectable, ValueSansProvider } from '@angular/core';
import { User } from '../models/user';
import { StudentTestWriteInformation } from '../models/StudentTestWriteInformation';
import { StudentTestAnswer } from '../models/studentTestAnswer';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

const ADMIN_TOKEN_KEY = 'admintoken';
const ADMIN_USER_KEY = 'adminuser';
const CURRENT_SELECTEDGRADE_KEY = 'currentgrade';
const CURRENT_SELECTEDSUBJECT_KEY = 'currentsubject';
const CURRENT_TESTPREVIEW_KEY = 'currenttestpreviewkey';
const CURRENT_TESTDATA_KEY = 'currenttestdatakey';
const  CONNECTION_STATUS_KEY = 'connectionstatuskey';
const CURRENT_STUDENTDATA_KEY = 'studenttestdatakey'; 
const CURRENT_STUDENTIRREG_KEY = 'studentirregkey';
const CURRENT_STUDENTANSWERDOC_KEY = 'currentstudentanswerdockey'
const CURRENT_TRACKINGTEXT_KEY = 'currenttrackingtextkey'
const CURRENT_PAGENUMBER_INFOCUS_KEY = 'current_pagenumber_infocuskey'
const CURRENT_TESTSECURITYLEVELID_KEY = 'curent_testsecurity_levelId'

const CURRENT_REGNAME_KEY = 'curent_regname_key'
const CURRENT_REGSURNAME_KEY = 'curent_regsurname_key'
const CURRENT_REGUSERNAME_KEY = 'curent_regusername_key'
const CURRENT_REGEMAIL_KEY = 'curent_regemail_key'




@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  
 public saveStudentAnswerDocLocal(base64DataLocal: string) {
  //CURRENT_STUDENTANSWERDOC_KEY = testId +""+ studentId; 
  window.localStorage.setItem(CURRENT_STUDENTANSWERDOC_KEY, JSON.stringify(base64DataLocal));
  }

  public saveFocusedPageNumber(pageNumberInFocus: string):void{
    window.localStorage.setItem(CURRENT_PAGENUMBER_INFOCUS_KEY, JSON.stringify(pageNumberInFocus));
    return null;
  }
  
  public saveTrackingText(documentText: string) {
    window.localStorage.setItem(CURRENT_TRACKINGTEXT_KEY, JSON.stringify(documentText));
  }
 
  /*  public saveStudentAnswerDoc(exportedDocument: Blob) {
    window.localStorage.setItem(CURRENT_STUDENTANSWERDOC_KEY, JSON.stringify(exportedDocument));
    //window.localStorage.setItem(CURRENT_STUDENTANSWERDOC_KEY, JSON.stringify(exportedDocument));
  } 
   */
 
  constructor() { }

  signOut(): void {
    
    
    window.localStorage.clear();
  }

  public getToken(): string | null {
    return window.localStorage.getItem('token');
  }

  public getUser(): User | null {
    const user = window.localStorage.getItem(USER_KEY);

    if (user) return JSON.parse(user);

    return null;
  }

  public saveCurrentTestPreview(quesionPaper: string): void {
    window.localStorage.setItem(CURRENT_TESTPREVIEW_KEY, JSON.stringify(quesionPaper));
    return null;
  }

  public saveTestData(test: any) :void{
    window.localStorage.setItem(CURRENT_TESTDATA_KEY, JSON.stringify(test));
    return null; 
  }

  public getSelectedGrade(): string | null {
    return  window.localStorage.getItem(CURRENT_SELECTEDGRADE_KEY);
  }

  public saveToken(token: string): void {
    
    
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

 /* public saveCurrentTestPreview(url?: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }*/

   public saveAdminUser(user: any): void {
    //window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    window.localStorage.setItem(ADMIN_TOKEN_KEY, JSON.stringify(user.token));
  }

  public saveSelectedGrade(selectedGrade: string): void {
    window.localStorage.setItem(CURRENT_SELECTEDGRADE_KEY, JSON.stringify(selectedGrade));
    return null;
  }

  
  public saveSelectedTestSecurityLevel(selectedTestSecurityId: string): void {
    window.localStorage.setItem(CURRENT_TESTSECURITYLEVELID_KEY, JSON.stringify(selectedTestSecurityId));
    return null;
  }

/*   public saveStudentAnswerDocLocal(selectedGrade: string): void {
    window.localStorage.setItem(CURRENT_SELECTEDGRADE_KEY, JSON.stringify(selectedGrade));
    return null;
  } */
  
  public saveSelectedSubject(selectedSubject: string): void {
    window.localStorage.setItem(CURRENT_SELECTEDSUBJECT_KEY, JSON.stringify(selectedSubject));
    return null;
  }
  
  public saveConnectionStatus(status: string): void {
    window.localStorage.setItem(CONNECTION_STATUS_KEY, JSON.stringify(status));
    return null;
  }
  public saveStudentData(studentTestData: StudentTestWriteInformation): void {
    window.localStorage.setItem(CURRENT_STUDENTDATA_KEY, JSON.stringify(studentTestData));
    return null;
  }
  public saveStudentIrregularities(studentIrregularities: StudentTestAnswer): void {
    window.localStorage.setItem(CURRENT_STUDENTIRREG_KEY, JSON.stringify(studentIrregularities));
    return null;
  }
  
  public removeSelectedGrade(): void {
    window.localStorage.removeItem(CURRENT_SELECTEDGRADE_KEY);
    return null;
  }
  public removeSelectedTestSecurityId(): void {
    window.localStorage.removeItem(CURRENT_TESTSECURITYLEVELID_KEY);
    return null;
  }
  public removePageNumberInFocus(): void {
    window.localStorage.removeItem(CURRENT_PAGENUMBER_INFOCUS_KEY);
    return null;
  }


  public removeCurrentTestPreview(): void {
    window.localStorage.removeItem(CURRENT_TESTPREVIEW_KEY);
    return null;
  }

  public removeCurrentTestData(): void {
    window.localStorage.removeItem(CURRENT_TESTDATA_KEY);
    return null;
  }

  public removeSelectedSubject(): void {
    window.localStorage.removeItem(CURRENT_SELECTEDSUBJECT_KEY);
    return null;
  }
  // registration local storage for resubmitting if there are errors on page
  // these are removed onDestroy of the registration page 

  public setRegName(): void{

  }

  public setSurname(): void{
    
  }

  public setRegUserName(): void{
    
  }

  public setRegEmail(): void{
    
  }

  public setRegContactNo(): void{
    
  }

  public setRegCenter(): void{
    
  }

  public setRegCenterType(): void{
    
  }

}
