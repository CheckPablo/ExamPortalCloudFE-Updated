import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterSummaryComponent } from './center-summary.component';
const routes: Routes = [
  {path: '', component: CenterSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterSummaryRoutingModule { }
