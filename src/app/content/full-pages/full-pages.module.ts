import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullPagesRoutingModule } from './full-pages.routing.module';
import { ErrorModule } from './error/error.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { OthersModule } from './others/others.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    ErrorModule,
    AuthenticationModule,
    OthersModule,
  ],
  exports: [RouterModule],
})
export class FullPagesModule { }
