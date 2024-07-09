import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Test} from '../../models/test';
import { TestCategory } from '../../models/testCategory';


@Injectable({
  providedIn: 'root'
})
export class TestCategoryService extends ApiService<TestCategory>{
 
  constructor(
    private http: HttpClient) {
    super(http, "TestCategories");
  }
}
