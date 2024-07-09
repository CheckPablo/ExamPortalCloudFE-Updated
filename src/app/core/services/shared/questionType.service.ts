import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { QuestionType } from '../../models/questionType';


@Injectable({
  providedIn: 'root'
})
export class QuestionTypeService extends ApiService<QuestionType>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
