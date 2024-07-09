import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { CustomValidators } from '../core/helpers/customValidators';
import { AuthService } from '../core/services/shared/auth.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isPageLoaded = false;
  error!: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private renderer: Renderer2
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });

  }

  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['john@pixinvent.com', Validators.required],
  //     password: ['password@123', Validators.required],
  //     rememberMe: false
  //   });

    ngOnInit(): void {
      this.InitForms();
    }

    private InitForms():void{
      this.loginForm = this.formBuilder.group({
      ePUserName:['',Validators.required],
      password:['',Validators.required] 
    })

    // Remember Me
    if (localStorage.getItem('remember')) {
      this.renderer.removeClass(document.body, 'bg-full-screen-image');
      localStorage.removeItem('currentLayoutStyle');
      this.router.navigate(['/dashboard/sales']);
    } else if (localStorage.getItem('currentUser')) {
      // Force logout on login if not remember me
      // this.authService.doLogout();
      this.isPageLoaded = true;
    } else {
      this.isPageLoaded = true;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  public tryLogin() {
    this.submitted = true;

    // if (this.signupForm.invalid) return;

    this.authService
      .login(this.loginForm.value)
      .subscribe(() => {
          this.router.navigate(["portal"]);
          
        },
        (error: any) => {
          this.error = error ? error : '';
          ///this.router.navigate(["dashboard"]);
        });
  }

  /*tryLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const value = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    // this.authService.doLogin(value).then(
    //   res => {
    //     if (this.loginForm.controls['rememberMe'] && this.loginForm.controls['rememberMe'].value) {
    //       localStorage.setItem('remember', 'true');
    //     } else {
    //       localStorage.removeItem('remember');
    //     }
    //     this.setUserInStorage(res);
    //     localStorage.removeItem('currentLayoutStyle');
    //     let returnUrl = '/dashboard/sales';
    //     if (this.returnUrl) {
    //       returnUrl = this.returnUrl;
    //     }
    //     this.router.navigate([returnUrl]);
    //   },
    //   err => {
    //     this.submitted = false;
    //     this.alertService.error(err.message);
    //   }
    // );
  }*/
addCheckbox(event) {
  const toggle = document.getElementById('icheckbox');
  if (event.currentTarget.className === 'icheckbox_square-blue') {
     this.renderer.addClass(toggle, 'checked');
  } else if (event.currentTarget.className === 'icheckbox_square-blue checked') {
    this.renderer.removeClass(toggle, 'checked');
  }
}
  setUserInStorage(res) {
    if (res.user) {
      localStorage.setItem('currentUser', JSON.stringify(res.user));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(res));
    }
  }
}
