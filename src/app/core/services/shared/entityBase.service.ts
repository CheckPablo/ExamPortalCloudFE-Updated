import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { EntityBase } from '../../models/entityBase';


@Injectable({
  providedIn: 'root'
})
export class DisclaimerAcceptService extends ApiService<EntityBase>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Home");
  }
}
