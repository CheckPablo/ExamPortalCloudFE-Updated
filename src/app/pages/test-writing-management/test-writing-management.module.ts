import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TestWritingManagementComponent } from './test-writing-management.component';
import { TestWritingManagementRoutingModule } from './test-writing-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { TestWritingAnswertemplateComponent } from './test-writing-answertemplate/test-writing-answertemplate.component';
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';
import { TestWritingAnswertemplateComponent } from './test-writing-answertemplate/test-writing-answertemplate.component';
//import { TestWritingAnswertemplateComponent } from './test-writing-answertemplate/test-writing-answertemplate.component'
import { DocumentEditorContainerAllModule, DocumentEditorModule } from '@syncfusion/ej2-angular-documenteditor';
import { environment } from "src/environments/environment";
import { FormatTimePipe } from './FormatTimePipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { TestWritingQrcodescanComponent } from './test-writing-qrcodescan/test-writing-qrcodescan.component';
import { TestWritingAnswerscanComponent } from './test-writing-answerscan/test-writing-answerscan.component';
import { runInZone } from '@ngx-loading-bar/core/loading-bar.service';
import {ZXingScannerModule} from '@zxing/ngx-scanner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
//import { DialogModule } from '@syncfusion/ej2-angular-popups'

//import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
//LOAD_WASM().subscribe();

//import { SpeechSynthesisComponent } from './speech-synthesis/speech-synthesis.component';
//import { SpeechTextComponent } from './speech-text/speech-text.component';
//import { SpeechVoiceComponent } from './speech-voice/speech-voice.component';


@NgModule({
  declarations: [TestWritingManagementComponent, TestWritingAnswertemplateComponent,FormatTimePipe, TestWritingQrcodescanComponent, TestWritingAnswerscanComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),
    TestWritingManagementRoutingModule, 
    DocumentEditorContainerAllModule,
    DocumentEditorModule, 
    //BrowserModule,
    ZXingScannerModule, 
    QRCodeModule,
   
    //NgxScannerQrcodeModule,
    ///BrowserAnimationsModule,     // required animations module
    //ToastrModule.forRoot(),
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),     // ToastrModule added
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // for firestore
    //DialogModule, 
  ], 
  exports: [
    TestWritingAnswertemplateComponent
  ],
  providers: [
    DatePipe
  ]
})
export class TestWritingManagementModule { 

}
