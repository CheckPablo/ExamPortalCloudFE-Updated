import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTestanswerManagementComponent } from './student-testanswer-management.component';

const routes: Routes = [ { 
 // path: 'student-testanswer/:id', component: StudentTestanswerManagementComponent 
 path: 'student-testanswer/:id/:studentId/:testName', component: StudentTestanswerManagementComponent
 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentTestanswerManagementRoutingModule { }
