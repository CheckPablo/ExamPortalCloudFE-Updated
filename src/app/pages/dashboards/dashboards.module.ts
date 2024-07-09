import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { InvigilatorDashboardComponent } from './invigilator-dashboard/invigilator-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { DashboardsComponent } from './dashboards.component';
import { TestListPipe } from './student-dashboard/TestListPipe';
import { environment } from "src/environments/environment";
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { PopUpComponent } from "../../content/pop-up/pop-up.component";
//import { MbscModule } from '@mobiscroll/angular';


@NgModule({
    declarations: [
        InvigilatorDashboardComponent,
        StudentDashboardComponent,
        DashboardsComponent,
        TestListPipe,
        //StudentOfflineAnswersComponent
    ],
    exports: [
        StudentDashboardComponent,
        InvigilatorDashboardComponent,
        //StudentOfflineAnswersComponent
    ],
    providers: [DatePipe],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        NgbPaginationModule,
        NgbHighlight,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        FormsModule,
        PopUpComponent
    ]
})
export class DashboardsModule { }
