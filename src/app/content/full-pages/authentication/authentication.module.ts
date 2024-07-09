import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSimpleComponent } from './login-simple/login-simple.component';
import { RouterModule, Router } from '@angular/router';
import { LoginWithBgComponent } from './login-with-bg/login-with-bg.component';
import { LoginWithBgImageComponent } from './login-with-bg-image/login-with-bg-image.component';
import { LoginWithNavbarComponent } from './login-with-navbar/login-with-navbar.component';
import { LoginAdvancedComponent } from './login-advanced/login-advanced.component';
import { RegisterSimpleComponent } from './register-simple/register-simple.component';
import { RegisterWithBgComponent } from './register-with-bg/register-with-bg.component';
import { RegisterWithBgImageComponent } from './register-with-bg-image/register-with-bg-image.component';
import { RegisterWithNavbarComponent } from './register-with-navbar/register-with-navbar.component';
import { RegisterAdvancedComponent } from './register-advanced/register-advanced.component';
import { UnlockUserComponent } from './unlock-user/unlock-user.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'loginSimple',
        component: LoginSimpleComponent
      },
      {
        path: 'loginWithBg',
        component: LoginWithBgComponent
      },
      {
        path: 'loginWithBgImage',
        component: LoginWithBgImageComponent
      },
      {
        path: 'loginWithNavbar',
        component: LoginWithNavbarComponent
      },
      {
        path: 'loginAdvanced',
        component: LoginAdvancedComponent
      },
      {
        path: 'registerSimple',
        component: RegisterSimpleComponent
      },
      {
        path: 'registerWithBg',
        component: RegisterWithBgComponent
      },
      {
        path: 'registerWithBgImage',
        component: RegisterWithBgImageComponent
      },
      {
        path: 'registerWithNavbar',
        component: RegisterWithNavbarComponent
      },
      {
        path: 'registerAdvanced',
        component: RegisterAdvancedComponent
      },
      {
        path: 'unlockUser',
        component: UnlockUserComponent
      },
      {
        path: 'recoverPassword',
        component: RecoverPasswordComponent
      },
    ])
  ],
  declarations: [LoginSimpleComponent, LoginWithBgComponent, LoginWithBgImageComponent, LoginWithNavbarComponent, LoginAdvancedComponent,
    RegisterSimpleComponent, RegisterWithBgComponent, RegisterWithBgImageComponent, RegisterWithNavbarComponent,
    RegisterAdvancedComponent, UnlockUserComponent, RecoverPasswordComponent],
  exports: [RouterModule]
})
export class AuthenticationModule { }
