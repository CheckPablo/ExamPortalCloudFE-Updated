import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveTestMonitoringComponent } from './live-test-monitoring.component';

const routes:  Routes = [
  { path: '', component: LiveTestMonitoringComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTestMonitoringRoutingModule { }