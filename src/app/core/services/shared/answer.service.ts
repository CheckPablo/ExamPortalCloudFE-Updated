import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../../models/answer';


@Injectable({
  providedIn: 'root'
})
export class AnswerService extends ApiService<Answer>{
 
  constructor(
    private http: HttpClient) {
    super(http, "AnswerTexts");
  }
}
