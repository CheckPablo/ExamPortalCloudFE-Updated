import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/shared/auth.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-invigilator-login',
  templateUrl: './invigilator-login.component.html',
  styleUrls: ['./invigilator-login.component.scss']
})
export class InvigilatorLoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isPageLoaded = false;
  error!: any;
  renderer: any;
  isIframe = false;
  loginDisplay = false;
  notApproved: boolean;
  hasExpired: boolean;
  overlay: boolean;

  private readonly _destroying$ = new Subject<void>();
  content: string;
  title: string;
  show: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService

  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnInit(): void {
    this.InitForms();

  }

  get f() { return this.loginForm.controls; }

  private InitForms(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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

  public login() {
    this.submitted = true;

    const credentials = {
      username: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim()
    }
    try {
      this.authService
        .login(credentials)
        .subscribe((res) => {
          console.log(res)
        }, (error) => {
          console.log(error);
          this.title = error.title;
          this.content = `<p>${error.message.join('</p><p>')}</p>`;
          this.show = true;
        });
    }
    catch (error) {
      console.log(error)
    }
  }

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
