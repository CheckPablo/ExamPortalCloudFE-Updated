import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterSummaryPipe } from './centersummary.pipe';
import { CenterSummaryComponent } from './center-summary.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CenterSummaryRoutingModule } from './center-summary-routing.module';


@NgModule({
  declarations: [CenterSummaryComponent, CenterSummaryPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CenterSummaryRoutingModule
  ]
})
export class CenterSummaryModule { }
