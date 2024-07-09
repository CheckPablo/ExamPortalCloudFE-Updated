import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { RouterModule } from '@angular/router';
import { CalloutComponent } from './callout/callout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BasicButtonsComponent } from './basic-buttons/basic-buttons.component';
import { ExtendedButtonsComponent } from './extended-buttons/extended-buttons.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { PopoversComponent } from './popovers/popovers.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseComponent } from './collapse/collapse.component';
import { BadgesComponent } from './badges/badges.component';
import { MediaobjectsComponent } from './mediaobjects/mediaobjects.component';
import { SpinnersComponent } from './spinners/spinners.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PillsComponent } from './pills/pills.component';
import { ModalsComponent } from './modals/modals.component';
import { ProgressComponent } from './progress/progress.component';
import { PillBadgesComponent } from './pill-badges/pill-badges.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NavsComponent } from './navs/navs.component';
import { CardModule } from '../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { BlockUIModule } from 'ng-block-ui';
import { MatchHeightModule } from '../partials/general/match-height/match-height.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CardModule,
    MatchHeightModule,
    BreadcrumbModule,
    PerfectScrollbarModule,
    UiSwitchModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'alerts',
        component: AlertsComponent
      },
      {
        path: 'callout',
        component: CalloutComponent
      },
      {
        path: 'basic-buttons',
        component: BasicButtonsComponent
      },
      {
        path: 'extended-buttons',
        component: ExtendedButtonsComponent
      },
      {
        path: 'tooltips',
        component: TooltipsComponent
      },
      {
        path: 'dropdowns',
        component: DropdownsComponent
      },
      {
        path: 'list-group',
        component: ListGroupComponent
      },
      {
        path: 'popovers',
        component: PopoversComponent
      },
      {
        path: 'carousel',
        component: CarouselComponent
      },
      {
        path: 'collapse',
        component: CollapseComponent
      },
      {
        path: 'modals',
        component: ModalsComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'pill-badges',
        component: PillBadgesComponent
      },
      {
        path: 'scrollable',
        component: ScrollableComponent
      },
      {
        path: 'navs',
        component: NavsComponent
      },
      {
        path: 'badges',
        component: BadgesComponent
      },
      {
        path: 'mediaobjects',
        component: MediaobjectsComponent
      },
      {
        path: 'spinners',
        component: SpinnersComponent
      },
      {
        path: 'pagination',
        component: PaginationComponent
      },
      {
        path: 'pills',
        component: PillsComponent
      }
    ])
  ],
  declarations: [AlertsComponent, CalloutComponent, BasicButtonsComponent,
    ExtendedButtonsComponent, TooltipsComponent, DropdownsComponent, ListGroupComponent,
    PopoversComponent, CarouselComponent, CollapseComponent, ModalsComponent,
    ProgressComponent, PillBadgesComponent, ScrollableComponent,
    NavsComponent, BadgesComponent, MediaobjectsComponent, SpinnersComponent,
    PaginationComponent, PillsComponent],
  exports: [RouterModule]
})
export class ComponentsModule { }
