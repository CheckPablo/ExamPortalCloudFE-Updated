import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { BulkImportService } from 'src/app/core/services/shared/bulkImportService';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
import { saveAs } from 'file-saver';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.css']
})
export class BulkImportComponent {

  selectedFile: any = null;
  excelFiles: ExcelFiles[] = [];
  selectedStudentsFile: any;
  selectedStudentsSubjectsFile: any;
  //bulkImportService: BulkImportService;
  formData = new FormData();
  batchGuidId: string = '';
  spinnerDuration = 2000;
  modalReference: NgbModalRef;
  closeResult: string;
  templateUrl: string;
  importFileName:string; 
  templateFileName:string; 
  urlSplit: string[];

  constructor(
    private bulkImportService: BulkImportService,
    private modalService: NgbModal,
    private http: HttpClient,
    //private fs:saveAs, 

  ) { }

  ngOnInit(): void {

  }

  onFilesSelected(event): void {
    const file = event.target.files[0];
    this.formData.append("file", file, file.name);
  }

  uploadExcelFiles(event): void {
    let batchGuid = document.getElementById('txtBatchGuid')['value']; // validate for empty
    this.formData.append("data", JSON.stringify(batchGuid));
    this.bulkImportService.postUrl('add-bulkImportFiles', this.formData)
      .subscribe((data) => {
        timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
        Swal.fire('Bulk Import Success', 'Bulk Import Successful.', 'success');
        if (data) {
         
          //timer(this.spinnerDuration).subscribe(()=>this.closeSpinnerModal(this.modalReference))
        }
        else {
          
        }
      });
    
  }

  getBatchID() {
    this.bulkImportService.postUrl(`get-batch-guidid`,"")
    .subscribe((data) => {
      if (data.batchId) {
        this.batchGuidId = data.batchId.batchId;
      }
      else {
        
      }
    });
  }


  RunTempTableImportProc(){
    //console.log(this.batchGuidId); 
    const payload = {
      BatchIdGuidId: this.batchGuidId,
      /*studentIds: this.studentIds,
      extraTimeIds: {...this.extraTimeIds},*/
    }
  /*   this.bulkImportService.postUrl(`insert-bulkImportFileData`,payload)
    .subscribe(() => {
      timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
      Swal.fire('Bulk Import Success', 'Bulk Import Successful.', 'success');
    /*   if (data.batchId) {
        this.batchGuidId = data.batchId.batchId;
      }
      else {
        
      } 
    }); */
    timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
      Swal.fire('Bulk Import Success', 'Bulk Import Successful.', 'success');
  }

  downloadSubjectSectorsImportTemplate() {
    this.urlSplit = []; 
    this.importFileName = "SubjectSectorsFile"; 
    const payload = {
      BulkImportTemplateUrl : this.importFileName
    }
    
    this.getTemplateUrl(payload); 
    }

    downloadStudentImportTemplate(){
      this.urlSplit = []; 
      this.importFileName= "StudentsImportFile"; 
        const payload = {
          BulkImportTemplateUrl : this.importFileName
        }
        
        this.getTemplateUrl(payload); 
      }

    
    downloadStudentTemplate() {
    /* const payload = {
      StudentsImportTemplate:"students import template"

    } */
        debugger;
        var headers = new Headers();
        headers.append('responseType', 'arraybuffer');
        const fileName = "tmp"; 
        //let url = new post('api/excelFile/test', environment.apiUrl);
        //window.location.href = `${environment.sebLaunchUrlSandboxWithS}api/InTestWrite/get-student-seb-mac-settings/${this.uniqueName}/${this.testId}/${this.user.id}/${this.testName}/${environment.domain}`;
      
          this.bulkImportService.getUrl(`download-student-template`)
            .subscribe((response) => {
              var url = window.URL.createObjectURL(response);
            window.open(url);
                //let file = new Blob([response.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                ///let fileName = response.headers.get('Content-Disposition').split(';')[1].trim().split('=')[1]; 
                
                const blob = new Blob([response], { type: 'application/octet-stream' });
                fs.saveAs(blob, fileName + '.xlsx');
               /*  const blob = new Blob([response.blob()], { type : 'application/vnd.ms.excel' });
                const file = new File([blob], fileName + '.xlsx', { type: 'application/vnd.ms.excel' }); */
                ///saveAs(file, fileName);
            },
            );

    
  /*     const button = document.getElementById('btn') as HTMLAnchorElement | null;
    if (button != null) {
        console.log(button.innerText);
    } */
    }
 
  
    getTemplateUrl(payload: { BulkImportTemplateUrl: string; }) {
     /*  const payload = {
        BulkImportTemplateUrl : this.importFileName
        
      } */
      this.bulkImportService.postUrl(`get-template-url`,payload)
      .subscribe((data) => {
        //console.log(data)
        this.templateUrl = data; 
        this.startDownload(this.templateUrl) 
      })
    
      };
    
    async startDownload(fileDownloadPath: string) {
      //console.log(this.importFileName);
      //if(fileDownloadPath.toString().indexOf('StudentsBulkImport')){
        this.setTemplateFileNames(this.importFileName)
    
      //this.fileUrl = fileDownloadPath; //"wwwroot/SiteDocument/SiteDemo1/FileDocument.doc" static file path
      this.DocumentsDownload(fileDownloadPath).subscribe(async (event) => {
          let data = event as HttpResponse <Blob> ;
          const downloadedFile = new Blob([data.body as BlobPart], {
              type: data.body?.type
          });
          //console.log("ddd", downloadedFile)
          if (downloadedFile.type != "") {
              const a = document.createElement('a');
              a.setAttribute('style', 'display:none;');
              document.body.appendChild(a);
              /* a.download = fileDownloadPath; */
              //a.download = 'fileDownloadPath.xlsx';
              a.download = this.templateFileName.toString();
              a.href = URL.createObjectURL(downloadedFile);
              a.target = '_blank';
              a.click();
              document.body.removeChild(a);
          }
      });
  }
  async setTemplateFileNames(importFileName: string) {
    if(this.importFileName == "StudentsImportFile"){
      this.templateFileName = 'Students Bulk Import Template.xlsx'
    }
    else{
      this.templateFileName = 'Subject Sectors Bulk Import Template.xlsx'
    }
    //throw new Error('Method not implemented.');
  }
  async setTemplateEndPoint(fileUrl: string) {
    console.log(JSON.stringify(fileUrl));
    //console.log(String(fileUrl));
    console.log(JSON.stringify(fileUrl).split('\\'));
    this.urlSplit = JSON.stringify(fileUrl).split('\\');
    fileUrl =  JSON.stringify(fileUrl); 
    console.log(fileUrl.toString);
  }
/* async setTemplateEndPoint(string: fileUrl){

}
 */


    DocumentsDownload(fileUrl: string) {
      this.setTemplateEndPoint(fileUrl);
      
      //alert(this.urlSplit.indexOf("StudentsBulkImport", 0))
      //alert('aaa ' +this.urlSplit.indexOf("StudentsBulkImport.xlsx", 1));
      //alert(this.urlSplit.indexOf("StudentsBulkImport.xlsx")); 
      //if(this.urlSplit.indexOf('StudentsBulkImport.xlsx'))
      //{
      //alert(this.urlSplit.lastIndexOf('SubjectSectorsBulkImport.xlsx"}'))
       //alert(this.urlSplit[18]); 
      //}
      
     //if(fileUrl.toString().indexOf('Students'))
     if(this.urlSplit.lastIndexOf('SubjectSectorsBulkImport.xlsx"}') == -1)
     {
      //alert("Go to student-template");
      console.log("download-student-template");
      return this.http.get(`${environment.apiUrl}api/BulkImport/download-student-template`, {
          reportProgress: true,
          observe: 'events',
          responseType: 'blob'
      });
    }

    else{
      //alert("Go to subjectsectors-template");
      console.log("download-subjectsectors-template"); 
      return this.http.get(`${environment.apiUrl}api/BulkImport/download-subjectsectors-template`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
    })
    }

  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, () => {
      this.closeResult = `Dismissed `;
    });
  }

  public closeSpinnerModal(modalReference) {
    modalReference.dismiss();
  }
  
}

interface ExcelFiles {
  src?: string;
  name: string;
  file?: File;
}



