import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    NgChartsModule,
    CardModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'charts',
        component: ChartsComponent
      }
    ])
  ],
  declarations: [ChartsComponent]
})
export class ChartjsModule { }
