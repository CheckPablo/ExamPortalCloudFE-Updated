import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSubjectsComponent } from './search-subjects/search-subjects.component';

const routes: Routes = [
  {path:'', component:SearchSubjectsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectManagementRoutingModule { }
