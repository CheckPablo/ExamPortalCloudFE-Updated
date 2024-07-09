import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error400Component } from './error400/error400.component';
import { Error400WithNavbarComponent } from './error400-with-navbar/error400-with-navbar.component';
import { Error401Component } from './error401/error401.component';
import { Error401WithNavbarComponent } from './error401-with-navbar/error401-with-navbar.component';
import { Error403Component } from './error403/error403.component';
import { Error403WithNavbarComponent } from './error403-with-navbar/error403-with-navbar.component';
import { Error404Component } from './error404/error404.component';
import { Error404WithNavbarComponent } from './error404-with-navbar/error404-with-navbar.component';
import { Error500Component } from './error500/error500.component';
import { Error500WithNavbarComponent } from './error500-with-navbar/error500-with-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'error400',
        component: Error400Component
      },
      {
        path: 'error400WithNavbar',
        component: Error400WithNavbarComponent
      },
      {
        path: 'error401',
        component: Error401Component
      },
      {
        path: 'error401WithNavbar',
        component: Error401WithNavbarComponent
      },
      {
        path: 'error403',
        component: Error403Component
      },
      {
        path: 'error403WithNavbar',
        component: Error403WithNavbarComponent
      },
      {
        path: 'error404',
        component: Error404Component
      },
      {
        path: 'error404WithNavbar',
        component: Error404WithNavbarComponent
      },
      {
        path: 'error500',
        component: Error500Component
      },
      {
        path: 'error500WithNavbar',
        component: Error500WithNavbarComponent
      },
    ])
  ],
  declarations: [Error400Component, Error400WithNavbarComponent, Error401Component, Error401WithNavbarComponent,
    Error403Component, Error403WithNavbarComponent, Error404Component, Error404WithNavbarComponent, Error500Component,
    Error500WithNavbarComponent],
  exports: [RouterModule]
})
export class ErrorModule { }
