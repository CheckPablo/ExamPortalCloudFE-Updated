import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestWritingManagementComponent } from './test-writing-management.component';

const routes: Routes = [
  //{ path: 'test-writing-management/:id/:studentId/:testName', component: TestWritingManagementComponent }
 { path: 'test-writing-management/:uniqueName/:id/:studentId/:testName', component: TestWritingManagementComponent}
  //{ path: 'test-writing-management/:id/:studentId/:testName/:tokenString', component: TestWritingManagementComponent }
   //<string>http://localhost:13100/portal/test-writing/test-writing-management/VSTT172000009474/4419/9474/Software Testing Advanced</string>
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestWritingManagementRoutingModule { }
