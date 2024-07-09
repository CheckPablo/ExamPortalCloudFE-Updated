import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/auth.models';
import { UploadedSourceDocument } from '../../models/uploadedSourcDocument';


@Injectable({
  providedIn: 'root'
})
export class UploadedSourceDocumentService extends ApiService<UploadedSourceDocument>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Accounts");
  }
}
