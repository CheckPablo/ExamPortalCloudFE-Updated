import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CenterAttendancePipe } from './centerAttendance.pipe';
import { CenterAttendanceManagementRoutingModule } from './center-attendance-management-routing.module';
import { CenterAttendanceManagementComponent } from './center-attendance-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';


@NgModule({
  declarations: [CenterAttendanceManagementComponent,CenterAttendancePipe/*, SortableHeaderDirective*/],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CenterAttendanceManagementRoutingModule, 
    
  ], 
  providers: [DatePipe],
})
export class CenterAttendanceManagementModule { }
