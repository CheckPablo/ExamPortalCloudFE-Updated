

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { StudentTestWriteInformation } from '../../models/StudentTestWriteInformation';
import { Upload } from '../../models/upload';


@Injectable({
  providedIn: 'root'
})
export class BulkImportService extends ApiService<StudentTestWriteInformation>{ //remove this 
  core: any;
  private uploads = new BehaviorSubject<Upload[]>(null);
  uploads$ = this.uploads.asObservable();

  constructor(
    private http: HttpClient) {
    super(http, "BulkImport");
  }

}
