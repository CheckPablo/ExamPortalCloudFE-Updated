import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { TestQuestion} from '../../models/testQuestion';
import { TestSecurityLevel } from '../../models/testSecurityLevel';


@Injectable({
  providedIn: 'root'
})
export class TestSecurityLevelService extends ApiService<TestSecurityLevel>{
 
  constructor(
    private http: HttpClient) {
    super(http, "TestSecurityLevels");
  }
}
