import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTestanswerManagementComponent } from './student-testanswer-management.component';
import { StudentTestanswerManagementRoutingModule } from './student-testanswer-management-routing.module';
import { DocumentEditorContainerAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';


@NgModule({
  declarations: [ StudentTestanswerManagementComponent],
  imports: [
    CommonModule,
    StudentTestanswerManagementRoutingModule, 
    DocumentEditorContainerAllModule,
    DocumentEditorModule, 
  ]
})
export class StudentTestanswerManagementModule { }
