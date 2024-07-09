import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { BulkImportPerson } from '../../models/bulkImportPerson';


@Injectable({
  providedIn: 'root'
})
export class BulkImportPersonService extends ApiService<BulkImportPerson>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Administrations");
  }
}
