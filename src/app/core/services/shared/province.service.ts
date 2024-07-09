import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Province } from '../../models/province';


@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends ApiService<Province>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Accounts");
  }
}
