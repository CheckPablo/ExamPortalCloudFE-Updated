import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { BulkImportSectorSubject } from '../../models/bulkImportSectorSubject';


@Injectable({
  providedIn: 'root'
})
export class BulkImportSectorSubjectService extends ApiService<BulkImportSectorSubject>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Administrations");
  }
}
