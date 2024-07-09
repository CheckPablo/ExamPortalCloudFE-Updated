import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Region } from '../../models/region';


@Injectable({
  providedIn: 'root'
})
export class RegionService extends ApiService<Region>{
  constructor(
    private http: HttpClient) {
    super(http, "Regions");
  }
}
