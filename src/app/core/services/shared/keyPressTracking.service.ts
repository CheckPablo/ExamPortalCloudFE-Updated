import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { KeyPressTracking } from '../../models/keyPressTracking';


@Injectable({
  providedIn: 'root'
})
export class KeyPressTrackingService extends ApiService<KeyPressTracking>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Monitorings");
  }
}
