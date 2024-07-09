import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { CardModule } from '../../partials/general/card/card.module';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceSummaryComponent, InvoiceTemplateComponent],
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgbModule,
    MatchHeightModule,
    FormsModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'invoice-list',
        component: InvoiceListComponent
      },
      {
        path: 'invoice-summary',
        component: InvoiceSummaryComponent
      },
      {
        path: 'invoice-template',
        component: InvoiceTemplateComponent
      },
    ]),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InvoiceModule { }
