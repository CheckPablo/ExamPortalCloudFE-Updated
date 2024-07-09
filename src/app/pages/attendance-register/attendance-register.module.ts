import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceRegisterComponent } from './attendance-register.component';
import { AttendanceRegisterPipe } from './attendanceRegister.pipe';
import { AttendanceRegisterRoutingModule } from './attendance-register-routing.module';
import { ExportAsModule } from 'ngx-export-as';

@NgModule({
  declarations: [
    AttendanceRegisterComponent,
    AttendanceRegisterPipe, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AttendanceRegisterRoutingModule, 
    ExportAsModule, 
  ], 
   providers: [DatePipe],
})
export class AttendanceRegisterModule { }