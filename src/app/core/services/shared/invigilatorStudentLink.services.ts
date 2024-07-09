import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { InvigilatorStudentLink } from '../../models/invigilatorStudentLink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvigilatorStudentLinkService extends ApiService<InvigilatorStudentLink>{
  constructor(
    private http: HttpClient) {
    super(http, "InvigilatorStudentLink");
  }

  public linkInvigilator = (userId: number, studentIds: number[]): Observable<any> => {
    const payload = { userId, studentIds }

    return this.postEndpoint('link-students', payload);
  }
}
