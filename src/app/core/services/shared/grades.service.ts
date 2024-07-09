import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../../models/grade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradesService extends ApiService<Grade>{
  
  constructor(
    private http: HttpClient) {
    super(http, "Grades");
}
  public getGradesByCenter = (centerId?: number) : Observable<Grade[]>=> {
    //const payload ={centerId}
    const url = `getByCenterId/${centerId}`
    return this.getUrl(url)
  }

}
