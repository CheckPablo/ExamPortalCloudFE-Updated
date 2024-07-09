import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherComponent } from './feather/feather.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LineAwesomeComponent } from './line-awesome/line-awesome.component';
import { MeteoconsComponent } from './meteocons/meteocons.component';
import { SimpleLineIconsComponent } from './simple-line-icons/simple-line-icons.component';
import { CardModule } from '../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../_layout/blockui/block-template.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    BreadcrumbModule,
    CardModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([{
        path: 'feather',
        component: FeatherComponent
      },
      {
        path: 'line-awesome',
        component: LineAwesomeComponent
      },
      {
        path: 'meteocons',
        component: MeteoconsComponent
      },
      {
        path: 'simple-line-icons',
        component: SimpleLineIconsComponent
      },
    ])
  ],
  declarations: [FeatherComponent, LineAwesomeComponent, MeteoconsComponent, SimpleLineIconsComponent],
  exports: [RouterModule]
})
export class IconsModule { }
