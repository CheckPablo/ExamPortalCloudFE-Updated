import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Screenshot} from '../../models/screenshot';


@Injectable({
  providedIn: 'root'
})
export class ScreenShotService extends ApiService<Screenshot>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Tests");
  }
}
