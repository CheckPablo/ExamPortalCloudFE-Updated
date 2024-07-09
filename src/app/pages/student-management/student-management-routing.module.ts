import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchStudentsComponent } from './search-students/search-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ExportStudentAnswersComponent } from './export-student-answers/export-student-answers.component';

const routes: Routes = [
  {path:'',component:SearchStudentsComponent},
  {path:'add-student',component:AddStudentComponent},
  {path:'view-student/:id',component:AddStudentComponent},
  {path:'searchgrid-students',component:SearchStudentsComponent},
  {path:'export-student-answers',component:ExportStudentAnswersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentManagementRoutingModule { }
