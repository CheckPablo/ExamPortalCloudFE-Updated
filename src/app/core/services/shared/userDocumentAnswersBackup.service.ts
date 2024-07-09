import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { UserDocumentAnswersBackup} from '../../models/userDocumentAnswersBackup';


@Injectable({
  providedIn: 'root'
})
export class UserDocumentAnswerBackupService extends ApiService<UserDocumentAnswersBackup>{
 
  constructor(
    private http: HttpClient) {
    super(http, "AnswerTexts");
  }
}
