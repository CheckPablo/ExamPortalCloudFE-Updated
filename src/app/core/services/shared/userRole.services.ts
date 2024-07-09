import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { UserRole} from '../../models/userRole';


@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends ApiService<UserRole>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Accounts");
  }
}
