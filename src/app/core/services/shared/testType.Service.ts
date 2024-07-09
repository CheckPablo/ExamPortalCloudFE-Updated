import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { TestType } from '../../models/testType';


@Injectable({
  providedIn: 'root'
})
export class TestTypeService extends ApiService<TestType>{
 
  constructor(
    private http: HttpClient) {
    super(http, "TestTypes");
  }
}
