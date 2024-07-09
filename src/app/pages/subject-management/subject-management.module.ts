import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectManagementRoutingModule } from './subject-management-routing.module';
import { SearchSubjectsComponent } from './search-subjects/search-subjects.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
//import{SubjectsPipe} from 
import { SubjectsPipe } from './search-subjects/subjects.pipe';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';
import { PopUpComponent } from 'src/app/content/pop-up/pop-up.component';

@NgModule({
  declarations: [
    SearchSubjectsComponent, SubjectsPipe/*, SortableHeaderDirective*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NgbHighlight,
    ReactiveFormsModule,
    SubjectManagementRoutingModule, 
    PopUpComponent
  ]
})
export class SubjectManagementModule { }
