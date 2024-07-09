import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasictableComponent } from './basictable/basictable.component';
import { TableborderComponent } from './tableborder/tableborder.component';
import { TablesizingComponent } from './tablesizing/tablesizing.component';
import { TablestylingComponent } from './tablestyling/tablestyling.component';
import { TablecomponentsComponent } from './tablecomponents/tablecomponents.component';
import { NgxboostraptablesComponent, NgbSortable} from './ngxboostraptables/ngxboostraptables.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { NgbdSortableHeader } from '../../../_directives/sortable.directive';

@NgModule({
  imports: [
    NgxDatatableModule,
    CardModule,
    BreadcrumbModule,
    CommonModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    RouterModule.forChild([
      {
        path: 'basictable',
        component: BasictableComponent
      },
      {
        path: 'tableborder',
        component: TableborderComponent
      },
      {
        path: 'tablesizing',
        component: TablesizingComponent
      },
    {
        path: 'tablestyling',
        component: TablestylingComponent
      },
      {
        path: 'tablecomponents',
        component: TablecomponentsComponent
      },
      {
        path: 'ngxboostraptables',
        component: NgxboostraptablesComponent
      },
     ]),
  ],
  declarations: [BasictableComponent, TableborderComponent, TablesizingComponent, TablestylingComponent, TablecomponentsComponent,
    NgxboostraptablesComponent, NgbSortable, NgbdSortableHeader],
})

export class BoostraptablesModule { }
