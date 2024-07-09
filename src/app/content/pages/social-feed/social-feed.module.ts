import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialFeedComponent } from './social-feed/social-feed.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SocialFeedComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    NgbModule,
    MatchHeightModule,
    RouterModule.forChild([
      {
         path: 'social-feed',
         component: SocialFeedComponent
       },
      ]),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SocialFeedModule { }
