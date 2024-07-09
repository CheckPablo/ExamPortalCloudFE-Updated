import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { ArchwizardModule } from 'angular-archwizard';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    QuillModule.forRoot(),
    CustomFormsModule,
    PerfectScrollbarModule,
    ArchwizardModule,
    BreadcrumbModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmailComponent
      }
    ])
  ],
  declarations: [EmailComponent]
})
export class EmailModule { }
