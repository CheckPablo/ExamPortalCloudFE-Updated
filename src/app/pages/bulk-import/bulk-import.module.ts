import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkImportComponent } from './bulk-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkImportRoutingModule } from './bulk-import-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BulkImportRoutingModule
  ]
})
export class BulkImportModule { }
