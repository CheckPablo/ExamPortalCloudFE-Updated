import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  forwardRef,
} from "@angular/core";
import { GradesService } from "src/app/core/services/shared/grades.service";
import { Grade } from "src/app/core/models/grade";
import { Language } from "src/app/core/models/language";
import { LanguageService } from "src/app/core/services/shared/language.service";
import {
  FormArray,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginationService } from "src/app/core/services/pagination.service";
import { SubjectService } from "src/app/core/services/shared/subject.service";
import { Subject } from "src/app/core/models/subject";
import { Student } from "src/app/core/models/student";
import { Test } from "src/app/core/models/test";
import { TestCategory } from "src/app/core/models/testCategory";
import { TestCategoryService } from "src/app/core/services/shared/testCategory.services";
import { TestSecurityLevel } from "src/app/core/models/testSecurityLevel";
import { TestSecurityLevelService } from "src/app/core/services/shared/testSecurityLevel.service";
import { TestType } from "src/app/core/models/testType";
import { TestTypeService } from "src/app/core/services/shared/testType.Service";
import { TestService } from "src/app/core/services/shared/test.service";
import Swal from "sweetalert2";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from "ngx-perfect-scrollbar";
//import { BlockUI, NgBlockUI } from "primeng/blockui";
import {
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  TextSearchService,
  TextSelectionService,
  PrintService,

} from "@syncfusion/ej2-angular-pdfviewer";
import { PdfViewerComponent } from '@syncfusion/ej2-angular-pdfviewer';
import { environment } from "src/environments/environment";
import { DatePipe, DecimalPipe } from "@angular/common";
import * as moment from 'moment';
import { TableService } from "src/app/core/services/table.service";
import { Observable } from "rxjs";
import { AdvancedSortableDirective } from "src/app/core/directives/advanced-sortable.directive";
import { UploadedSourceDocument } from "src/app/core/models/uploadedSourcDocument";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Buffer } from "buffer";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { DocumentEditorContainerComponent } from "@syncfusion/ej2-angular-documenteditor";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { BlockUI } from "primeng/blockui";
import { date } from "ngx-custom-validators/src/app/date/validator";

declare var window: any;

export const DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestUploadComponent),
  multi: true,
};

@Component({
  selector: "app-test-upload",
  templateUrl: "./test-upload.component.html",
  styleUrls: ["./test-upload.component.css"],

  /* <ejs-pdfviewer id="pdfViewer" [serviceUrl]='hostedUrl' [documentPath]='localBase64Url' [initialRenderPages]='initialRender'  style="height:800px;display:block"></ejs-pdfviewer>*/
  providers: [
    DATE_TIME_PICKER_CONTROL_VALUE_ACCESSOR,
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    TableService,
    DecimalPipe,
    //changeDetection: ChangeDetectionStrategy.OnPush,, 
  ],
})
export class TestUploadComponent {

  public hostedUrl = environment.syncfusionHostedUrl;
  /*  @BlockUI("simpleDatepicker") blockUISimpleDatepicker: BlockUI;
   @BlockUI("disableDatepicker") blockUIDisableDatepicker: BlockUI; */
  @ViewChild("simpleDatepicker") blockUISimpleDatepicker: BlockUI;
  @ViewChild("disableDatepicker") blockUIDisableDatepicker: BlockUI;
  @ViewChild('pdfViewer') public pdfViewer: PdfViewerComponent;
  @ViewChild('pdfViewerSourcePdf') public pdfViewerSourcePdf: PdfViewerComponent;
  @ViewChild('audioTag') audioTag: ElementRef;
  @ViewChild('documentEditorAnswerUpload') public container: DocumentEditorContainerComponent;
  @ViewChild("spinnerLoaderModal") content;
  //@ViewChild("spinnerLoaderModal",{static:true}) content:ElementRef
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarComponent)
  componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true })
  directiveRef?: PerfectScrollbarDirective;
  @Input() placeholder: string;
  selectedFile: any = null;
  audioSource = '';
  durations: any[] = [];
  grades: Grade[] = [];
  isAllSelected = false;
  extraTimeDurations: any[] = [];
  itemsPerPage = 10;
  languages: Language[] = [];
  loading = false;
  selectedCenterTest: number;
  selectedGrade: number;
  securityLevels: TestSecurityLevel[] = [];
  studentList: any[] = [];
  selectedUser: any;
  selectedSubject: number;
  studentSubjects: Subject[] = [];
  subjects: Subject[];
  links: any[] = [];
  //studentIds: number[] = [];
  studentIds = new Set();
  submitted = false;
  isLoading = false;
  selectedTestId: number;
  testCategories: TestCategory[] = [];
  testId?: string;
  testTypes: TestType[] = [];
  fileUrl?: string;
  activeTabId = 1;
  active: number;
  testInformationForm!: UntypedFormGroup;
  students: Student[] = [];
  returnUrl: string;
  pageNumber = 1; s
  error!: any;
  pdfUrl: any;
  test: Test;
  tables$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  state: boolean = false;
  //accomodationIds: number[] = [];
  //readerIds: number[] = [];
  extraTimeIds: Record<number, string> = {};
  accomodationIds = new Set();
  readerIds = new Set();
  sourceDocs: UploadedSourceDocument[] = [];
  answerDocs: UploadedSourceDocument[] = [];
  base64String = ''
  sourceDocBase64: string | null; 
  showWordPreview: boolean;
  selectedMP3Id?: number;
  docsTabDisabled: boolean;
  checkList: any;
  subjectId: number = 0;
  defaultExtraTime = '00:00:00';
  defaultSelect: any;
  localBase64Url: string;
  initialRender = 3;
  isAnswerFileUpload: boolean = false;
  spinnerDuration = 2000;
  formModal: any;
  closeResult: string;
  modalReference: NgbModalRef;
  navs = [1, 2, 3, 4, 5];
  counter = this.navs.length + 1;

  close(event: MouseEvent, toRemove: number) {
    this.navs = this.navs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.navs.push(this.counter++);
    event.preventDefault();
  }
  constructor(

    public service: TableService,
    private gradeService: GradesService,
    private router: Router,
    private route: ActivatedRoute,
    public paginationService: PaginationService,
    private languageService: LanguageService,
    private testTypeService: TestTypeService,
    private testSecurityLevelService: TestSecurityLevelService,
    private testCategoryService: TestCategoryService,
    private subjectService: SubjectService,
    private testService: TestService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private storageService: TokenStorageService,
    private modalService: NgbModal,

  ) {
    this.route.params.subscribe((p) => {
      this.testId = p["id"];


      this.selectedTestId = p["id"];
      this.getSingleTest();
      this.getSourceDocuments();
      this.getAnswerDocuments();

    });
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {

    this.service.setData([]);
    this.getGrades();
    this.getLanguages();
    this.getTestTypes();
    this.getTestSecurityLevels();
    this.getTestCategories();
    this.initForms();


    this.selectedGrade = 0;
    this.generateTimeDurations();
    this.getAnswerDocuments();
    this.getSourceDocuments();
    this.toggleDocTabsEnabled();
    const today = moment().startOf('day')
    this.generateExtraTimeDurations()
  }

  get f() { return this.testInformationForm.controls; }

  get ordersFormArray() {
    return this.testInformationForm.controls.orders as FormArray;
  }

  convertBase64ToUrl(base64String: string): SafeResourceUrl {
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
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private generateExtraTimeDurations = () => {

    const increment = 5;

    for (let minutes = increment; minutes <= 1 * 60; minutes += increment) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

      const value = `${formattedHours} hrs : ${formattedMinutes} min`;
      const key = `${formattedHours}:${formattedMinutes}:00`;

      this.extraTimeDurations.push({ key, value });
      /*
      */
    }
  };

  convertBase64ToUrlBlob(base64String: string): SafeResourceUrl {
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
    const blob = new Blob(byteArrays, { type: 'audio/ogg' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  convertDataURIToBinary(dataURI) {
    dataURI = 'data:audio/ogg;base64,' + dataURI;


    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.toString().indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.toString().substring(base64Index);


    const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary')
    var raw = decode(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }


  private generateTimeDurations = () => {
    const increment = 15;

    for (let minutes = increment; minutes <= 24 * 60; minutes += increment) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

      const value = `${formattedHours} hrs : ${formattedMinutes} min`;
      const key = `${formattedHours}:${formattedMinutes}:00`;

      this.durations.push({ key, value });
    }
  };

  private getGrades() {
    const moment = require("moment");
    const today = moment();
    this.gradeService.get().subscribe((res) => {
      this.grades = res;
    });
  }

  private getAnswerDocuments = () => {
    if (this.testId.includes("test-upload")) return;
    if (!this.testId) return;
    //this.loadAnswerDoc();
    this.testService.getUrl(`${this.testId}/get-answer-documents`)
      .subscribe((data) => {
        this.answerDocs = data;
        
        this.loadAnswerDoc();
      })

  }

  public loadAnswerDoc(): void {
    this.testService.getUrl(`${this.testId}/get-answer-file`).
      subscribe((data) => {
         
        this.loadDocument(JSON.stringify(data));

      })
  }

  private loadDocument(documentBase64: string): void {
    try {
      this.container.documentEditor.enableEditor = false;
      this.container.documentEditor.enableSpellCheck = false;
      this.container.documentEditor.open(documentBase64);
      this.container.documentEditor.enableEditor = false;

    } catch (error) {
      console.error('Failed to decode base64 string:', error);
    }
  }

  public getAudioUrl(): string {

    if (!this.selectedMP3Id) return;
    return `https://localhost:7066/api/Tests/get-audio-file/${this.selectedMP3Id}`;
  }

  private getLanguages() {
      this.languageService.get().subscribe((res) => {
      this.languages = res;
    });
  }

  private getUploadedTest() {

    if (this.testId.includes("test-upload")) return;
    if (!this.testId) return;

    //this.testService.getUrl(`get-test-with-file/${this.testId}`)
 /*    this.testService.getUrl(`get-dbtest-with-file/${this.testId}`)
      .subscribe((data) => {
        this.test = data.test;
        if (!this.subjects) {
          if (data.test) {
            this.onGradeChange(data.test.sectorId, data.test.subjectId)
          }
        } */

      /*   this.initForms(data.test);
        if (data.file) {

          const base64Url = 'data:application/pdf;base64,' + data.file;
          this.localBase64Url = 'data:application/pdf;base64,' + data.file;
          this.storageService.saveCurrentTestPreview(base64Url);

          if (!this.localBase64Url) {
            this.pdfViewer.documentPath = this.localBase64Url;
          }
          else {
            this.pdfViewer.documentPath = this.localBase64Url;
          }
          this.pdfViewer.enableHyperlink = false;
          this.pdfViewer.enablePersistence = true;
          if (!this.docsTabDisabled) return;
        } 
      });*/
  }

  private getSingleTest() {

    if (this.testId.includes("test-upload")) return;
    if (!this.testId) return;

    this.testService.getUrl(`get-test-with-file/${this.testId}`)
    //this.testService.getUrl(`get-dbtest-with-file/${this.testId}`)
      .subscribe((data) => {
        this.test = data.test;
        console.log(this.test); 
        console.log(data); 
        if (!this.subjects) {
          if (data.test) {
            this.onGradeChange(data.test.sectorId, data.test.subjectId)
          }
        }

        this.initForms(data.test);
        if (data.file) {

          const base64Url = 'data:application/pdf;base64,' + data.file;
          this.localBase64Url = 'data:application/pdf;base64,' + data.file;
          this.storageService.saveCurrentTestPreview(base64Url);

          if (!this.localBase64Url) {
            this.pdfViewer.documentPath = this.localBase64Url;
          }
          else {
            this.pdfViewer.documentPath = this.localBase64Url;
          }
          this.pdfViewer.enableHyperlink = false;
          this.pdfViewer.enablePersistence = true;
          if (!this.docsTabDisabled) return;
        }
      });
  }

  private getSourceDocuments = () => {

    if (this.testId.includes("test-upload")) return;
    if (!this.testId) return; // this line alone could be checking for null and undefined? Remove line 271 if 270 works fine (Tinashe ToDO)
    if (this.testId == null || this.testId == undefined) return;
    this.testService.getUrl(`${this.testId}/get-source-documents`)
      .subscribe((data) => {
        this.sourceDocs = data;
        this.sourceDocs.some(sourceDoc => {
          if (sourceDoc.fileName.includes("pdf") || sourceDoc.fileName.includes("PDF") || sourceDoc.fileName.includes('pdf') || sourceDoc.fileName.includes('PDF')) {
          
            this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
              .subscribe((data) => {
                const base64Url = 'data:application/pdf;base64,' + data.file;
                this.pdfViewerSourcePdf.load(base64Url, '');
                this.pdfViewerSourcePdf.enableHyperlink = false;
                return true;

              })
          }

          if (sourceDoc.fileName.includes("docx") || sourceDoc.fileName.includes("DOCX") || sourceDoc.fileName.includes('docx') ||
            sourceDoc.fileName.includes('DOCX')) {
            this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
              .subscribe((data) => {
                const base64Url = 'data:application/pdf;base64,' + data.file;
                this.pdfViewerSourcePdf.load(base64Url, '');
                this.pdfViewerSourcePdf.enableHyperlink = false;
                return true;

              })
          }

        })

      });
  }

  private getTestCategories() {
    this.testCategoryService.get().subscribe((res) => {
      this.testCategories = res;
    });
  }

  private getTestSecurityLevels() {
    this.testSecurityLevelService.get().subscribe((res) => {
      this.securityLevels = res;
    });
  }

  private getTestTypes() {
    this.testTypeService.get().subscribe((res) => {
      this.testTypes = res;
    });
  }


  public hasAccomodation(studentId: number): boolean {
    //return (this.accomodationIds.some(x => x === studentId))
    return (this.accomodationIds.has(studentId))
  }

  public hasReader(studentId: number): boolean {
    //return (this.readerIds.some(x => x === studentId))
    return (this.readerIds.has(studentId))
  }

  private initForms(test?: Test): void {

    const examDate = (!test) ? '' : this.datePipe.transform(test.examDate, 'yyyy-MM-dd HH:mm');
    const expiryDate = (!test) ? '' : this.datePipe.transform(test.paperExpiryDate, 'yyyy-MM-dd HH:mm');


    const grade = test?.sectorId ?? '';
    const testId = test?.id ?? 0;
    this.selectedTestId = testId;
    this.selectedSubject = test?.subjectId;
    this.testInformationForm = this.formBuilder.group({
      id: [test?.id ?? '0', [Validators.required]],
      sectorId: [test?.sectorId ?? '', [Validators.required]],
      subjectId: [test?.subjectId ?? '', [Validators.required]],
      languageId: [test?.languageId ?? '', [Validators.required]],
      testTypeId: [test?.testTypeId ?? '', [Validators.required]],
      testCategoryId: [3 ?? 3, [Validators.required]],
      testName: [test?.testName ?? '', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]],
      code: [test?.code ?? '', [Validators.required]],
      tts: [test?.tts ?? false],
      paperExpiryDate: [expiryDate, [Validators.required]],
      testDuration: [test?.testDuration ?? '', [Validators.required]],
      testSecurityLevelId: [test?.testSecurityLevelId ?? '', [Validators.required],],
      examDate: [examDate, [Validators.required]],
      answerScanningAvailable: [test?.answerScanningAvailable ?? false],
      workOffline: [test?.workOffline ?? true],
      file: [null, []],
      //defaultExtraTime: ['', []],
    });

    if (grade != '') {

      this.populateStudentList(grade, 0, testId);
      this.selectedGrade = grade;
      this.selectedTestId = testId;
    }

    this.selectedFile = null;
    this.submitted = false;
  }

  public isStudentSelected(studentId: number): boolean {
    //return (this.studentIds.some(x => x === studentId))
    return (this.studentIds.has(studentId))
  }


  public onAnswerDocumentDelete(doc: UploadedSourceDocument) {
    this.testService.deleteUrl(`${doc.id}/answer-document`)
      .subscribe(() => {
        Swal.fire('Delete Document', 'The answer document has been deleted', 'success')
        this.getSourceDocuments()
      })
  }

/*   public onAnswerFileSelected(event): void {
    const file = event.target.files[0];
    if (file) {
      this.open(this.content)
      const formData = new FormData();

      formData.append("file", file, file.name);
      this.testService.postUrl(`${this.testId}/upload-answer-document`, formData)
        .subscribe((data) => {
          console.log(data); 
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          this.answerDocs = data;
          this.loadDocument(data.answerDocBase64);
          //this.getAnswerDocuments();
          Swal.fire("Answer Document", "The answer document has been uploaded.", "success");
        }, (err) => console.error(err),
          () => console.log("observable complete"));
    }
  } */

    public onAnswerFileSelected(event): void {
      const file = event.target.files[0];
  
      if (file) {
        this.open(this.content)
        const formData = new FormData();
  
        formData.append("file", file, file.name);
        this.testService.postUrl(`${this.testId}/upload-answer-document`, formData)
          .subscribe((data) => {
  
            timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
            this.getAnswerDocuments();
            Swal.fire("Answer Document", "The answer document has been uploaded.", "success");
          }, (err) => console.error(err),
            () => console.log("observable complete"));
      }
    }

  public onGradeChange(gradeId: number, subjectId: number = 0) {
    this.subjectService.getByGradeId(gradeId).subscribe((data) => {
      this.subjects = data;
      this.selectedSubject = subjectId;
      this.testInformationForm.controls['subjectId'].setValue(this.test?.subjectId);
      this.selectedGrade = gradeId;
      this.populateStudentList(gradeId,0,this.selectedTestId);
    });
  }
  public onChangeSubject(subjectId: number) {
    this.selectedSubject = subjectId;
  }

  public toggleDocTabsEnabled() {
    if (!this.testId || typeof this.testId == "undefined" || this.testId == "test-upload" || this.testId == 'test-upload') {

      this.docsTabDisabled = false;

      return true;
    }
    else {
      this.docsTabDisabled = true;
      return false;
    }

  }

  public onDeleteTest(test: Test) {
    Swal.fire({
      title: 'Delete Test',
      text: 'The test will be deleted permanently. Do you wish to proceed?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.testService.delete(test.id)
          .subscribe(() => {
            this.router.navigate(['/portal/testupload/view-tests']);
            Swal.fire('Test Deleted', 'Test deleted successfully.', 'success');
          });
      }
    });
  }

  public onFileSelected(event): void {
    const file = event.target.files[0];
    var type = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);

    if (file) {
      if (type == 'doc' || type == 'docx') {
        this.selectedFile = file;
        //this.onSubmit(event);
        this.uploadTestDoc(event);
      }
      else {
        this.selectedFile = file;
        this.uploadTestDoc(event);
        //this.onSubmit(event);
      }
    }
  }
  uploadTestDoc(event: any) {
    const formData = new FormData();
    if (this.selectedFile) {// adds a file
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("data", JSON.stringify(this.testInformationForm.value));
      this.testService.postUrl('add-questionpaper', formData)
      .subscribe((data) => {
        console.log(data); 
        console.log(data.testDocBase64); 
        console.log(data.testDocument);
        console.log(data[0].testDocBase64); 
        console.log(data[0].testDocument); 
        //this.test = data.test;
        //this.initForms(data.test);
        const base64Url = 'data:application/pdf;base64,' + data[0].testDocBase64;
        this.localBase64Url = 'data:application/pdf;base64,' + data[0].testDocBase64;
        this.storageService.saveCurrentTestPreview(base64Url);

        if (!this.localBase64Url) {
          this.pdfViewer.documentPath = this.localBase64Url;
        }
        else {
          this.pdfViewer.documentPath = this.localBase64Url;
        }
        this.pdfViewer.enableHyperlink = false;
        this.pdfViewer.enablePersistence = true;
        //this.getUploadedTest(); 
        location.reload(); 
        Swal.fire(
          "Test document uploaded.",
          "Test document uploaded suceccsfully.",
          "success"
        );
        //preview here; 
        this.router.navigate(['/portal/testupload', data.id])
        //this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
     
         //this.getSingleTest(); 
      });
  }}

  onPostWordDoc(event): void {
    if (this.testInformationForm.invalid) return;
    const file = event.target.files[0];
    this.selectedFile = file;
    var type = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
  }

  public onSourceDocumentDelete(doc: UploadedSourceDocument) {
    this.testService.deleteUrl(`${doc.id}/source-document`)
      .subscribe(() => {
        Swal.fire('Delete Document', 'The source document has been deleted', 'success')
        this.getSourceDocuments()
      })
  }

  public onSourceFileSelected(event): void {
    const file = event.target.files[0];
    if (file) {
      this.open(this.content)
      const formData = new FormData();

      formData.append("file", file, file.name);
      this.testService.postUrl(`${this.testId}/upload-source-document`, formData)
        .subscribe((data) => {
          console.log(data); 
          this.sourceDocs = data;
          //const base64Url = 'data:application/pdf;base64,' + data.file;
          console.log(data.length-1)
          /*console.log(data.length-1)
          var latestSourceDocBase64 = data[data.length-1];
          console.log(latestSourceDocBase64);
          const base64Url = 'data:application/pdf;base64,' + latestSourceDocBase64.sourceDocBase64;*/
          const base64Url = 'data:application/pdf;base64,' + data[0].sourceDocBase64;
          this.pdfViewerSourcePdf.load(base64Url, '');
          this.pdfViewerSourcePdf.enableHyperlink = false;
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          Swal.fire("Source Document", "The source document has been uploaded.", "success");
          /*this.sourceDocs.some(sourceDoc => {
            if (sourceDoc.fileName.includes("pdf") || sourceDoc.fileName.includes("PDF") || sourceDoc.fileName.includes('pdf') || sourceDoc.fileName.includes('PDF')) {
            
              this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
                .subscribe((data) => {
                  const base64Url = 'data:application/pdf;base64,' + data.file;
                  this.pdfViewerSourcePdf.load(base64Url, '');
                  this.pdfViewerSourcePdf.enableHyperlink = false;
  
                  return true;
                })
  
  
            }
  
            if (sourceDoc.fileName.includes("docx") || sourceDoc.fileName.includes("DOCX") || sourceDoc.fileName.includes('docx') ||
              sourceDoc.fileName.includes('DOCX')) {
              this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
                .subscribe((data) => {
                  const base64Url = 'data:application/pdf;base64,' + data.file;
                  this.pdfViewerSourcePdf.load(base64Url, '');
                  this.pdfViewerSourcePdf.enableHyperlink = false;
                  return true;
                })
  
  
            }
  
          })*/
          
          //this.getSourceDocuments();
        });
    }
  }

/*   public onStudentAccomodationClick(studentId: number) {
    console.log("ALERT LINE NEAR 680","onStudentAccomodationClick")
    if (this.accomodationIds.find(x => x == studentId)) {
      this.accomodationIds = this.accomodationIds.filter(x => x != studentId)
    } else {
      this.accomodationIds.push(studentId);
      console.log("ALERT LINE NEAR 685","onStudentAccomodationClick")
    }
  } */

  public onStudentAccomodationClick(studentId: number) {
    console.log(this.accomodationIds)
    if (this.accomodationIds.has(studentId)) {
      this.accomodationIds.delete(studentId)
    } else {
      //this.accomodationIds.push(studentId);
      this.accomodationIds.add(studentId);
    }
    console.log(this.accomodationIds)
  }


  checkAllCheckBox(ev: any) { // Angular 13
    this.links.forEach(x => x.checked = ev.target.checked)
    console.log("ALERT LINE NEAR 691","checkAllCheckBox")
  }

  isAllCheckBoxChecked() {
    const checkbox = document.getElementById(
      'cbxCheckStudentLink',
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      checkbox.checked = true;
    }
    else {

    }
  }

  isAllReaderBoxChecked() {
    const checkbox = document.getElementById(
      'cbxCheckStudentReaderLink',
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      checkbox.checked = true;
    }
    else {

    }
  }

  isAllAccomodationBoxChecked() {
    const checkbox = document.getElementById(
      'cbxCheckStudentAccomdationLink',
    ) as HTMLInputElement | null;
    if (checkbox != null) {


      checkbox.checked = true;

    }
    else {

    }
  }

  public onChangeExtraTime(event: Event, studentId: number): void {

  }

  /* public onSelectAll() {
    this.isAllSelected = !this.isAllSelected;

    this.studentIds = [];
    if (this.isAllSelected) {
      this.studentIds = this.links.map((x, _) => x.studentID)
    }

  } */

  public onSelectAll() {
    this.isAllSelected = !this.isAllSelected;
    this.studentIds.clear();
    if (this.isAllSelected) {
      const studentIds = this.links.map((x, _) => x.studentID)
      this.studentIds = new Set(studentIds);
    }

  }

 /*  public onStudentClick(studentId: number) {
    if (this.studentIds.find(x => x == studentId)) {
      this.studentIds = this.studentIds.filter(x => x != studentId)
    } else {
      this.studentIds.push(studentId);
    }
  } */

  public onStudentClick(studentId: number) {
    if (this.studentIds.has(studentId)) {
      this.studentIds.delete(studentId);
    } else {
      this.studentIds.add(studentId);
    }
  }

/*   public onStudentReaderClick(studentId: number) {
    if (this.readerIds.find(x => x == studentId)) {
      this.readerIds = this.readerIds.filter(x => x != studentId)
    } else {
      this.readerIds.push(studentId);
    }
  } */
  public onStudentReaderClick(studentId: number) {
    console.log("On Student Reader Click Before", this.readerIds); 
    if (this.readerIds.has(studentId)) {
      this.readerIds.delete(studentId);
    } else {

      this.readerIds.add(studentId);
    }
    console.log("On Student Reader Click After ",this.readerIds); 
  }

  public onSubmit(event: MouseEvent) {
    this.submitted = true;
    this.isLoading = true;
    if (this.testInformationForm.invalid) return;

    const today = moment().startOf('day');
    const examDate = moment(this.testInformationForm.get('examDate').value);
    const paperExpiryDate = moment(this.testInformationForm.get('paperExpiryDate').value);

    if (!this.testId) { //validations and saving of new test

      if (paperExpiryDate.isBefore(examDate) && paperExpiryDate.isBefore(moment())) {
        Swal.fire('Error', 'Paper expiry date must be greater than or equal to the exam date.', 'error');
        return;
      }

      const formData = new FormData();
      if (this.selectedFile) {// adds a test with a file
        formData.append("file", this.selectedFile, this.selectedFile.name);
        formData.append("data", JSON.stringify(this.testInformationForm.value));
        this.testService.postUrl('add-test', formData)
          .subscribe((data) => {
            Swal.fire(
              "Test document uploaded.",
              "Test document uploaded suceccsfully.",
              "success"
            );

            this.router.navigate(['/portal/testupload', data.id])
            this.selectedGrade = data.sectorId
            this.selectedCenterTest = data.centerId
            this.selectedTestId = data.id
            this.testId = data.id.toString();
            /*
            */
          });

        this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
        /* 
        */

      }

      if (!this.selectedFile) {// adds a test without a file

        this.testService.create(this.testInformationForm.value)
          .subscribe((data) => {
            console.log(data);

            Swal.fire(
              "Test Information Saved",
              "Test Information Saved.",
              "success"
            );
            this.test = data;
            this.initForms(data);
            this.selectedGrade = data.sectorId
            this.selectedCenterTest = data.centerId
            this.selectedTestId = data.id
            this.testId = data.toString();
            this.router.navigate(['/portal/testupload', data.id])
           
            this.toggleDocTabsEnabled();
          });
        this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
        /**/

      }
    }
    /*validations and test updating of an existing test*/
    else {
      const formData = new FormData(); //This is declared twice, it can be declared once. 
      if (!this.selectedFile) {



        formData.append("data", JSON.stringify(this.testInformationForm.value));
        this.testService.postUrl('add-test', formData)
          .subscribe((data) => {
            if (this.testId && this.testId != 'test-upload') {


              Swal.fire(
                "Test Information Saved",
                "Test information Saved.",
                "success"
              );
              /**/
            }
            else {
              /**/
              Swal.fire(

                "Test Information Saved",
                "Test information saved.",
                "success"
              );
              /* */
            }

            this.selectedGrade = data.sectorId
            this.selectedCenterTest = data.centerId
            this.selectedTestId = data.id
            this.testId = data.id.toString();
            this.router.navigate(['/portal/testupload', this.testId])
            this.toggleDocTabsEnabled();
          });
        this.isLoading = false;
        this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
      }
      else {
        this.open(this.content);
        formData.append("file", this.selectedFile, this.selectedFile.name);
        formData.append("data", JSON.stringify(this.testInformationForm.value));
        this.testService
          .postUrl('add-test', formData)
          .subscribe((data) => {
            Swal.fire(
              "Test Information Saved",
              "Test information Saved.",
              "success"
            );

            this.router.navigate(['/portal/testupload', data.id])
            this.selectedGrade = data.sectorId
            this.selectedCenterTest = data.centerId
            this.selectedTestId = data.id
            this.testId = data.id.toString();

            //this.getSingleTest();
            this.getUploadedTest();
          });
        this.isLoading = false;
        timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
        // timer(this.spinnerDuration).subscribe(this.closeSpinnerModal);
        //this.closeSpinnerModal();
        this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
      }
    }
    this.populateStudentList(this.selectedGrade, 0, this.selectedTestId);
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });

  }

  public closeSpinnerModal(modalReference) {
    modalReference.dismiss();
  }

  public onTestLinkClick() {
    // Show dialog for user to confirm linking

    const payload = {
      testId: this.testId,
/*       studentIds: this.studentIds,
      readerIds: this.readerIds,
      accomodationIds: this.accomodationIds, */
      studentIds: Array.from(this.studentIds),
      readerIds: Array.from(this.readerIds),
      accomodationIds: Array.from(this.accomodationIds),
      extraTimeIds: { ...this.extraTimeIds },
    }
    console.log('ReaderIDS onTestLinkClick button clicked '+'   + onTestLinkClick', this.readerIds);
    console.log('AccomodationIDS onTestLinkClick button clicked'+'   + onTestLinkClick', this.accomodationIds); 
    this.testService.postUrl(`link-students`, payload)
      .subscribe(() => {
        Swal.fire('Linking Success', 'Students were successfully linked', 'success');
      })
  }

  public previewSourceDoc(doc: UploadedSourceDocument) {
    this.selectedMP3Id = undefined;
    var fileExtension = doc.fileName.substr(doc.fileName.lastIndexOf('.') + 1);
    this.showWordPreview = false;
    if (fileExtension == 'mp3') {
      this.selectedMP3Id = doc.id
    }
    else {
      this.open(this.content)
      this.testService.getUrl(`get-file/${doc.id}/source`)
        .subscribe((data) => {
          const base64Url = 'data:application/pdf;base64,' + data.file;
          timer(this.spinnerDuration).subscribe(() => this.closeSpinnerModal(this.modalReference))
          this.pdfViewerSourcePdf.load(base64Url, '');
          this.pdfViewerSourcePdf.enableHyperlink = false;
        })
    }
  }

  public reloadCurrentPage() {
    window.location.reload();
    this.active = 3
  }

  private resetLinks = () => {
  /*   this.studentIds = [];
    this.accomodationIds = [];
    this.readerIds = []; */
    this.studentIds.clear();
    this.accomodationIds.clear();
    this.readerIds.clear();
    this.extraTimeIds = [];
  }

  public populateStudentList(
    sectorId?: number,
    centerId?: number,
    testId?: number
  ) {
  //console.log(`${sectorId}&centerId=${centerId}&testId=${testId}`)
    this.testService
      .getUrl(
        `student-list?sectorId=${sectorId}&centerId=${centerId}&testId=${testId}`
      )
      .subscribe((data) => {
        //this.links = data
        const sortedLinks = {};
        for(const item of data){
            sortedLinks[item.studentID] = item;
        }
        this.links = Object.values(sortedLinks);

        //console.log(data);
        this.resetLinks()

        this.paginationService.setData(data)

        this.studentList = data;
        this.cdRef.detectChanges();

        const linked = this.links.filter(x => x.linked);

        data.forEach(x => {

          //console.log(x);
          /* if (x.linked) this.studentIds.push(x.studentID)
          if (x.accomodation) this.accomodationIds.push(x.studentID)
          if (x.electronicReader) this.readerIds.push(x.studentID)

          this.extraTimeIds[x.studentID] = x.studentExtraTime ?? '00:00:00' */
          if (x.linked) this.studentIds.add(x.studentID);
          if (x.accomodation) this.accomodationIds.add(x.studentID);
          if (x.electronicReader) this.readerIds.add(x.studentID);
          this.extraTimeIds[x.studentID] = x.studentExtraTime ?? '00:00:00';
          this.defaultSelect = this.extraTimeIds[x.studentID]['00:00:00'];
        });

         //console.log('ReaderIDS from DB populateStudentList function'+'   + onTestLinkClick', this.readerIds);
         //console.log('AccomodationIDS from DB populateStudentList function'+'   + onTestLinkClick', this.accomodationIds); 
         //console.log(this.accomodationIds); 
         //console.log(this.readerIds); 

      });

  }

  ngOnDestroy() {
  }

}


