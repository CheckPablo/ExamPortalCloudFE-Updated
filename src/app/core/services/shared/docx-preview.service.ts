import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as DocxJS from 'docx-js';
import { Docx } from 'docx-js';

@Injectable({
  providedIn: 'root'
})
export class DocxPreviewService {

  constructor(private http: HttpClient) { }

  public async previewDocx(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async (event) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const docx = new Docx(arrayBuffer);
        const html = await docx.asHTML();
        resolve(html);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  public async previewDocxFromUrl(url: string): Promise<string> {
    const arrayBuffer = await this.http.get(url, { responseType: 'arraybuffer' }).toPromise();
    const docx = new DocxJS.Docx(arrayBuffer);
    return docx.asHTML();
  }
}
