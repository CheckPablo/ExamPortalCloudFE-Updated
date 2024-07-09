import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from "src/environments/environment";
import { CandidateLiveMonitoringRoutingModule } from './candidate-live-monitoring-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateLiveMonitoringComponent } from './candidate-live-monitoring.component';
import { CandidateLiveMonitoringPipe } from './candidateLiveMonitoring.pipe';
import { ExportAsModule } from 'ngx-export-as';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    CandidateLiveMonitoringComponent,
    CandidateLiveMonitoringPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateLiveMonitoringRoutingModule,
    ExportAsModule, 
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),
  ],
  providers: [DatePipe],
})
export class CandidateLiveMonitoringModule { }