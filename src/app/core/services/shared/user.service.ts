import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User>{
 
  constructor(
    private http: HttpClient) {
    super(http, "UserManagement");
  }

  public getByCenter = (centerId?: number): Observable<User[]> => {
    let url = `get-by-center`

    if (centerId) url = `${url}/${centerId}`

    return this.getUrl(url);
  }

  public resetPassword = (payload: any): Observable<User> => {
    return this.postUrl('reset-password', payload)
  }

  search(activeState: string, approvedState: string):Observable<User[]>{
   return this.getUrl(`search/${activeState}/${approvedState}`);
  }

  public updateBulk = (activeUserIds: number[], adminUserIds: number[], approvedUserIds: number[], userIds: number[]): Observable<any> => {
    return this.postUrl('bulk-user-update', { activeUserIds, adminUserIds, approvedUserIds, userIds })
  }

  public updateInvigilatorUser(user: User): Observable<any> {
    return this.postUrl('invigilatorUser-update', user);
  }
}
