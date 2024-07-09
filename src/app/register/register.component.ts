import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_api/user/user.service';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  user = {};
  users = [];
  defaultImage = '../assets/images/portrait/small/default.png';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.userService.getUsers().subscribe(users => {
      this.users = users.map(item => {
        return {
          ...item.payload.doc.data() as {},
          id: item.payload.doc['id']
        };
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  tryRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;


    // this.authService.doRegister(this.registerForm.value).then(
    //   res => {
    //     this.user = {
    //       name: this.registerForm.value.firstName,
    //       image: '../../../../assets/images/portrait/small/default.png',
    //       uid: res.user.uid
    //     };
    //     const currentUser = firebase.auth().currentUser;
    //     currentUser.updateProfile({
    //       photoURL: this.defaultImage,
    //       displayName: this.registerForm.value.firstName
    //     }).then( user => {
    
    //     }, err => {
    
    //     });
    //     this.loading = false;
    
    //     this.errorMessage = '';
    //     this.alertService.success('Registration successful', true);
    //     if (this.users.length === 0) {
    //       this.userService.createUser(this.user).then(user => {
    
    //       });
    //     } else if (this.users.length !== 0) {
    //       for (let i = 0; i < this.users.length; i++) {
    //         if (this.users[i].uid !== res.user.uid) {
    //           this.userService.createUser(this.user).then(user => {
    
    //           });
    //           break;
    //         } else {
    
    //         }
    //       }
    //     } else {
    
    //     }
    //     this.router.navigate(['/login']);
    //   },
    //   err => {
    
    //     this.loading = false;
    //     this.alertService.error(err.message);
    //   }
    // );
  }
}
