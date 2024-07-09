import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentManagementRoutingModule } from './student-management-routing.module';
import { SearchStudentsComponent } from './search-students/search-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ExportAsModule } from 'ngx-export-as';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ExportStudentAnswersComponent } from './export-student-answers/export-student-answers.component';
import { PopUpComponent } from 'src/app/content/pop-up/pop-up.component';
//import{UUID} from 


@NgModule({
  declarations: [  
    SearchStudentsComponent,
    AddStudentComponent,
    ExportStudentAnswersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NgbHighlight,
    NgbNavModule,
    ReactiveFormsModule,
    StudentManagementRoutingModule,
    ExportAsModule, 
    PopUpComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StudentManagementModule { }
