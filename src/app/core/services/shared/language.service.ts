import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Language } from '../../models/language';


@Injectable({
  providedIn: 'root'
})
export class LanguageService extends ApiService<Language>{
 
  constructor(
    private http: HttpClient) {
    super(http, "Languages");
  }
}
