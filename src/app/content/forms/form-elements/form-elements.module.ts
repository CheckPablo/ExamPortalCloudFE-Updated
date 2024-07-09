import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { InputGroupsComponent } from './input-groups/input-groups.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { InputGridComponent } from './input-grid/input-grid.component';
import { CheckboxesRadiosComponent } from './checkboxes-radios/checkboxes-radios.component';
import { SwitchComponent } from './switch/switch.component';
import { SelectComponent } from './select/select.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BlockUIModule } from 'ng-block-ui';
import { CustomFormsModule } from 'ngx-custom-validators';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { MatchHeightModule } from '../../partials/general/match-height/match-height.module';
import { ExtendedinputsComponent } from './extendedinputs/extendedinputs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    UiSwitchModule,
    MatchHeightModule,
    NgSelectModule,
    BreadcrumbModule,
    NgbModule,
    CustomFormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'form-inputs',
        component: FormInputsComponent
      },
      {
        path: 'input-groups',
        component: InputGroupsComponent
      },
      {
        path: 'input-grid',
        component: InputGridComponent
      },
      {
        path: 'checkboxes-radios',
        component: CheckboxesRadiosComponent
      },
      {
        path: 'switch',
        component: SwitchComponent
      },
      {
        path: 'select',
        component: SelectComponent
      },
      {
        path: 'extendedinputs',
        component: ExtendedinputsComponent
      },
    ])
  ],
  declarations: [FormInputsComponent, InputGroupsComponent, InputGridComponent,
  CheckboxesRadiosComponent, SwitchComponent, SelectComponent, ExtendedinputsComponent],
  exports: [RouterModule]
})
export class FormElementsModule { }
