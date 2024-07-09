import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent } from './kanban/kanban.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DndListModule } from 'ngx-drag-and-drop-lists';

@NgModule({
  declarations: [KanbanComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    QuillModule.forRoot(),
    DndListModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: KanbanComponent 
      }
    ])
  ]
})
export class KanbanModule { }
