import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/core/helpers/customValidators';
import { Center } from 'src/app/core/models/center';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { CenterService } from 'src/app/core/services/shared/center.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  centers: Center[] = [];
  signupForm!: UntypedFormGroup;
  fieldTextType2!: boolean;
  fieldTextType!: boolean;
  submitted = false;
  error!: any;
  title: string;
  message: string;
  showModal: boolean;

  constructor (
    private authService: AuthService,
    private centerService: CenterService, 
    private router: Router,  
    private formBuilder: UntypedFormBuilder,
    //private errorHandler: ErrorInterceptor,
  
  ) { }

  ngOnInit(): void {
    this.getCenters();
    this.initForms();
  }

  get f() { return this.signupForm.controls; }


  private getCenters()
  {
    this.centerService.get()
    .subscribe((res) => {
      
      this.centers = res; 
      //this.paginationService.setData(res);     
    });
  }
  get passwordMatchError() {
    return (
      this.signupForm.getError("mismatch") &&
      this.signupForm.get("confirmPassword")?.touched
    );
  }

  private initForms(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        contactDetails: ['', Validators.required],
        noOfCandidates : ['', Validators.required], 
        centerId : ['', Validators.required], 
        centerTypeId :['',Validators.required],
        password:['',Validators.required,Validators.minLength(8)],
        //password:['',Validators.required,
        /*Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),*/
       // Validators.minLength(8),],
       /* password: ['', [Validators.required,    Validators.minLength(8),
          PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
            requiresDigit: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
            requiresUppercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
            requiresLowercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
            requiresSpecialChars: true
          }) ]],*/
        confirmPassword: ['', [Validators.required]],
        cbxAgree: [false, [Validators.required]],
        //1234!@#$n
      },
      [CustomValidators.MatchValidator("password", "password2")]
    );
  }
  /*password: new FormControl(
    null,
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
        requiresDigit: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
        requiresUppercase: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
        requiresLowercase: true
      }),
      PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
        requiresSpecialChars: true
      })
    ])
  ),*/
  redirectLogin() {
    this.router.navigate(["/invigilator-login"]);
    }

  public onSubmit() {

    console.log(this.signupForm.value);
    console.log(this.signupForm); 
    console.log(this.signupForm.getError); 
    console.log(this.signupForm.status);

    this.submitted = true;
   /*  if(this.f.confirmPassword != this.f.password){
      return
      //alert("Password and confirm passsword not matching"); 
    }; 
    if(this.f.password.errors.Validators.minLength(8)){
      return
      //alert("Password and confirm passsword not matching"); 
    };  */
    console.log(this.signupForm);

    if (this.signupForm.invalid) return;

    this.authService
      .register(this.signupForm.value).subscribe({
        next: (value: any) => {
          Swal.fire('User Saved', 'You have successfully captured the user. You may capture a new User.', 'success');
          this.router.navigate(["/"]);
          this.signupForm.reset();
         },
        error: (error) => { 
        console.log(error); 
        this.title = "Registration Unsuccesful";
        this.message = 'Please check your form, correct and resubmit';
        this.showModal = true;
        return; 
        },
        complete: () => { }
      });
     /*  .subscribe(() => {
        Swal.fire('User Saved', 'You have successfully captured the user. You may capture a new User.', 'success');
        this.router.navigate(["/"]);
        this.signupForm.reset(); 
        
      }); */
  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
}
