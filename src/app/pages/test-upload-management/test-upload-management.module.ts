import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TestUploadManagementRoutingModule } from './test-upload-management-routing.module';
import { TestUploadComponent } from './test-upload/test-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbModule, NgbNavModule, NgbPaginationModule, NgbModalModule,NgbDatepickerModule,NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ExportAsModule } from 'ngx-export-as';
import { ViewTestsComponent } from './view-tests/view-tests.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BlockTemplateComponent } from 'src/app/_layout/blockui/block-template.component';
//import { BlockUIModule } from 'block-ui';
import { BlockUIModule } from "primeng/blockui"; 
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
//import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TestsOtpComponent } from './tests-otp/tests-otp.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
//import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WordPreviewComponent } from './word-preview/word-preview.component';
import { DocumentEditorContainerAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';
//import { BrowserModule, BrowserAnimationsModule, HttpModule } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';
import { ViewTestsPipe } from './view-tests/viewTests.pipe';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';

@NgModule({
  declarations: [
    ViewTestsComponent,
    TestUploadComponent,
    TestsOtpComponent,
    WordPreviewComponent,
    SafePipe, 
    ViewTestsPipe/*,
    SortableHeaderDirective*/
  ],
  imports: [
    CommonModule,
    //BrowserModule, 
    FormsModule,
    FlatpickrModule.forRoot(),
    NgbPaginationModule,
    NgbHighlight,
    NgbModule,
    NgbNavModule,
    NgbModalModule,
    NgbDatepickerModule, 
    NgbTimepickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
     }),
    ReactiveFormsModule,
    TestUploadManagementRoutingModule, 
    ExportAsModule,
    PdfViewerModule,
    //ButtonModule,
    NgxDocViewerModule,
    //NgxExtendedPdfViewerModule,
    DocumentEditorContainerAllModule,
    DocumentEditorModule
  ],
  exports: [
    WordPreviewComponent
  ],
  providers: [
    DatePipe
  ]
})
export class TestUploadManagementModule { }
