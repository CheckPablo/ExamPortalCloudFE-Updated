import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCentersComponent } from './list-centers/list-centers.component';

const routes:  Routes = [
  { path: '', component: ListCentersComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentersRoutingModule { }
