import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Irregularity } from '../../models/irregularity';


@Injectable({
  providedIn: 'root'
})
export class IrregularityService extends ApiService<Irregularity>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Monitorings");
  }
}
