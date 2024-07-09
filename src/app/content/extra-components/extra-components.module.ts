import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';
import { MatchHeightModule } from '../partials/general/match-height/match-height.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ArchwizardModule } from 'angular-archwizard';
import { BlockUIModule } from 'ng-block-ui';
import { QuillModule } from 'ngx-quill';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
import { CardModule } from '../partials/general/card/card.module';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    MatchHeightModule,
    BreadcrumbModule,
    ArchwizardModule,
    CustomFormsModule,
    NgbModule,
    QuillModule.forRoot(),
    PerfectScrollbarModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'dateTimePicker',
        component: DateTimePickerComponent
      },
      {
        path: 'typeAhead',
        component: TypeAheadComponent
      },
      {
        path: 'text-editor',
        component: TextEditorComponent
      }
    ]),
  ],
  declarations: [DateTimePickerComponent, TypeAheadComponent, TextEditorComponent],
  exports: [RouterModule]
})
export class ExtraComponentsModule { }
