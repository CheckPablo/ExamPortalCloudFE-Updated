
import { Component,Input, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DataUrl,
  UploadResponse,
} from 'ngx-image-compress';
import { InTestWriteService } from 'src/app/core/services/shared/inTestWrite.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { UUID } from 'angular2-uuid';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
//import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {NgxImageCompressService} from 'ngx-image-compress';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
//import { ConsoleReporter } from 'jasmine';
@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.component.html',
  styleUrls: ['./scan-document.component.css']
})
export class ScanDocumentComponent {
  @ViewChild("spinnerLoaderModalScannedImage") content;
  @Input() testId?: number;
  @Input() studentId?: number;
  imgResultBeforeCompression: string = '';
  imgResultAfterCompression: string = '';
  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';
  imgResultAfterResize: DataUrl = '';
  imgResultUpload: DataUrl = '';
  imgResultAfterResizeMax: DataUrl = '';
  imgResultMultiple: UploadResponse[] = [];
  currentImage: File;
  scannedFiles: any[] = [];
  compressedScannedFiles: any[] = []
  isImageSelected: boolean = false;
  modalReference: NgbModalRef;
  isOtpResponse: boolean = false;
  uploading: boolean;
  imageFileName: any;
  scanResultOTP: string;

  resizedImage: string = '';
  compressedImage: string = '';
  selectedImage: string = '';
  croppedImage: string = '';
  selectedImageTrusted: SafeUrl = '';
  images: ScannedImage[] = [];
  image = new Image();
  angle = 0;
  imageId: number;
  canvas: HTMLCanvasElement;
  output?: NgxCroppedEvent;
  iosImageFile: File;
  localUrlIosImage: any;
  iosImage: any;
  sizeOfOriginalImage: number;
  localCompressedURl: string;
  sizeOFCompressedImage: number;
  localUrl: any;
  closeResult: string;
  spinnerDuration = 1500;
  PostSpinnerDuration = 3000;
  compressedImageTrusted: SafeUrl = '';


  constructor(private inTestWriteService: InTestWriteService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private sanitizer: DomSanitizer,
    private service: NgxPhotoEditorService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private imageCompress: NgxImageCompressService,
    private modalService: NgbModal,) {}

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    } 
  }

  public selectImage(imageId: number): void {
    this.imageId = imageId;
    this.isImageSelected = true; 
    
    this.service.open(this.images[imageId].src , {
      aspectRatio: 3/4,
      autoCropArea: 1,
      //applyBtnText :''
    }).subscribe(data => {
      this.output = data;
      this.images[imageId].file = data.file;
      this.images[imageId].src = data.base64;
    });
  };

    compressFileAlternative() {
      //this.imageId = imageId;
      //this.isImageSelected = true; 
      this.imageCompress.uploadFile().then(({image, orientation}) => {
          this.imgResultBeforeCompression = image;

          this.imageCompress
              .compressFile(image, orientation, 80, 80) // 50% ratio, 50% quality
              .then(compressedImage => {
                  const name =`${Date.now().toString() + UUID.UUID()}.jpeg`;
                  
                  const imageFile  = this.convertBase64ToFile(compressedImage)
                  this.compressedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(compressedImage);
                  this.images.push({safeSrc:this.compressedImageTrusted, src:compressedImage,name, isCompressed: true, file:imageFile});
                    
                   this.isImageSelected = true;
              });
           
      });
  }

  public convertBase64ToFile(base64String: string): File {
    const byteCharacters = atob(base64String.split(',')[1]);
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


    const blob = new Blob(byteArrays, { type: 'application/image/jpeg' });
    const url = URL.createObjectURL(blob);
    const file = new File([blob], 'converted_image.jpeg', { type: 'image/jpeg' });
    return file;
  }

 /*  public downloadBlob(blob: Blob, name = this.imageFileName) {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  } */


  open(content){
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });

    }

     closeSpinnerModal(modalReference)
    {
     modalReference.dismiss();
     this.isImageSelected = true;
    }
  
  uploadFiles() {

    //const studentTestData = { testId: 4383, studentId: 9477 };
    let studentTestData = { testId: this.testId, studentId: this.studentId };
     
    if(!studentTestData.testId || !studentTestData.studentId){
       studentTestData = { testId: 4407, studentId: 9504 };
       //4407 & 9504
    }
    let formData = new FormData();
    formData.append('data', JSON.stringify(studentTestData));
    
    
    this.images.forEach((image: ScannedImage) => {
    
      
      formData.append(`file`, image.file, image.name);
    });
    
    
    if (formData.getAll.length == 0) return;
    this.open(this.content)
    this.inTestWriteService.postUrl(`add-scannedimages`, formData)
      .subscribe((data) => {
        if (data.otp) {
          this.scanResultOTP = String(data.otp);
          this.isOtpResponse = true;
          timer(this.spinnerDuration).subscribe(()=>this.closeSpinnerModal(this.modalReference))
        }
        else {
          
        }
      });
  }

  deleteImage(id?: number ) {

     
    id = id || this.imageId;
    //if(id == null) return;
    
     
    this.images.splice(id, 1);
    this.imageId = null
    this.output = null;
  }
}

interface ScannedImage {
  safeSrc?: SafeUrl;
  src: string;
  name: string;
  isCompressed?: boolean;
  file?: File;
}


