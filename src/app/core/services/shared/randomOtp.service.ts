import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { RandomOtp } from '../../models/randomOtp';



@Injectable({
  providedIn: 'root'
})
export class RandomOtpService extends ApiService<RandomOtp>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Administrations");
  }
  
}
