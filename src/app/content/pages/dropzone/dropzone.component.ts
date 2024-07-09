import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
@Component({
    selector: 'app-dropzone',
    templateUrl: './dropzone.component.html',
    styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {
    public breadcrumb: any;
    @BlockUI('dropzoneGallery') blockUIDropzone: NgBlockUI;
    constructor() { }
    ngOnInit(): void {
        this.breadcrumb = {
       'mainlabel': 'Dropzone',
       'links': [
       {
        'name': 'Home',
        'isLink': true,
        'link': '/dashboard/sales'
        },
        {
                'name': 'Page',
                'isLink': true,
                'link': ''
            },
              {
                'name': 'Dropzone',
                'isLink': false
             }
            ]
        };
    }
    options = {
      close: true,
      expand: true,
      minimize: true,
      reload: true
    };
    files: File[] = [];
    SelectMultipleFile(event) {
        this.files.push(...event.addedFiles);
    }
     file: any;
      SelectSingleFile(event) {
        this.file = event.addedFiles;
    }
    MultiplefilesonRemove(event) {
      this.files.splice(this.files.indexOf(event), 1);
    }
    SinglefileonRemove(event) {
      this.file.splice(this.files.indexOf(event), 1);
    }
    reloadDorpzone() {
      this.blockUIDropzone.start('Loading..');
  
      setTimeout(() => {
        this.blockUIDropzone.stop();
      }, 2500);
    }
}
