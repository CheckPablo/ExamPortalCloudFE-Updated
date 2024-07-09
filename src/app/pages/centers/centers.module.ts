import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CentersRoutingModule } from './centers-routing.module';
import { ListCentersComponent } from './list-centers/list-centers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CenterPipe } from './list-centers/center.pipe';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';


@NgModule({
  declarations: [
    ListCentersComponent, CenterPipe
    /*, SortableHeaderDirective*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CentersRoutingModule
  ], 
   providers: [DatePipe],
})
export class CentersModule { }
