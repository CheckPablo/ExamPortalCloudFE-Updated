import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRepeaterComponent } from './form-repeater.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    MatchHeightModule,
    ReactiveFormsModule,
    FormsModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: '',
        component: FormRepeaterComponent
      },
    ])
  ],
  declarations: [FormRepeaterComponent],
  exports: [RouterModule]
})
export class FormRepeaterModule { }
