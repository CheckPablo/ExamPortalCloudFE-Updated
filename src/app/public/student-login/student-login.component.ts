import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/shared/auth.service';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, PublicClientApplication, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent {
  StudentloginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isPageLoaded = false;
  error!: any;
  renderer: any;
  isMicrosoftLogin:boolean = false; 

  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  title: any;
  content: string;
  show: boolean;

  constructor(
   @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private msalService: MsalService, 
    private msalBroadcastService: MsalBroadcastService
  ) {

  }

  ngOnInit(): void {
    this.InitForms();
   this.setLoginDisplay()
 

   this.msalBroadcastService.inProgress$
  .pipe( filter((status: InteractionStatus) => status === InteractionStatus.None), takeUntil(this._destroying$)
  )
  .subscribe(() => {
    this.setLoginDisplay();
    this.checkAndSetActiveAccount();
  })
   const msalInstance = new PublicClientApplication(environment.msalConfig);
   //this.initPublicClient(msalInstance); 
    this.msalService.initialize(); 
     this.msalService.instance.handleRedirectPromise().then(
       res =>{
         if(res != null && res.account != null){
         this.msalService.instance.setActiveAccount(res.account);
         }
      }
    ); 
  } 

  get f() { return this.StudentloginForm.controls; }

  private InitForms():void {
    this.StudentloginForm = this.formBuilder.group({
      studentExamNo:['',Validators.required],
      password:['',''] //defaulting to min length of six characters 
    })

    // Remember Me
    if (localStorage.getItem('remember')) {
      this.renderer.removeClass(document.body, 'bg-full-screen-image');
      localStorage.removeItem('currentLayoutStyle');
      this.router.navigate(['/dashboard/sales']);
    } else if (localStorage.getItem('currentUser')) {
      this.isPageLoaded = true;
    } else {
      this.isPageLoaded = true;
    }
  }

  public async loginStudent() {
    if(this.isMicrosoftLogin)return; 
    this.submitted = true;
    this.f.password.value.trim(); 
    this.authService
      .loginStudent(this.StudentloginForm.value)
      .subscribe((response) => {
        
      }
      , (error) => {
        this.title = error.title;
        this.content = `<p>${error.message.join('</p><p>')}</p>`;
        this.show = true;
      });
  }

  setUserInStorage(res) {
    if (res.user) {
      localStorage.setItem('currentUser', JSON.stringify(res.user));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(res));
    }
  }


   setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  } 

  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
  let activeAccount = this.msalService.instance.getActiveAccount();

    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      let accounts = this.msalService.instance.getAllAccounts();
      this.msalService.instance.setActiveAccount(accounts[0]);
    } 
  }

 async loginPopup() {
  this.isMicrosoftLogin = true; 
  const msalInstance = new PublicClientApplication(environment.msalConfig);
  await msalInstance.initialize();
    if (this.msalGuardConfig.authRequest){
      this.msalService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(response.account);
          this.authService
          .loginStudentExternal(response.account.username)
          .subscribe(() => {});
        });
      } else {

        this.msalService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.msalService.instance.setActiveAccount(response.account);
            this.authService
            .loginStudentExternal(response.account.username)
            .subscribe(() => {});
      });
    }
  } 

   loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.msalService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }
 
   isLoggedIn ():boolean{
    return this.msalService.instance.getActiveAccount() != null;
  } 

  logout(){
    //console.log("student login 163"); 
    this.msalService.logout();
  }  

}