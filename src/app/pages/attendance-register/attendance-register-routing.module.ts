import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceRegisterComponent } from './attendance-register.component';

const routes:  Routes = [
  { path: '', component: AttendanceRegisterComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRegisterRoutingModule { }