import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { DisclaimerAccept } from '../../models/disclaimerAccept';


@Injectable({
  providedIn: 'root'
})
export class DisclaimerAcceptService extends ApiService<DisclaimerAccept>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Home");
  }
}
