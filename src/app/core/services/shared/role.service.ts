import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../models/role';


@Injectable({
  providedIn: 'root'
})
export class RoleService extends ApiService<Role>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
