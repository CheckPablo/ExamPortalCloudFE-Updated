import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CenterAttendanceManagementComponent } from './center-attendance-management.component';

const routes:  Routes = [
  { path: '', component: CenterAttendanceManagementComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterAttendanceManagementRoutingModule { }
