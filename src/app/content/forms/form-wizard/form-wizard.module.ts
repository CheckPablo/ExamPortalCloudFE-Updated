import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../partials/general/card/card.module';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';
import { FormwizardComponent } from './formwizard/formwizard.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatchHeightModule,
    FormsModule,
    NgbDatepickerModule,
    ArchwizardModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: '',
        component: FormwizardComponent
      },
    ])
  ],
  declarations: [FormwizardComponent],
  exports: [RouterModule]
})
export class FormWizardModule { }
