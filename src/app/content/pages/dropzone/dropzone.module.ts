import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from './dropzone.component';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { CardModule } from '../../partials/general/card/card.module';
@NgModule({
  declarations: [DropzoneComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    BreadcrumbModule,
    BlockUIModule,
    CardModule,
    RouterModule.forChild([
      {
        path: 'dropzone',
        component: DropzoneComponent
      }
    ])
  ]
})
export class DropzoneModule { }
