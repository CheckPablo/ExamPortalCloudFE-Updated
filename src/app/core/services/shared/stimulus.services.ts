import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Stimulus} from '../../models/stimulus';


@Injectable({
  providedIn: 'root'
})
export class StimulusService extends ApiService<Stimulus>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Administrations");
  }
}
