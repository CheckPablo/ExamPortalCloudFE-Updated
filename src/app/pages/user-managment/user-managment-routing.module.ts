import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from '../user-managment/list-users/list-users.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { 
    path: '', 
    component: ListUsersComponent 
  },
  { 
    path: 'approval', 
    component: ApprovalsComponent 
  },
  { 
    path: 'view-user/:id', 
    component: ViewUserComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagmentRoutingModule { }
