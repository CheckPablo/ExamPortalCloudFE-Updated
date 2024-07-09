import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { TestQuestion} from '../../models/testQuestion';


@Injectable({
  providedIn: 'root'
})
export class TestQuestionService extends ApiService<TestQuestion>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
