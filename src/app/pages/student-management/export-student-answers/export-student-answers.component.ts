import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grade } from 'src/app/core/models/grade';
import { Subject } from 'src/app/core/models/subject';
import { Test } from 'src/app/core/models/test';
import { GradesService } from 'src/app/core/services/shared/grades.service';
import { SubjectService } from 'src/app/core/services/shared/subject.service';
import { TestService } from 'src/app/core/services/shared/test.service';
import { StudentsTestService } from 'src/app/core/services/shared/studentTest.service';
import { Region } from 'src/app/core/models/region';
import { RegionService } from 'src/app/core/services/shared/region.service';
import { Resulting } from 'src/app/core/models/resulting';
import { ImageFormat, PdfBitmap, PdfDocument, PdfPageOrientation, PdfPageSettings, PdfSection, SizeF } from '@syncfusion/ej2-pdf-export';
import { ToolbarService, ContextMenuService, EditorService, DocumentEditorContainerComponent, DocumentEditorKeyDownEventArgs, CharacterFormatProperties, SelectionChangeEventArgs, DocumentEditorComponent, SectionBreakType } from '@syncfusion/ej2-angular-documenteditor';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { saveAs } from "file-saver";
//import {
import { UUID } from "angular2-uuid";
import Swal from 'sweetalert2';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-export-student-answers',
  templateUrl: './export-student-answers.component.html',
  styleUrls: ['./export-student-answers.component.css']
})
export class ExportStudentAnswersComponent {
  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public container: DocumentEditorContainerComponent;
  selectedGrade: number;
  submitted = false;
  searchAnswersForm!: UntypedFormGroup;
  grades: Grade[] = [];
  filter: string;
  itemsPerPage = 10;
  selectedSubject: number;
  selectedSubjects: Subject[] = [];
  subjects: Subject[];
  selectedTestId: number;
  tests: Test[] = [];
  resulting:Resulting[]=[]; 
  regions: Region[] = [];
  //container: any;
  documentIds: number[] = []; 
  studentIds:number[]=[];
  testName: string;
  uuidValue: string;
  zipPathToDelete: string;

  constructor( 
    private gradeService: GradesService,
    public  paginationService: PaginationService,
    private subjectService: SubjectService,
    private testService:TestService, 
    private studentTestService: StudentsTestService,
    private formBuilder: UntypedFormBuilder,
    private regionService: RegionService,
    private sanitizer: DomSanitizer,
    ){}

    ngOnInit(): void {
        this.selectedGrade = JSON.parse(localStorage.getItem('currentgrade')); 
        this.getGrades(); 
        this.getRegions()
        this.initForms();
        this.selectedGrade = 0; 
    }

    get f() { return this.searchAnswersForm.controls; }

    private getGrades() {
      const moment = require('moment');
      this.gradeService.get()
      .subscribe((res) => {
        this.grades = res;
      });
    }

    public getSubjects = () => {
      this.subjectService.getByGradeId(this.selectedGrade)
        .subscribe((data) => {
          this.subjects = data;
        })
    }

    public onGradeChange(gradeId: number) {
      if (gradeId == 0)  return;
       this.selectedGrade = gradeId;
      this.subjectService.getByGradeId(gradeId)
      .subscribe((data) => {
      this.subjects = data;
      this.selectedGrade = gradeId;
       this.getTests(this.selectedGrade, 0); 
    })
    this.f.subjectId.get('subjectId').setValue(0);
  }

    public onChangeSubject(subjectId: number) { 
      this.selectedSubject = subjectId; 
      this.testService.getOTPTest(this.selectedGrade,subjectId).subscribe((res) => {
        this.tests = res;
        this.f.testId.get('testId').setValue(0);
      });
    }

    public onChangeTest = (testId:number) => {
      this.selectedTestId = testId;
    };

   private getRegions() {
    this.regionService.get()
      .subscribe((data) => {
        this.regions = data;
      })
  }

  public downloadAnswers(resulting:Resulting){
    this.studentTestService.downloadStudentAnswer(this.selectedTestId,resulting.studentID)
    .subscribe((data) => {
      
      this.convertSyncfusionBase64ToUrl(resulting.answer);
  })
}

 /*  public downloadAnswers(resulting:Resulting){
    this.studentTestService.downloadStudentAnswer(this.selectedTestId,resulting.studentID)
    .subscribe((data) => {
      
      //this.convertSyncfusionBase64ToUrl(resulting.answer);
      this.convertBase64ToUrl(resulting.answer)
  })
} */

  public convertSyncfusionBase64ToUrl(base64String: string)/* : SafeResourceUrl */ {
    const byteCharacters = atob(base64String);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    //this.saveSyncfusionBlob(blob); 
    this.downloadBlob(blob); 

  }  

  private saveSyncfusionBlob(blob: Blob){
    //(this.container.documentEditor as DocumentEditorComponent).save('sample', 'Docx');
    this.container.documentEditor.saveAsBlob('Docx').then((blob) => {
    /*this. container.documentEditor.saveAsBlob('Docx').then((blob: Blob) => {*/
      console.log('Saved sucessfully');
      let exportedDocument: Blob = blob;
    
    });  
    }


    
 /*  public downloadAnswers(resulting:Resulting) {
     
    this.studentTestService.downloadStudentAnswer(this.selectedTestId,resulting.studentID)
    .subscribe((data) => {
      
      this.convertBase64ToUrl(resulting.answer); 
      
    })
    
}; */
  
   public downloadAnswersPrevious(resulting:Resulting) {
  /*  this.studentTestService.downloadFile2(this.selectedTestId,resulting.studentID).subscribe(data => saveAs(data, 'Example.docx'));
  } */
    //return this.studentTestService.downloadStudentAnswer(this.selectedTestId,resulting.studentID), { responseType: 'blob' };
  
   //this.studentTestService.downloadStudentAnswer(this.selectedTestId,resulting.studentID)
    //this.testService.getUrl(`${resulting.studentID}/${this.selectedTestId}/get-studentanswer-file`)
   /*  .subscribe((data) => {
      console.log(data);
      console.log(resulting);
      this.convertBase64ToUrl(resulting.answer); 
      //this.dataURLtoFile(resulting.answer, "sample.docx")
       
    })
    */
};
 
private dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  this.downloadBlob(u8arr)
  return new File([u8arr], filename, {type:mime});
}

//Usage example:
//var file = dataURLtoFile('data:text/plain;base64,aGVsbG8=','hello.txt');
//console.log(file);



public downloadAnswersBulk() {
  //
 
  this.studentTestService.downloadStudentAnswerBulk(this.selectedTestId,this.studentIds)
  .subscribe((data) => {
  
            this.fileClientDownload(data, "testName")
; 
  })
  
}

public fileClientDownload(url, fileName){
  
  this.studentTestService.downloadFileToclient(url, fileName)
  .subscribe((data) => {
    this.convertZipBase64ToUrl(data.toString()); 
  
  })
}

async createZip(files: any[], zipName: string) {  
  
  const zip = new JSZip();  
  const name = zipName + '.zip';  
  for (let counter = 0; counter < files.length; counter++) {  
    const element = files[counter];  
    const fileData :any = this.convertBase64ToBlob(files.toString())
    const b: any = new Blob([fileData], { type: '' + fileData.type + '' });  
    zip.file(element.substring(element.lastIndexOf('/') + 1), b);  
  }  
  zip.generateAsync({ type: 'blob' }).then((fileData) => {  
    if (fileData) {  
      FileSaver.saveAs(fileData, name);  
    }  
  });  
}  


public convertBase64ToUrl(base64String: string): SafeResourceUrl {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  const url = URL.createObjectURL(blob);
  this.downloadBlob(blob)
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}  

public convertZipBase64ToUrl(base64String: string): SafeResourceUrl {
  this.zipPathToDelete = base64String; 
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'blob' });
  const url = URL.createObjectURL(blob);
  this.downloadZipBlob(blob);
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

public convertBase64ToBlob(base64String: string): Blob {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);

  }


  const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
 return blob; 

}  


public downloadBlob(blob, name = 'OfflineAnswersExported.docx') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  }

  generateUUID() {
    this.uuidValue = UUID.UUID();
    return this.uuidValue;
  }
  
  public downloadZipBlob(blob, name = this.testName+' '+this.generateUUID()+'.zip')  {
  this.testName+' '+this.generateUUID();
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

 /*  public DownloadStudentAnswers() { 
    let obj = this;
            let pdfdocument: PdfDocument = new PdfDocument();
            let count: number = obj.container.documentEditor.pageCount;
            obj.container.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
            let loadedPage = 0;
            for (let i = 1; i <= count; i++) {
              setTimeout(() => {
                let format: ImageFormat = 'image/jpeg' as unknown as ImageFormat;
                // Getting pages as image
                let image = obj.container.documentEditor.exportAsImage(i, format);
                image.onload = function () {
                  let imageHeight = parseInt(
                    image.style.height.toString().replace('px', '')
                  );
                  let imageWidth = parseInt(
                    image.style.width.toString().replace('px', '')
                  );
                  let section: PdfSection = pdfdocument.sections.add() as PdfSection;
                  let settings: PdfPageSettings = new PdfPageSettings(0);
                  if (imageWidth > imageHeight) {
                    settings.orientation = PdfPageOrientation.Landscape;
                  }
                  settings.size = new SizeF(imageWidth, imageHeight);
                  (section as PdfSection).setPageSettings(settings);
                  let page = section.pages.add();
                  let graphics = page.graphics;
                  let imageStr = image.src.replace('data:image/jpeg;base64,', '');
                  let pdfImage = new PdfBitmap(imageStr);
                  graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
                  loadedPage++;
                  if (loadedPage == count) {
                      // Exporting the document as pdf
                    pdfdocument.save(
                      (obj.container.documentEditor.documentName === ''
                        ? 'sample'
                        : obj.container.documentEditor.documentName) + '.pdf'
                    );
                  }
                };
              }, 500);
            }
  } 
 */
  private getTests(selectedGrade:number, subject:number) {
    this.studentIds = []; 
       
      this.testService.getOTPTest(selectedGrade,subject).subscribe((res) => {
        this.tests = res;
        this.f.testId.setValue(0);
        this.f.testId.get('testId').setValue(0);
      });
    }

    private initForms(): void {      
      this.searchAnswersForm = this.formBuilder.group({
        gradeId: [this.selectedGrade ?? 0, [Validators.required]],
        subjectId: [this.selectedSubject ?? 0, []],
        testId: [ this.selectedTestId ?? 0, [Validators.required]],
        testName: ['', []],
        regionId: [1?? 1, [Validators.required]],

      });
      this.submitted = false;  
    };

    public onSort( event: any) {
      
    }

    public onSubmit() { 
      this.submitted = true;
     

      if(this.searchAnswersForm.value.gradeId == 0){
        Swal.fire('Grade', 'Please select a grade', 'error')
    
        return;
      }

      if(this.searchAnswersForm.value.subjectId == 0){
        Swal.fire('Subject', 'Please select a subject', 'error')
    
        return;
      }
      if(this.searchAnswersForm.value.testId == 0){
        Swal.fire('Test', 'Please select a test', 'error')
    
        return;
      }
     console.log("searchAnswersForm Stringified", JSON.stringify(this.searchAnswersForm.value)); 
     console.log("searchAnswersForm" , this.searchAnswersForm.value)
      this.studentTestService.getStudentAnswerList(this.searchAnswersForm.value)
       .subscribe((data) => {
          this.resulting = data; 
          this.testName = this.resulting[0].testName;
          data.forEach(x => {
           this.studentIds.push(x.studentID); 
          });
          this.initForms();
       })
        
    }
}





