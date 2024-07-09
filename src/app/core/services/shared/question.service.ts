import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Question } from '../../models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService extends ApiService<Question>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
