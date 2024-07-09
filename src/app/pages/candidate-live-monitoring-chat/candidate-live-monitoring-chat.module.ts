import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from "src/environments/environment";
import { CandidateLiveMonitoringChatRoutingModule } from './candidate-live-monitoring-chat-routing.module';
import { CandidateLiveMonitoringChatComponent } from './candidate-live-monitoring-chat.component';
import { CandidateLiveMonitoringChatPipe } from '../candidate-live-monitoring-chat/candidateLiveMonitoringChat.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportAsModule } from 'ngx-export-as';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations:
  [CandidateLiveMonitoringChatComponent,
    CandidateLiveMonitoringChatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateLiveMonitoringChatRoutingModule, 
    ExportAsModule, 
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // for firestore
  ]
})
export class CandidateLiveMonitoringChatModule { }
