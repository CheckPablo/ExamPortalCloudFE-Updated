import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from "src/environments/environment";
import { LiveTestMonitoringRoutingModule } from './live-test-monitoring-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveTestMonitoringComponent } from './live-test-monitoring.component';
import { LiveTestMonitoringPipe } from './liveTestMonitoringPipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { PopUpComponent } from "../../content/pop-up/pop-up.component";

@NgModule({

    declarations: [
        LiveTestMonitoringComponent,
        LiveTestMonitoringPipe
    ],
    providers: [DatePipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LiveTestMonitoringRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        PopUpComponent
    ]
})
export class LiveTestMonitoringModule { }