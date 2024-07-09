import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLiveMonitoringComponent } from './candidate-live-monitoring.component';

const routes: Routes = [
  {path: '', component: CandidateLiveMonitoringComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateLiveMonitoringRoutingModule { }