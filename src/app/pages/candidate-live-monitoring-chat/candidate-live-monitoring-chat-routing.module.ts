import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLiveMonitoringChatComponent } from './candidate-live-monitoring-chat.component';
const routes: Routes = [
  {path: '', component: CandidateLiveMonitoringChatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateLiveMonitoringChatRoutingModule { }
