import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicinitialisationComponent } from './basicinitialisation/basicinitialisation.component';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StylingComponent } from './styling/styling.component';
import { ApiComponent } from './api/api.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    NgSelectModule,
    FormsModule,
    ClipboardModule,
    PerfectScrollbarModule,
    NgxDatatableModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'basicinitialisation',
        component: BasicinitialisationComponent
      },
      {
        path: 'styling',
        component: StylingComponent
      },

      {
        path: 'api',
        component: ApiComponent
      },
      ]),
  ],
  declarations: [BasicinitialisationComponent, StylingComponent, ApiComponent],
  exports: [RouterModule]
})
export class DatatablesModule { }
