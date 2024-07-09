import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from '../../partials/general/card/card.module';
import { ChartistModule } from 'ng-chartist';
import { RouterModule } from '@angular/router';
import { LinechartsComponent } from './linecharts/linecharts.component';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    ChartistModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'linecharts',
        component: LinechartsComponent
      },
    ]),
  ],

  declarations: [LinechartsComponent]
})
export class NgchartistModule { }
