import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Html5dataexportComponent } from './html5dataexport/html5dataexport.component';
import { ClipboardModule } from 'ngx-clipboard';
import { HiddentableComponent } from './hiddentable/hiddentable.component';
import { CardModule } from '../../partials/general/card/card.module';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../../../_layout/blockui/block-template.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    NgxDatatableModule,
    FormsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    ClipboardModule,
    NgbModule,
    PerfectScrollbarModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    RouterModule.forChild([
      {
        path: 'buttons',
        component: ButtonsComponent
      },
      {
        path: 'html5dataexport',
        component: Html5dataexportComponent
      },
      {
        path: 'hiddentable',
        component: HiddentableComponent
      },
    ]),
  ],
  declarations: [ButtonsComponent, Html5dataexportComponent, HiddentableComponent]
})
export class DatatablesextModule { }
