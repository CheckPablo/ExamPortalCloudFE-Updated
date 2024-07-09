import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { UserDocumentAnswer} from '../../models/userDocumentAnswer';


@Injectable({
  providedIn: 'root'
})
export class UserDocumentAnswerService extends ApiService<UserDocumentAnswer>{
 
  constructor(
    private http: HttpClient) {
    super(http, "AnswerTexts");
  }
}
