import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvigilatorProfileManagementRoutingModule } from './invigilator-profile-management-routing.module';
import { InvigilatorProfileManagementComponent } from './invigilator-profile-management/invigilator-profile-management.component';


@NgModule({
  declarations: [
    InvigilatorProfileManagementComponent
  ],
  imports: [
    CommonModule,
    InvigilatorProfileManagementRoutingModule
  ]
})
export class InvigilatorProfileManagementModule { }
