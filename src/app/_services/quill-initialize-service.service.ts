import { Injectable } from '@angular/core';
import Quill from 'quill';
import QuillAutoLink from '../content/applications/quill/quillAutolinks';
@Injectable({
  providedIn: 'root'
})
export class QuillInitializeServiceService {

  constructor() { 
    var Link = Quill.import('formats/link');
    Link.sanitize = (url) => {
      if(url.indexOf("http") <= -1){
        url = "https://" + url;
      }
      return url;
    }
    Quill.register('modules/autoLink', QuillAutoLink);
  }

}