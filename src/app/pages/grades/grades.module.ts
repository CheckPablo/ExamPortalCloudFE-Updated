import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradesRoutingModule } from './grades-routing.module';
import { ListGradesComponent } from './list-grades/list-grades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GradesPipe } from './list-grades/grade.pipe';
import { PopUpComponent } from 'src/app/content/pop-up/pop-up.component';
@NgModule({
  declarations: [
    ListGradesComponent, 
     GradesPipe 
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NgbHighlight,
    ReactiveFormsModule,
    GradesRoutingModule, 
    PopUpComponent
  ]
})
export class GradesModule { }
