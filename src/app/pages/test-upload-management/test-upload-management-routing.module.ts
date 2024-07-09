import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestUploadComponent } from './test-upload/test-upload.component';
import { ViewTestsComponent } from './view-tests/view-tests.component';
import { TestsOtpComponent } from './tests-otp/tests-otp.component';
const routes: Routes = [
  { path: '', component: TestUploadComponent },
  {path:'view-tests',component:ViewTestsComponent},
  {path:'tests-otp',component:TestsOtpComponent},
  {path:':id',component:TestUploadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestUploadManagementRoutingModule { }
