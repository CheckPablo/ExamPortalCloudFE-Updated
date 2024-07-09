import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatComponent } from './flat/flat.component';
import { RouterModule } from '@angular/router';
import { BgImageComponent } from './bg-image/bg-image.component';
import { BgVideoComponent } from './bg-video/bg-video.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CountdownModule,
    RouterModule.forChild([
      {
        path: 'flat',
        component: FlatComponent
      },
      {
        path: 'bgImage',
        component: BgImageComponent
      },
      {
        path: 'bgVideo',
        component: BgVideoComponent
      },
      {
        path: 'maintenance',
        component: MaintenanceComponent
      },
      {
        path: 'searchPage',
        component: SearchPageComponent
      },
    ]),
  ],
  declarations: [FlatComponent, BgImageComponent, BgVideoComponent, MaintenanceComponent, SearchPageComponent],
  exports: [RouterModule]
  })
export class OthersModule { }

