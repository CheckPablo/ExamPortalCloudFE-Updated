import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGradesComponent } from './list-grades/list-grades.component';

const routes: Routes = [
{ path: '', component: ListGradesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradesRoutingModule { }
