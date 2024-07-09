import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartistModule } from 'ng-chartist';
import { SocialComponent } from './social/social.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { ChartsComponent } from './charts/charts.component';
import { CardModule } from '../partials/general/card/card.module';
import { MatchHeightModule } from '../partials/general/match-height/match-height.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ChartistModule,
    CardModule,
    NgChartsModule,
    BreadcrumbModule,
    MatchHeightModule,
    RouterModule.forChild([
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'social',
        component: SocialComponent
      },
      {
        path: 'charts',
        component: ChartsComponent
      }
    ])
  ],
  declarations: [StatisticsComponent, SocialComponent, ChartsComponent],
  exports: [RouterModule]
})
export class AdvanceCardsModule {}
