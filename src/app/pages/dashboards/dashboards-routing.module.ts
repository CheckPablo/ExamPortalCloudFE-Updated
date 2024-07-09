import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import{StudentDashboardComponent} from './student-dashboard/student-dashboard.component'

const routes: Routes = [
  { path: '', component: DashboardsComponent }, 
  { 
    path: 'student-dashboard', 
    component: StudentDashboardComponent 
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
