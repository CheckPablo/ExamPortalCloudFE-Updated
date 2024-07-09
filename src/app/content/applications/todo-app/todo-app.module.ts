import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoappComponent } from './todoapp.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TodoService } from 'src/app/_api/todo/todo.service';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { ImagePreloadDirective } from '../../../_directives/image.preload.directive';


@NgModule({
  declarations: [TodoappComponent, ImagePreloadDirective],
  providers: [TodoService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
   QuillModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    RouterModule.forChild([
      {
        path: '',
        component: TodoappComponent
      }
    ])
  ],
  exports: [ImagePreloadDirective]
})
export class TodoAppModule { }
