import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { StudentTestLog} from '../../models/studentTestLog';


@Injectable({
  providedIn: 'root'
})
export class StudentsTestLogService extends ApiService<StudentTestLog>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
