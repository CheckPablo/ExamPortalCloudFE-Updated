import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/core/services/shared/student.service';
import { ToolbarService, ContextMenuService, EditorService, DocumentEditorContainerComponent,ImageFormat, DocumentEditorKeyDownEventArgs, dataFormatProperty} from '@syncfusion/ej2-angular-documenteditor';
import { StudentTestAnswerSave } from 'src/app/core/models/studentTestAnswerSave';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { InTestWriteService } from 'src/app/core/services/shared/inTestWrite.service';
import { TestService } from 'src/app/core/services/shared/test.service';
import Swal from 'sweetalert2';
import { PdfBitmap, PdfDocument, PdfPageOrientation, PdfPageSettings, PdfSection, SizeF } from '@syncfusion/ej2-pdf-export';
import { StudentTestWriteService } from 'src/app/core/services/shared/studentTestWrite.service';



@Component({
  selector: 'app-student-testanswer-management',
  templateUrl: './student-testanswer-management.component.html',
  styleUrls: ['./student-testanswer-management.component.css']
})
export class StudentTestanswerManagementComponent implements AfterViewInit{
  @ViewChild('documentEditorAnswersReadOnly') container: DocumentEditorContainerComponent;
  studentId: number;
  documentBase64: any;
  //documentBase64:string;
  testId: number;
  testName: string;
  readerResult: string;
  onkeydown: any;
  contentChanged: boolean;
  documentFromBase64: string;
  isAnswersUploaded:boolean = false; 
  isOfflineAnswersDeleted: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: TokenStorageService,
    private inTestWriteService: InTestWriteService,
    private testService: TestService,
    private studentsTestWriteService:StudentTestWriteService,
   
  ) {
    this.route.params
      .subscribe((p) => {
        this.testId = p['id']
        this.studentId = p['studentId']
        this.testName = p['testName']
        //this.loadOfflineDoc(); 
      })
  }

 public onContentChange(): void {
    //this.container.documentEditor.keyDown = this.onkeydown.bind(this);
    this.contentChanged = true;
  }

 public ngAfterViewInit(){

    var docData: any[]; 
    var TestOfflineData: any;
    this.container.toolbarItems = ["Undo", "Redo", "Table", "PageNumber", "Break", "Find"];
    this.container.showPropertiesPane = false;
    this.documentFromBase64 = localStorage.getItem('currentstudentanswerdockey'); 

      var str = localStorage.getItem('EncryptedAnswers: ' + `${this.testId}`);
      if (str !== null) {
        console.log(str); 
        console.log("checking answers here ViewInit");
        docData = str.split('||');
        TestOfflineData = docData[2];
        this.OfflineAnswers(TestOfflineData);
  }
  else{
     {
      console.log("answers found here");
      console.log(str); 
      this.checkLocalStorage(); 
       
     }
  }
}

public OfflineAnswers(iBlob: any) {
  var myBlob = iBlob;

  var documentData = {
      documentData: myBlob
  };

  var jsObject =
  {
      file: documentData.documentData,
      testId: this.testId
  };
  try{
  console.log(jsObject); 
  console.log("checking answers in offline method");
  this.testService.offlineTest(jsObject)
      .subscribe((data) => {
        console.log(data); 
        console.log("checking return from server here");
        this.container.documentEditor.enableEditor = false; 
        this.container.documentEditor.enableSpellCheck = false; 
        this.container.documentEditor.open(data);
        this.container.documentEditor.enableEditor = false;  
      })
  }
  catch (error) {
    console.error('Failed to decode base64 string:', error);
  }
}

  ngOnInit(): void {
  }

   public checkLocalStorage(){
      var str = localStorage.getItem('EncryptedAnswers: ' + `${this.testId}`);
      if (str !== null) {
        console.log(str); 
        console.log("checking answers here checkLocalStorage");
      }
     else{
      console.log(str); 
      console.log("checking answers here checkLocalStorage");
      this.isOfflineAnswersDeleted = true; 
      //this.isAnswersUploaded = true; 
       
      Swal.fire({
        title: '',
        text: 'There are no local answers found. However, answers have been saved in the database. Please complete your test by clicking the Finish button below',
        icon: 'info',
    })
    
    this.studentsTestWriteService.finishStudentTestPreviewPane(this.testId, this.studentId)
    .subscribe((data) => {
      if(data){
        console.log(data); 
        console.log("checking complete test status was successfully changed"); 
       }
       else{
          console.log("Error!, complete test status was not changed"); 
         }
    }); 
     this.router.navigate(["/portal"]); 
    }
  }

  public deleteOfflineAnswers(){
    Swal.fire({
      title: 'Delete offline answers?',
      text: "You are about to delete all offline answers. Would you like to proceed?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want to proceed!'
  }).then((result) => {
      if (result.value) {
        this.dbUploadDeleteOfflineAnswers();
        this.container.documentEditor.openBlank(); 
          Swal.fire(
              'Offline answers deleted!',
              'Your offline answers have been successfully deleted.',
              'success'
          );
          localStorage.removeItem('EncryptedAnswers: ' + this.testId);
          this.router.navigate(["/portal"]);
      }
      else{
        { 
          console.log("Delete canceled"); 
         return; 
        }
  }
      
  });

     
   
     
    //this.isOfflineAnswersDeleted = true; 
    this.container.documentEditor.enableEditor = false; 
    this.container.documentEditor.selection.selectAll(); 
    //return false; 
  }
  public dbUploadDeleteOfflineAnswers() :void {

    this.isAnswersUploaded = true; 
    
    if(!this.container){
      
    }
   
     var base64DataLocal: string | ArrayBuffer;
     var reader = new FileReader();
     var studentTestSave:StudentTestAnswerSave;
  
        studentTestSave = {
        id:this.testId,
        testId:this.testId,
        studentId:this.studentId,
        accomodation:true,
        fullScreenClosed:false,
        answerText:this.readerResult, 
        keyPress :false,
        offline:false,
        leftExamArea:false,
        fileName:"FileName",
        timeRemaining :"00:00",}
        
        
       this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
       let formData: FormData = new FormData();
       
       formData.append("file",exportedDocument,"TestId:"+ this.testId + "StudentID:"+this.studentId +'sample.docx');
       formData.append("data", JSON.stringify(studentTestSave));
          reader.readAsDataURL(exportedDocument);
            reader.onload = () => { 
            base64DataLocal = reader.result; 
            };
  
        this.inTestWriteService.postUrl(`upload-answer-document`, formData)
            .subscribe((data) => {
              if(data){
                console.log("Upload Answer Success"); 
               }
               else{
                  console.log("Upload Answers failed");
                 }
          }); 
      
          this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
            let formData: FormData = new FormData();
          formData.append("file",exportedDocument,"TestId:"+ this.testId + "StudentID:"+this.studentId + 'sample.docx');
          formData.append("data", JSON.stringify(studentTestSave));
          
        }
      )
      }
    )
  }
/*  public finishTestT = (testId:number, studentId:number): Observable<any> => {
    const payload = {testId,studentId}
    return this.postUrl('finish-test', payload);
    } */
  public finishTest(){
    this.studentsTestWriteService.finishTest(this.testId, this.studentId).subscribe((data) => {
      if(data){
      console.log(data);      
      Swal.fire(
      'Test Completed',
      'You have successfully completed your test. Return to the test list or close your browser.',
      'success'
      ); 
      setTimeout(() => {
        this.router.navigate(["/portal"]);
      }, 2000);
      //Swal.close(); 
        console.log("checking test was finished successfully"); 
        //this.isAnswersUploaded = true; 
       }
       else{
          console.log("checking if test was not completed successfully"); 
          //this.isAnswersUploaded = true; 
         }
  }); 
   /*  Swal.fire(
      'Test Completed',
      'You have successfully completed your test. Please return to the test list or close your browser.',
      'success'
  ); */
     /// this.router.navigate(["/portal"]);
  }



  public downloadOfflineAnswers(){
    
    this.saveAsBlob()
  }

  public dbUploadOfflineAnswers() :void {
    Swal.fire({
      title: 'Upload and Overwrite answers?',
      text: "You are about to overwrite any existing answers for this test with the below answers. Are you sure you want to proceed?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want to proceed!'
  }).then((result) => {
      if (result.value) {
        this.uploadOfflineAnswers(); 
        console.log(result.value); 
        this.isAnswersUploaded = true;
        Swal.fire('Offline Answers Uploaded', 'Answers have uploaded successfully', 'success');
      }
      else{
        console.log(result.value); 
        Swal.fire('Offline Answers Uploaded', 'Answers upload was unsuccessfully', 'error');
        return; 
        //this.isAnswersUploaded = false; 
        //result.dismiss
      }
  });
  
  
  }
  uploadOfflineAnswers() {

    if(!this.container){
    console.log("Container out of scope")
    }

     var answerDataLocal;
     var base64DataLocal;
     var reader = new FileReader();
     var studentTestSave:StudentTestAnswerSave;
  
        studentTestSave = {
        id:this.testId,
        testId:this.testId,
        studentId:this.studentId,
        accomodation:true,
        fullScreenClosed:false,
        answerText:this.readerResult, 
        keyPress :false,
        offline:false,
        leftExamArea:false,
        fileName:"FileName",
        timeRemaining :"00:00",}
        
       this.container.documentEditor.enableEditor = true; 
       this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
       let formData: FormData = new FormData();
       
       formData.append("file",exportedDocument,"TestId:"+ this.testId + "StudentID:"+this.studentId +'sample.docx');
       formData.append("data", JSON.stringify(studentTestSave));
          reader.readAsDataURL(exportedDocument);
            reader.onload = () => { 
            base64DataLocal = reader.result; 
            };
  
        this.inTestWriteService.postUrl(`upload-answer-document`, formData)
            .subscribe((data) => {
              if(data){
                console.log(data); 
                console.log("checking if an upload was made"); 
                this.isAnswersUploaded = true; 
               }
               else{
                  console.log("no uploads are being made"); 
                  //this.isAnswersUploaded = true; 
                 }
          }); 

        this.studentsTestWriteService.finishStudentTestPreviewPane(this.testId, this.studentId)
          .subscribe((data) => {
            if(data){
              console.log(data); 
              console.log("checking complete test status was successfully changed"); 
             }
             else{
                console.log("Error!, complete test status was not changed"); 
               }
          }); 
       
          this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
          let formData: FormData = new FormData();
          formData.append("file",exportedDocument,"TestId:"+ this.testId + "StudentID:"+this.studentId + 'sample.docx');
          formData.append("data", JSON.stringify(studentTestSave));
          this.container.documentEditor.enableEditor = false; 
          
        }
      )
      }
    )
  }

    public saveAsBlob() :void {
      let obj = this;
              let pdfdocument: PdfDocument = new PdfDocument();
              let count: number = obj.container.documentEditor.pageCount;
              obj.container.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
              let loadedPage = 0;
              for (let i = 1; i <= count; i++) {
                setTimeout(() => {
                  let format: ImageFormat = 'image/jpeg' as ImageFormat;
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
    
    ngOnDestroy(){
      this.isAnswersUploaded = false; 
    }
}  


