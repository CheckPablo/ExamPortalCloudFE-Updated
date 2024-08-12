import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/shared/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss',]
})

export class IndexComponent {
  browserName: string;
  browserVersion: string;
  currentUrl: string = '';
  testId: number;
  testName: string;
  studentId: number;

  //router: any;

  constructor(
    private router: Router,private route: ActivatedRoute,
    private authService: AuthService
    ) {
  }
 ngOnInit()
 {
  let userAgentString = navigator.userAgent;
  
  
  if (userAgentString.indexOf('SEB') > -1) {
    const decodedUrl = decodeURIComponent(this.router.url);
    
    //const sebURL = this.router.url.split('?')[0];
    //const testName = Number(decodedUrl.split('/')[4]);
    const studentUserId = decodedUrl.split('/')[5];
    const secureTestId = Number(decodedUrl.split('/')[6]);
    const [header, payload] = decodedUrl;
    const testName = decodedUrl.split('/')[8];
    this.testName = testName;  
    const SecureTestpayload = {
      //uniqueExamNo: payload
      uniqueExamNo:  studentUserId
    }
  
    this.testId = secureTestId;
    this.testName = testName; 
    this.studentId = Number(studentUserId)
    //alert(studentUserId+'  '+ this.testId+' '+ this.testName); 
    
    this.loginStudentToSecureBrowser(SecureTestpayload);
  }
  else{
    
    
  }
  /* const decodedUrl = decodeURIComponent(this.router.url);
  this.route.url.subscribe((segments) => {
    // Construct the current URL from the segments
    this.currentUrl = segments.map((segment) => segment.path).join('/');
     
  }); */

  
   
  this.browserName = this.detectBrowserName();
  this.browserVersion = this.detectBrowserVersion();
 /*if(this.browserName.indexOf('safe') > -1)
  {
    
  } */
   
 }
   detectBrowserName() { 
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  detectBrowserVersion(){
    var userAgent = navigator.userAgent, tem, 
    matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    if(/trident/i.test(matchTest[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        return 'IE '+(tem[1] || '');
    }
    if(matchTest[1]=== 'Chrome'){
        tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
}
  redirectToLogin(){
    
    
    this.router.navigate(["/invigilator-login"]);
  }

  redirectToStudentLogin(){
    //window.location.reload(); 
    this.router.navigate(["/student-login"]);
  }
  
  redirectToRegister(){
    this.router.navigate(["/register"]);
  }

  public loginStudentToSecureBrowser(SecureTestpayload: any) {
    
     //localStorage.clear(); 
     this.authService.loginStudentToTest(SecureTestpayload).subscribe((response) => {
     //alert("Index");
     this.router.navigate(['/portal/test-writing/test-writing-management', SecureTestpayload.testId, SecureTestpayload.userId, SecureTestpayload.testName, "HJHJHJ"]);
 
     },
       async (error) => {
         
         
       });
   }

}
