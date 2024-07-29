import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../services/shared/auth.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    spinner: any;
    constructor(
        private authService: AuthService,
        //private gradeService: GradesService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {

        return next.handle(request).pipe(catchError(err => {

            const errorHandlers = {
                expiredLicense: "Your License has expired",
                notApproved: "Your account has not yet been approved",
                invalidOTP: "Invalid OTP",
                expiredOTP: "Expired OTP",
                userNameFailure: "The user name provided does not exist", 
                gradeEntryFailure: "The specified grade code and description already exists",
                //logiFailure: "credentials"
                logiFailure: "The user name or password provided is incorrect.", 
                registrationFailure: "The password and confirmation password do not match.",
                studentEntryFailure: "The specified student number already exists",
                subjectEntryFailure: "The specified subject code and subject name already exists"

            }
            const errors = {
                expiredLicense: {
                    title: 'Account Expired',
                    message: [
                        'Dear Exam Portal Cloud User',
                        'Unfortunately, your Exam Portal Cloud license has expired. Please contact the support desk from V-Soft Technologies at the following email address: support@v-soft.co.za',
                        'Thank you for your support.'
                    ]
                },
                logiFailure: {
                    title: 'Login was unsuccessful',
                    message: [
                        'The user name or password provided is incorrect.'
                    ]
                },
                notApproved: {
                    title: 'Account Not Approved',
                    message: [
                        ' Please note your account is still awaiting approval, this approval should come through in the next 24hrs.',
                        'Thank you for your patience']
                },
                userNameFailure: {
                    title: 'Login was unsuccessful',
                    message: [
                        'The user name provided does not exist.'
                    ]
                }, 
                gradeEntryFailure: {
                    title: 'Add grade unsuccessful',
                    message: [
                        'The specified grade code and description already exists'
                    ]
                },
                registrationFailure: {
                    title: 'Registration Unsuccessful',
                    message: [
                        'Password and confirm password must match'
                    ]
                }, 
                studentEntryFailure:{
                    title: 'Add/Update Student Failed',
                    message:[
                    'The specified student number already exists'
                    ]
                },
                subjectEntryFailure:{ 
                title: 'Add/Update Subject Failed',
                message:[
                    'The specified subject code and subject name already exists'
                ]
            }, 
            invalidOTP: {
                title: 'Invalid OTP',
                message: [
                    'The OTP you entered is invalid'
                ]
            },
            expiredOTP: {
                title: 'Expired OTP',
                message: [
                    'The OTP you entered has expired'
                ]
            }

            };

            const serverError = 'An error occured at the server. Please contact the System Administrator.';
            let _error = {};
            console.log(err.error);
         

            switch (err.status) {
                case 400:
                    console.log(err.error);
                    if (err.error.includes(errorHandlers.registrationFailure)) {
                        _error = errors.registrationFailure;
                    }
                   // else if (err.error.includes("The specified student number already exists")) {
                        else if (err.error.includes(errorHandlers.studentEntryFailure)) {
                        _error = errors.studentEntryFailure;
                    }
                    else if (err.error.includes("The specified subject code and subject name already exists")) {
                        _error = errors.subjectEntryFailure;
                    }
                    //Swal.fire('Error', err.error, 'error')
                    break;
                case 401:
                    Swal.fire('Error', err.error, 'error')
                    break;
                case 404:
                    Swal.fire('Error', 'You may not have sufficient permissions to complete this action.', 'error');
                    break;
                case 500:
                    if (err.error.includes(errorHandlers.logiFailure)) {
                        _error = errors.logiFailure;
                    }
                    else if (err.error.includes(errorHandlers.expiredLicense)) {
                        _error = errors.expiredLicense;

                    }
                    else if (err.error.includes(errorHandlers.notApproved)) {
                        _error = errors.notApproved;
                    }
                    else if (err.error.includes(errorHandlers.userNameFailure)) {
                        _error = errors.userNameFailure;
                    }
                    else if (err.error.includes("The specified grade code and description already exists")) {
                        _error = errors.gradeEntryFailure;
                    }
                    else if (err.error.includes("The specified student number already exists")) {
                        _error = errors.studentEntryFailure;
                    }
                    else if (err.error.includes("The specified subject code and subject name already exists")) {
                        _error = errors.subjectEntryFailure;
                    }
                    else if (err.error.includes(errorHandlers.invalidOTP)) {
                        _error = errors.invalidOTP;
                    }
                    else if (err.error.includes(errorHandlers.expiredOTP)) {
                        _error = errors.expiredOTP;
                    }
                    else {
                        _error['message'] = [serverError]
                    }
                    _error['status'] = err.status
            }

            throw _error;
        }))
    }

    // handle(next,request)
    // .pipe(
    //     tap(
    //         (event instance of HttpResponse){

    //         }
    //     ),
    //     (error: HttpResponse)
    // )
}
