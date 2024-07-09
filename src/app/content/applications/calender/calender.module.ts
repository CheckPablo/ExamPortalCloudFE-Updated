import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BasicComponent } from './basic/basic.component';
import { EventsComponent } from './events/events.component';
import { AddeventComponent } from './addevent/addevent.component';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { DateTimePickerComponent } from './addevent/DateTimePickerComponent';
import {
  NgbModalModule,
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forChild([
      {
        path: 'basic',
        component: BasicComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'addevent',
        component: AddeventComponent
      }
    ])
  ],

  declarations: [
    BasicComponent,
    EventsComponent,
    AddeventComponent,
    DateTimePickerComponent
  ]
})
export class CalenderModule {}
