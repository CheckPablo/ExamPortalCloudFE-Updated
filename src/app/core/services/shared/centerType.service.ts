import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { CenterType } from '../../models/centerType';


@Injectable({
  providedIn: 'root'
})
export class CenterTypeService extends ApiService<CenterType>{
 
  constructor(
    private http: HttpClient) {
    super(http, "CenterTypes");
  }
}
