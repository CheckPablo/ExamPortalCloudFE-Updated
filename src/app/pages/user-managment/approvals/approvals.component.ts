import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { get } from 'http';
import { User } from 'src/app/core/models/user';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { UserService } from 'src/app/core/services/shared/user.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { SortableHeaderDirective, SortEvent, compare} from 'src/app/core/directives/sortable-header.directive'

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {
  approvedUserIds: number[] = [];
  activeUserIds: number[] = [];
  adminUserIds: number[] = [];
  filter: string;
  userIds: number[] = [];
  approvedState: string;
  activeState: string;
  users: User[] = [];
  loggedInUser: User;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(
    private router: Router,
    private userService: UserService,    
    public paginationService: PaginationService,
    private storage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.storage.getUser();
    this.paginationService.setData([]);
    this.paginationService.onSearchInputChange(''); 
  }

  private getUsers = () => {
    this.userService.get()
      .subscribe((data) => {
        this.users = data;
        this.paginationService.setData(data);
         
        this.initIds();
      })
  }

  private initIds = () => {
    this.userIds = []
    this.approvedUserIds = []
    this.adminUserIds = []
    this.activeUserIds = []

    this.users.forEach(user => {
      this.userIds.push(user.id);
      if (user.vsoftApproved) this.approvedUserIds.push(user.id);
      if (user.isSchoolAdmin) this.adminUserIds.push(user.id);
      if (user.isActive) this.activeUserIds.push(user.id);
    });
  }

  public isUserActive = (id: number): boolean => {
    return (this.activeUserIds.some(x => x === id))
  }

  public isUserAdmin = (id: number): boolean => {
    return (this.adminUserIds.some(x => x === id))
  }

  public isUserSelected = (id: number): boolean => {
    return (this.approvedUserIds.some(x => x === id))
  }

  public onActiveChange = (value: string) => {
    this.activeState = value;
  }

  public onActiveUserClick = (id: number) => {
    if (this.activeUserIds.find(x => x == id)) {
      this.activeUserIds = this.activeUserIds.filter(x => x != id)
    } else {
      this.activeUserIds.push(id);
    }
  }

  public onAdminUserClick = (id: number) => {
    if (this.adminUserIds.find(x => x == id)) {
      this.adminUserIds = this.adminUserIds.filter(x => x != id)
    } else {
      this.adminUserIds.push(id);
    }
  }

  public onApprovedChange = (value: string) => {
    this.approvedState = value;
     
  }

  public onDeleteUser(user: User) {
    Swal.fire({
      title: 'Are you sure you want to delete this user?',
      text: 'This will delete the users profile.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user.id)
          .subscribe(() => {
            this.getUsers();
            Swal.fire('User Deleted', 'User deleted successfully.', 'success');
          });
      }
      this.refresh();
    });
  }
  public onFilterClick = () => {
    if (this.activeState === 'all' && this.approvedState === 'all') {
     this.getUsers(); 
     
    }else{
      this.userService.search(this.activeState, this.approvedState)
       .subscribe((data)=>{
        this.users = data;
        this.paginationService.setData(data);
        this.initIds();
       })
    }
  }
  onSort({ column, direction }: SortEvent) {
    
    //resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  
    if (direction === ''|| column ==='') {
      //this.grades = this.grades;
      //this.grades = this.grades; 
      this.paginationService.paginatedData = this.paginationService.paginatedData;
  
    } else {
        //this.grades.sort((a, b) => {
        //this.grades = [...this.grades].sort((a, b) => {
        const sorted = this.paginationService.paginatedData.sort((a, b) => {
        //this.gradePaginationService.paginatedData = [...this.gradePaginationService.paginatedData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.paginationService.paginatedData = [...sorted];
    }
    //this.service.sortColumn = column;
    //this.service.sortDirection = direction;
  }
  /*public onSort = (a: any) => {
        
  }*/

  public onUpdateUsersClick = () => {
    Swal.fire({
      title: 'Update Users',
      text: 'Do you want to update the selected users now?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.userService.updateBulk(this.activeUserIds, this.adminUserIds, this.approvedUserIds, this.userIds)
          .subscribe(() => {
            Swal.fire('Update Users', 'The selected users have been successfully updated!', 'success');
            this.paginationService.searchTerm = ''; 
          })
      }
    });
  }

  public onUserClick = (id: number) => {
    if (this.approvedUserIds.find(x => x == id)) {
      this.approvedUserIds = this.approvedUserIds.filter(x => x != id)
    } else {
      this.approvedUserIds.push(id);
    }
  }

  public onViewUser = (user: User) => {
    this.router.navigate(['/portal/users/view-user', user.id]);
  }

   refresh(): void {
    //window.location.reload();
    this.onFilterClick(); 
    }
}
