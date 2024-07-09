import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Assessment } from '../../models/assessment';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService extends ApiService<Assessment>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Exams");
  }
}
