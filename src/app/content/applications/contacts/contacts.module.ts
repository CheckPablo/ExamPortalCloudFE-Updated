import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    BreadcrumbModule,
    FormsModule,
    NgbModule,
    PerfectScrollbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContactsComponent
      }
    ])
  ],
  declarations: [ContactsComponent],
  exports: [RouterModule]
})
export class ContactsModule { }
