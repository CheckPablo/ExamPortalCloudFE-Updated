import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserManagmentRoutingModule } from './user-managment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ApprovalsComponent } from './approvals/approvals.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ApprovalsPipe } from './approvals/approvals.pipe';
import { SortableHeaderDirective } from 'src/app/core/directives/sortable-header.directive';
import { UsersPipe } from './list-users/users.pipe';

@NgModule({
  declarations: [
    ListUsersComponent,
    ApprovalsComponent,
    ViewUserComponent, 
    ApprovalsPipe,UsersPipe , /*, SortableHeaderDirective*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    NgbHighlight,
    ReactiveFormsModule,
    UserManagmentRoutingModule
  ]
})
export class UserManagmentModule { }
