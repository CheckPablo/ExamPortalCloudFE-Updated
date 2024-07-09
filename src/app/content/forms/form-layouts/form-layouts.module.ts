import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasicFormsComponent } from './basic-forms/basic-forms.component';
import { HorizontalFormsComponent } from './horizontal-forms/horizontal-forms.component';
import { HiddenLabelsComponent } from './hidden-labels/hidden-labels.component';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { RowSeparatorComponent } from './row-separator/row-separator.component';
import { BorderedComponent } from './bordered/bordered.component';
import { StripedLabelsComponent } from './striped-labels/striped-labels.component';
import { StripedRowsComponent } from './striped-rows/striped-rows.component';
import { RouterModule } from '@angular/router';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    MatchHeightModule,
    NgbModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([{
        path: 'basic-forms',
        component: BasicFormsComponent
      },
      {
        path: 'horizontal-forms',
        component: HorizontalFormsComponent
      },
      {
        path: 'hidden-labels',
        component: HiddenLabelsComponent
      },
      {
        path: 'form-actions',
        component: FormActionsComponent
      },
      {
        path: 'row-separator',
        component: RowSeparatorComponent
      },
      {
        path: 'bordered',
        component: BorderedComponent
      },
      {
        path: 'striped-rows',
        component: StripedRowsComponent
      },
      {
        path: 'striped-labels',
        component: StripedLabelsComponent
      },
    ])
  ],
  declarations: [BasicFormsComponent, HorizontalFormsComponent, HiddenLabelsComponent, FormActionsComponent,
    RowSeparatorComponent, BorderedComponent, StripedLabelsComponent, StripedRowsComponent],
  exports: [RouterModule]
})
export class FormLayoutsModule { }
