import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { BlockUIModule } from 'ng-block-ui';
import { CardModule } from '../../partials/general/card/card.module';
import { environment } from 'src/environments/environment';
import { NgxPhotoswipeModule, LightboxAdapter } from '@fnxone/ngx-photoswipe';
@NgModule({
  declarations: [UserCardsComponent, UserProfileComponent],
  imports: [
    CommonModule,
    CardModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    NgChartsModule,
    NgbModule,
    BreadcrumbModule,
    NgxPhotoswipeModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
   
    RouterModule.forChild([
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'user-cards',
        component: UserCardsComponent
      },
    ]),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule { }
