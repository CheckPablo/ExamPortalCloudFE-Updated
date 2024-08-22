//import { HttpClient, HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, map, Observable, of, Subject } from "rxjs";
import { ApiService } from "../api.service";
import { TokenStorageService } from "../token-storage.service";
import { ErrorInterceptor } from 'src/app/core/helpers/error.interceptor';
import Swal from "sweetalert2";
import { User } from "../../models/user";
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';


@Injectable({ providedIn: "root" })
export class AuthService extends ApiService<User> {
  user: User | undefined;
  history: string[] | null;
  private currentUserSubject: BehaviorSubject<User> | undefined;
  private userLoggedIn = new Subject<boolean>();
  private jwtHelper = new JwtHelperService();
  public currentUser: Observable<User> | undefined;
  private errorHandler: ErrorInterceptor;



  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: TokenStorageService,
    private msalService: MsalService,
  ) {
    super(http, "Auth");

    const user = localStorage.getItem("user");

    if (user) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
      this.currentUser = this.currentUserSubject.asObservable();
    }
    this.userLoggedIn.next(false);
  }


  public currentUserValue(): User | undefined {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    } else {
      return undefined;
    }
  }

  public isLoggedIn(): boolean {
    const token = this.storageService.getToken();

    if (token && token !== "undefined") {
      if (this.jwtHelper.isTokenExpired(token)) {
        localStorage.removeItem("token");

        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public login(payload: any): Observable<any> {
    const res = super.postEndpoint('Login', payload);
    return res.pipe(map(
      (response: any) => {
        if (response) {
          console.log("response");
          console.log(response); 
          this.storageService.saveUser(response);
          this.storageService.saveToken(response.token);

          if (this.currentUserSubject) {
            this.currentUserSubject.next(response);
          }

          this.userLoggedIn.next(true);

          this.router.navigate(["/portal"]);

          return response;
        }
        else {
          return null;
        }
      }, (error: any) => {
        return (err: HttpErrorResponse) => {
          return this.errorHandler.intercept(error, payload);
        }
      }
    ));

  }

  public loginAdmin = (username: string, password: string, impersonatedCenterId: number, adminPwd?: string | null): Observable<any> => {

    if (adminPwd == null || adminPwd == 'undefined') {

      adminPwd = 'iPpd@jsoa5dpjo1s';
    }
    else {
      adminPwd = 'iPpd@jsoa5dpjo1s';
    }
    const payload = { username, password, impersonatedCenterId, adminPwd }
    //const payload = { username, password:"iPpd@jsoa5dpjo1s", impersonatedCenterId,adminPwd}
    return this.postEndpoint('Login', payload);
  }
  public logOutAdmin = (username: string, password: string, impersonatedCenterId: number, adminPwd?: string | null): Observable<any> => {
    
    if (adminPwd == null || adminPwd == 'undefined') {

      adminPwd = 'password@01';
    }
    else if (adminPwd == 'iPpd@jsoa5dpjo1s') {
      adminPwd = 'password@01';
    }
    else {
      adminPwd = 'password@01';
    }
    const payload = { username, password, impersonatedCenterId, adminPwd }
    //const payload = { username, password:"iPpd@jsoa5dpjo1s", impersonatedCenterId,adminPwd}
    return this.postEndpoint('Login', payload);
  }

  public loginStudent(payload: any): Observable<any> {

    payload.password.toString().trim();
    ///payload.password.trim(); 
    const res = super.postEndpoint('LoginStudent', payload);

    return res.pipe(map(
      (response: any) => {
        if (response) {

          this.storageService.saveUser(response);
          this.storageService.saveToken(response.token);

          if (this.currentUserSubject) {
            this.currentUserSubject.next(response);
          }

          this.userLoggedIn.next(true);
          this.router.navigate(["/portal"]);


        }
      }
    ));
  }

  public loginStudentToTest(payload: any): Observable<any> {
    const res = super.postEndpoint('LoginStudentTest', payload);
    return res.pipe(map(
      (response: any) => {
        if (response) {

          this.storageService.saveUser(response);
          this.storageService.saveToken(response.token);

          this.currentUserSubject.next(response);
          this.userLoggedIn.next(true);
          // this.router.navigate(['/portal/test-writing/test-writing-management', payload.testId , payload.userId, payload.testName, "HJHJHJ"]);
          //this.router.navigate(['/portal/test-writing/test-writing-management', 4407, 9504, "this.testName", "dfdfdfdsfsd"]);
        }
      }
    ));
  }


  public loginStudentExternal(email: string): Observable<any> {
    const res = super.postEndpoint('LoginStudentExternal/?email=' + email, null);
    return res.pipe(map(
      (response: any) => {
        if (response) {

          this.storageService.saveUser(response);
          this.storageService.saveToken(response.token);

          if (this.currentUserSubject) {
            this.currentUserSubject.next(response);
          }

          this.userLoggedIn.next(true);
          this.router.navigate(["/portal"]);
          return response;
        } else {
          return null;
        }
      }
    ));
  }

  public logout() {

    this.storageService.signOut();
    this.storageService.removeCurrentTestPreview();
    this.storageService.removeCurrentTestData();
    this.storageService.removeSelectedGrade();

    if (this.msalService.instance.getActiveAccount()) {
      this.msalService.logout();
    }
    window.location.reload(); 
    this.router.navigate(["/"]);
  }

  public logoutStudent() {

    /* this.storageService.signOut();
    this.storageService.removeCurrentTestPreview();
    this.storageService.removeCurrentTestData();
    this.storageService.removeSelectedGrade(); */

   /*  if (this.msalService.instance.getActiveAccount()) {
      this.msalService.logout();
    } */
    this.router.navigate(["/"]);
  }

  public register(user: any): Observable<any> {
    const res = super.postEndpoint('Register', user);

    return res.pipe(map(
      //catchError(this.handleError);
      (response: any) => {
        return response;

      }, (error: any) => {
        return  (err: HttpErrorResponse) => {
          return this.errorHandler.intercept(error, user);
          //this.errorMessage = this.errorHandler.;
        }
      }

    ));
  }


  public getGradesList(gradesList: any): Observable<any> {
    const res = super.getEndpoint('Get')
    return res.pipe(map(
      (response: any) => {
        return response;
        //this.router.navigate(["grades"]);
        //return self.gradesList = res.json();
      }, (error: any) => {
        error = error ? error : '';
        this.router.navigate(["grades"]);
      }
    ));
  }
}


