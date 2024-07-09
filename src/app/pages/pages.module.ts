import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
//import { StudentTestlistManagementComponent } from './student-testlist-management/student-testlist-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
//import { BulkImportComponent } from './bulk-import/bulk-import.component';
//import { StudentTestanswerManagementComponent } from './student-testanswer-management/student-testanswer-management.component';
//import { CenterSummaryComponent } from './center-summary/center-summary.component';



@NgModule({
  declarations: [
    //StudentTestlistManagementComponent,
  SortableHeaderDirective,
    LoadingSpinnerComponent,
    //BulkImportComponent,
    //StudentTestanswerManagementComponent
    //CenterSummaryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, 
    ReactiveFormsModule, 
    FormsModule, 
  ]
})
export class PagesModule { }
