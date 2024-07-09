import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  { InvigilatorProfileManagementComponent } from './invigilator-profile-management/invigilator-profile-management.component';


const routes: Routes = [
  { path: '', component: InvigilatorProfileManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvigilatorProfileManagementRoutingModule { }
