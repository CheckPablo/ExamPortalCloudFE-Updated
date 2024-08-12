
import { AfterViewChecked, AfterViewInit, Component, DestroyRef, ElementRef, HostListener, Input, NgZone, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, inject } from '@angular/core';
import { TestService } from 'src/app/core/services/shared/test.service';
import { ToolbarService, ContextMenuService, EditorService, DocumentEditorContainerComponent, ImageFormat, DocumentEditorKeyDownEventArgs, CharacterFormatProperties, SelectionChangeEventArgs, DocumentEditorComponent, SectionBreakType } from '@syncfusion/ej2-angular-documenteditor';
import { environment } from 'src/environments/environment';
import { StudentTestAnswer } from 'src/app/core/models/studentTestAnswer';
import { StudentTestWriteService } from 'src/app/core/services/shared/studentTestWrite.service';
import { EventEmitterService } from 'src/app/core/services/shared/event-emitter.service';
import Swal from 'sweetalert2';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Router } from '@angular/router';

import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from '@syncfusion/ej2-pdf-export';
import { InTestWriteService } from 'src/app/core/services/shared/inTestWrite.service';
import { StudentTestAnswerSave } from 'src/app/core/models/studentTestAnswerSave';
import { StudentTestWriteInformation } from 'src/app/core/models/StudentTestWriteInformation';
import { Observable, Subscription, fromEvent, interval, map, timer } from 'rxjs';
import { threadId } from 'worker_threads';
import { KeyPressTracking } from 'src/app/core/models/keyPressTracking';
import { event } from 'jquery';
import { DatePipe, JsonPipe, PlatformLocation } from '@angular/common';
import { User } from 'src/app/core/models/user';
import { CustomElement } from 'src/app/core/models/CustomElement';
import { getDate } from 'date-fns';
type RouteData = {
  langTo: string;
  voice: string;
};

@Component({
  selector: 'app-test-writing-answertemplate',
  templateUrl: './test-writing-answertemplate.component.html',
  styleUrls: ['./test-writing-answertemplate.component.css'], 
 
})
export class TestWritingAnswertemplateComponent implements OnChanges {

  // destroyRef = inject(DestroyRef);
  @ViewChild('documentEditor') public container!: DocumentEditorContainerComponent;
  //@ViewChild('wordCountInput') wordCountInput: ElementRef;
  //#wordCountInput
  @ViewChildren(DocumentEditorContainerComponent) documentEditors: QueryList<DocumentEditorContainerComponent>;
  studentsTestData: StudentTestWriteInformation;

  @Input() testId?: number;
  @Input() studentId?: number;
  @Input() studentTestAnswer: StudentTestAnswer;
  @Input() imageURLList: string[];
  @Input() isFullScreenExited: boolean;
  @Input() operatingSystem;
  @Input() securityTestLevelId

  isImageInsert: boolean;
  serviceLink: string;
  contentChanged: boolean;
  answerScanningAvailable: boolean;
  accomodation: boolean;
  title = 'internet-connection-check';
  status = 'ONLINE'; //initializing as online by default
  isConnected = true;
  checkConnectCookie = "0";
  numberOfReconnects = 0;
  numberOfDatabseReconnects = 0;
  reconnected = 0;
  electronicReader: boolean;
  updatedTestDuration: any;
  testName: string;
  tick = 1000;
  testDuration: Date;
  studentExtraTime: string;
  studentAddedExtraTime: Date;
  tts: boolean;
  studentName: string;
  workOffline: any;
  submitted: boolean;
  extraTimeToAdd = [];
  cachedDuration: any;
  cachedFile: string;
  xTimer: any;
  saving: boolean;
  irrOffline: string;
  collapsed: number;
  iWorkOffline: number;
  countDown: Subscription;
  countDown$: Observable<any>;
  counter = 1800;
  keyPressDescription: string;
  keyPressDetected: (args: DocumentEditorKeyDownEventArgs) => "ctrl + c" | "ctrl + v" | "ctrl + x" | "esc";
  keyCombination: string;
  dataloaded: boolean;
  blankloaded: boolean;
  answerText: string;
  intervalSubscription: Subscription;
  fileBlob: Blob;
  readerResult: string;
  user: User | null;
  //datePipe: DatePipe;
  transformDate: string;
  testWriteDate: Date;
  currentTestName: any;
  headerContent: string;
  otp: any;
  ImagePath: string;
  ImagePathLocal: string;
  imageBase64: string | ArrayBuffer;
  currentPageNumber: number;
  currentPageNumberInFocus: number;
  pagetoInsert: number;
  synthesis = window.speechSynthesis;
  routeData: RouteData = {
    langTo: 'en-GB',
    voice: 'Microsoft George - English (United Kingdom)',
  };
  AnswerAreaReaderResult: string;
  selectAll: boolean;
  ttStatus: string;
  playButtonChangeText: string;
  pauseButtonChangeText: string;
  selectedVoiceEntry: SpeechSynthesisVoice;
  ansTextRateValue: number;
  ansTextPitchValue: number = 1;
  answerButtonText: string;
  irreguarityReasonAnswerSheet: string;
  keypressed: string;
  iskeyPressed: boolean;
  exitedTest: boolean = false;
  invalidKeyPress: boolean =false;
  wordCountInputValue: number;
  currentTestNameSEB: string;
  currentStudentNameSEB: string;
  //answerTextRate: any;

  constructor(
    private testService: TestService,
    private inTestWriteService: InTestWriteService,
    private studentTestWriteService: StudentTestWriteService,
    private eventEmitterService: EventEmitterService,
    private connectionService: ConnectionService,
    private storageService: TokenStorageService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private renderer2: Renderer2,
    private _ngZone: NgZone,
    private router: Router,
    private platformLocation: PlatformLocation,) {
    setInterval(() => this.checkFullScreen()
      , 1000); 
   history.pushState(null, '', location.href); 
    this.platformLocation.onPopState(() => {
      this.exitedTest = true; 
      this.saveTestAnswerDoc(); 
      Swal.fire({
        title: 'Changes you made may not be saved, do you want to proceed?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-2',
          denyButton: 'order-3',
      },
    }).then((result) => { 
      if (result.isConfirmed) {
        setTimeout(() => {
        this.router.navigate(["/portal"])
      }, 2000);
      } else if (result.isDenied) {
        history.pushState(null, '', location.href);
        this.exitedTest = true; 
        this.saveTestAnswerDoc(); 
      }
    })
   
   }) 

  }

  checkFullScreen(): void {
    //if (!document.fullscreenElement && !this.isFullScreenExited && this.operatingSystem === 'CrOS' && this.securityTestLevelId == 3) {
    //if(!document.fullscreenElement && !this.isFullScreenExited  && this.securityTestLevelId == 3) { //SEB doesnt some of these keys so we must block all OS for level 3
    //if (!document.fullscreenElement && !this.isFullScreenExited && this.securityTestLevelId > 1) {
    if (!document.fullscreenElement && !this.isFullScreenExited && this.securityTestLevelId > 1) {
      // Swal.close()
      //this.keyPress('LEFT EXAM AREA');
      this.isFullScreenExited = true;
    }
  }

  private unlistener: () => void;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imageURLList?.currentValue?.length > 0) {

      this.imageURLList = changes.imageURLList.currentValue;
      this.isImageInsert = true;
      this.insertImage(changes.imageURLList.currentValue);
    }
    else {
   
    }
  }

  ngAfterViewInit() {
    /*this.documentEditors.forEach(editor => {
          editor.selectionChange = (args: SelectionChangeEventArgs) => {
            // Handle selection change here
            const selection = (args as any).selection;
            const startParagraph = selection.start.paragraph;
            const layoutViewer = startParagraph.containerWidget;
    
            if (!layoutViewer) {
              const currentPageNumber = layoutViewer.pageNumber;
              
            }
          };
        }); */
  }

  ngOnInit(): void {
    //this.onCreate(); 
   /*  if (this.eventEmitterService.testVar == undefined) { // subVar will be defined at this point so we use a different variable testvar
      this.eventEmitterService.testVar = this.eventEmitterService.
        invokeSetTestName.subscribe((data) => {
          this.currentTestName = data; 
        });
    } */
    let userAgentString = navigator.userAgent;
    if (userAgentString.includes("SEB")) {
    const decodedUrl = decodeURIComponent(this.router.url);
    const urlPath = decodedUrl.split('/'); 
   /*  alert("Index 4"+''+ urlPath[4]); 
    alert("Index 5"+''+ urlPath[5])
    alert("Index 6"+''+ urlPath[6])
    alert("Index 7"+''+ urlPath[7])
    alert("Index 8"+''+ urlPath[8]) */
    this.currentTestNameSEB = urlPath[7]; 
    this.currentStudentNameSEB = urlPath[8]
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    if (this.eventEmitterService.subsVar == undefined) { 
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeSetStudentsFullName.subscribe((data) => {
        this.setHeaderData(data); 
        
        //this.user.fullName = data; 
        //this.currentTestName = data[1]; 
          //this.navBarSetStudentName(data);
          //alert("Role 3"+ data); 
        });
    } 
    this.user = this.storageService.getUser();
    this.getStudentTestDetails()
    this.getAnswerFile();
    window.addEventListener("keyup", (event) => {

      if (this.securityTestLevelId) {
        //if (this.securityTestLevelId === 3) {//change this before deploying
          if (this.securityTestLevelId > 1) {//change this before deploying
          event.preventDefault();
          if (event.key === "ContextMenu") {
            event.preventDefault();
            //
          }
        }

      }
    }, { capture: true })

    /*  document.addEventListener("visibilitychange", (event) => {
       
      
      // Modify behavior…
    }, {capture: true}) */
    this.windowKeyDown();
    this.documentKeyDown();
    /*  this.unlistener = this.renderer2.listen("document", "keydown", event => {
        event.preventDefault();
       
     });
  */
    this.unlistener = this.renderer2.listen("document", "keydown", event => {
      if (event.code === 'Meta') {

        event.preventDefault();
        //
      }

    });

    this.unlistener = this.renderer2.listen("document", "keyup", event => {
      if (event.code === 'MetaLeft') {
        event.preventDefault();
        //
      }
    });

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFirstComponentFunction.subscribe(() => {
          this.firstFunction();
        });
    }

    if (this.eventEmitterService.answerEvent == undefined) {
      this.eventEmitterService.answerEvent = this.eventEmitterService.
        invokeOnReadAnswerTTSButtonClick.subscribe((Data) => {
          this.readAnswerFunction(Data);
        });
    }

    if (this.eventEmitterService.selectedVoiceAnsTxt == undefined) {
      this.eventEmitterService.selectedVoiceAnsTxt = this.eventEmitterService.
        invokeOnReadAnswerChangeSelectedVoice.subscribe((voiceData) => {
          this.getReadAnswerSelectedVoiceName(voiceData);
        });
    }

    if (this.eventEmitterService.selectedRate == undefined) {
      this.eventEmitterService.selectedRate = this.eventEmitterService.
        invokeOnSetAnswerSpeechRate.subscribe((rateValue) => {
          this.getReadAnswerSelectedRate(rateValue);
        });
    }

    if (this.eventEmitterService.selectedPitch == undefined) {
      this.eventEmitterService.selectedPitch = this.eventEmitterService.
        invokeOnSetAnswerPitchValue.subscribe((pitchValue) => {
          this.getReadAnswerSelectedPitch(pitchValue);
        });
    }

    setInterval(() => {
      this.checkNetConnection()
    }, 5000)

    setInterval(() => {
      this.checkContentChange();
    }, 45000);

    setInterval(() => {
      this.toggleConnectionBoolean();
    }, 45000);
  }
  windowKeyDown() {

    fromEvent(window, 'keydown')
      .pipe(this.outsideZone(this._ngZone))
      .subscribe(event => this.handleKeyboardEvent(<KeyboardEvent>event));
  }
  documentKeyDown() {
    fromEvent(document, 'keydown')
      .pipe(this.outsideZone(this._ngZone))
      .subscribe(event => this.handleDocumentEvent(<KeyboardEvent>event));
  }
  handleDocumentEvent(event: KeyboardEvent): void {
      //if (this.securityTestLevelId === 3) {
      if (this.securityTestLevelId > 1) {
      if (event.ctrlKey && event.keyCode === 18 || event.keyCode === 46) {
        //event.isHandled = true;
        event.preventDefault();
        //
        this.keyCombination = "Ctrl + Alt + Delete";
        this.keyPress(this.keyCombination);
      }

      if (event.altKey && event.key === 'F4') {
        event.preventDefault();
        this.keyCombination = "Alt + F4";
        this.keyPress(this.keyCombination);
      }

      if (event.key === 'LWin' || event.key === 'RWin' || event.key === 'Meta') {
        event.preventDefault();
        event.stopPropagation();
        this.keyCombination = "windows";
        // return false;
        this.keyPress(this.keyCombination);
      }
    }
    /* if (event.altKey && event.code === 'Tab') {
      event.preventDefault();
      
      this.keyCombination = "Alt + Tab from handleKeyboardEvent";
      this.keyPress(this.keyCombination);
    }

    if (event.ctrlKey && event.code === 'Tab') {
      
      event.preventDefault();
      this.keyCombination = "Ctrl + Tab from handleKeyboardEvent";
      this.keyPress(this.keyCombination);
    } */

  }
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;
    this.iskeyPressed = true;
    //if (this.securityTestLevelId == 3) {
    if (this.securityTestLevelId > 1) {
      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();

        this.keyCombination = "Ctrl + N";
        this.keyPress(this.keyCombination);
      }

      if (event.altKey && event.key === 'F4') {
        event.preventDefault();

        this.keyCombination = "Alt + F4";
        this.keyPress(this.keyCombination);
      }

      if (event.altKey && event.code === 'Tab') {
        event.preventDefault();

        this.keyCombination = "Alt + Tab from handleKeyboardEvent";
        this.keyPress(this.keyCombination);
      }

      if (event.ctrlKey && event.code === 'Tab') {

        event.preventDefault();
        this.keyCombination = "Ctrl + Tab from handleKeyboardEvent";
        this.keyPress(this.keyCombination);
      }

      if (event.key === 'LWin' || event.key === 'RWin' || event.key === 'Meta') {
        event.preventDefault();
        event.stopPropagation();
        this.keyCombination = "windows";
        // return false;
        this.keyPress(this.keyCombination);
      }

    }
  }

  outsideZone<T>(zone: NgZone) {
    return function (source: Observable<T>) {
      return new Observable(observer => {
        let sub: Subscription;
        zone.runOutsideAngular(() => {
          sub = source.subscribe(observer);
        });

        return sub;
      });
    };
  }

  getReadAnswerSelectedPitch(pitchValue: any) {
    this.ansTextPitchValue = pitchValue;

  }

  getReadAnswerSelectedRate(rateValue: any) {
    this.ansTextRateValue = rateValue;
  }

  firstFunction() {
    this.saveAsBlob();
  }

  readAnswerFunction(buttonText: string) {
    if (buttonText === 'Read Answer') {
      speechSynthesis.cancel();
      this.ttStatus = 'reading';
      this.playButtonChangeText = 'Stop';
      this.pauseButtonChangeText = "";
      this.eventEmitterService.onReadAnswerChangeTTSBtnsText(this.playButtonChangeText, this.pauseButtonChangeText);

      this.selectAll = false;
      if (this.container.documentEditor.selection.text.length <= 1) {
        this.container.documentEditor.selection.selectAll();
        this.container.documentEditor.scrollToPage(1);
        this.selectAll = true;
      }
      let AnswerTextToRead: string = this.container.documentEditor.selection.text;
      if (this.isTextSpeechNullOrUndefined(AnswerTextToRead)) {
        AnswerTextToRead = this.AnswerAreaReaderResult;
      }
      this.speechSynthStart(AnswerTextToRead, 1);
      this.pauseButtonChangeText = 'Pause';
      this.playButtonChangeText = '';
      this.eventEmitterService.onReadAnswerChangeTTSBtnsText(this.playButtonChangeText, this.pauseButtonChangeText);
      //$('#btnPauseStatus').text('Pause');

      if (this.selectAll === true) {
        this.container.documentEditor.selection.goToPage(1);
      }
    } else {
      // $("#btnAnswerPlayStatus").text("Play");
      this.pauseButtonChangeText = 'Play';

      this.ttStatus = "";
      speechSynthesis.cancel();
    }

  }

  speechSynthStart(text: string, rate = 1) {
    if (this.isNullOrUndefined(this.ansTextRateValue)) {
      this.ansTextRateValue = 10
    }
    const textToSpeech = new SpeechSynthesisUtterance(text);
    //
    textToSpeech.lang = this.routeData.langTo;
    textToSpeech.text = text;
    textToSpeech.rate = this.ansTextRateValue / 10;
    if (this.ansTextPitchValue) {
      textToSpeech.pitch = this.ansTextPitchValue;
    }
    textToSpeech.onend = () => {
      console.info('SpeechSynthesisUtterance.onend');
      this.eventEmitterService.onSetAnswerButtonText("Read Answer");
    };

    /* textToSpeech.onend = function () {
         console.info('SpeechSynthesisUtterance.onend');
       
         //QstnPaperTTSBtnText = 'Play';
         //QstnPaperPauseTTSBtnText === 'Pause';
       
       };
    */
    textToSpeech.onerror = function (error) {
      console.error('SpeechSynthesisUtterance.onerror ', error);
    };

    textToSpeech.onstart = function () {
      console.info('SpeechSynthesisUtterance.onstart');
    };
    const voice = this.selectedVoiceEntry;
    /*   const voice = speechSynthesis.getVoices().filter((voice) => {
        return voice.name === this.routeData.voice;
      })[0]; */
    textToSpeech.voice = voice;

    this.synthesis.speak(textToSpeech);
  }

  private isTextSpeechNullOrUndefined(value: any): boolean {

    return value === null || value === undefined || value === 'undefined';
  }

  getReadAnswerSelectedVoiceName(selectedVoiceEntry: SpeechSynthesisVoice) {

    this.selectedVoiceEntry = selectedVoiceEntry;

    ///this.voices.forEach(voiceEntry => {
    //voiceEntry.name === this.selectedVoice.name;
    ///if(voiceEntry.name == this.selectedVoice.name)
    ///selectedVoiceEntry = voiceEntry
    ///});

    //return selectedVoiceEntry;
  }

  public ValidateScannedImagesOTPFunction(data: string[]) {

    //this.ImagePathLocal = environment.apiUrl + 'Uploads/';
    this.ImagePathLocal = environment.apiUrlSandbox + 'Uploads/';
    //this.ImagePathLocal = environment.apiUrlStage + 'Uploads/'
    this.ImagePath = this.ImagePathLocal + data[0];
  }

  exportToPDF() {
    if (this.container.documentEditor) {
      //this.containerdocumentEditor.save('Sample', 'PDF');
    }
  }

  public async insertImage(insertURL: string[]) {
    this.container.showPropertiesPane = false;
    if (this.container == null) return;
    this.serviceLink = `${environment.syncfusionHostedWordUrl}`;
    try {

      //this.ImagePathLocal = environment.apiUrl + 'Uploads/';
      //this.ImagePathLocal = environment.baseGetUrlSandbox + 'Uploads/';
      this.ImagePathLocal = environment.baseGetUrlSandbox + 'Uploads/';
      //this.ImagePathLocal = environment.baseGetUrl + 'Uploads/';
      for (let element of insertURL) {
        await this.container.documentEditor.editor.insertImageAsync(this.ImagePathLocal + element[`fileName`]);
        this.container.documentEditor.editor.insertSectionBreak(SectionBreakType.NewPage);
      }
      this.container.documentEditor.resize();
      this.saveTestAnswerDoc();
    } catch (error) {
      console.error('part of container not defined:', error);
    }
  }

  private isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  async imageUrlToBase64(url) {
    const data = await fetch(url)
    const blob = await data.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64data = reader.result;
      //INSERTING THE IMAGE ONTO DOCUMENT/ANSWER SHEET AS BASE64DATA
      this.imageBase64 = base64data
      return base64data
    }
  }

  public checkContentChange() {
    // 
    this.saveTestAnswerDoc();
    this.showIntervalSaveSuccess();
    this.contentChanged = false;
  }

  public toggleConnectionBoolean() {

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected.hasInternetAccess
      if (this.isConnected) {
        this.status = "ONLINE";
        //this.saveAll();
      } else {
        this.status = "OFFLINE"
      }
    });

  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseOut() {
    this.currentPageNumberInFocus = this.getPageNumberinFocus();
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    if (this.container.documentEditor.selection.text.length >= 1) {
      var text = this.container.documentEditor.selection.text;
      let wordCCountInput = document.getElementById('txtWordCount'); 
     
      //s = document.getElementById("inputString").value;
      text = text.replace(/(^\s*)|(\s*$)/gi, "");
      text = text.replace(/[ ]{2,}/gi, " ");
      text = text.replace(/\n /, "\n");
      console.log(text.split(' ').length);
      //wordCCountInput.textContent;
      this.wordCountInputValue = text.split(' ').length; 
      this.eventEmitterService.onSetWordCount(this.wordCountInputValue);
      //this.wordCountInput.nativeElement.value = "update input value";
      //this.container.documentEditor.selection.selectAll();
      //this.container.documentEditor.scrollToPage(1);
      //this.selectAll = true;
    }
    else{
      console.log("no selection"); 
    }
    /*var documenteditor;
    var documenteditorElement = document.getElementById("container2");
    documenteditor = documenteditorElement.ej2_instances[0].documentEditor;

    if (documenteditor.selection.text.length >= 1) {
        var text = documenteditor.selection.text;

        //s = document.getElementById("inputString").value;
        text = text.replace(/(^\s*)|(\s*$)/gi, "");
        text = text.replace(/[ ]{2,}/gi, " ");
        text = text.replace(/\n /, "\n");

        $("#txtWordCount").val(text.split(' ').length);
    } else {
        $("#txtWordCount").val("");
        $("#txtWordCount").attr("placeholder", "Select text...");
    }*/
    //alert("Mouse Moved" +""+ e)
    //console.log(e);
  }

 /*  @HostListener('window:beforeunload', ['$event']) onBeforeUnload(
    event: BeforeUnloadEvent
  ) {
    alert("Unloading")
    //history.pushState(null, document.title, location.href);
    //this.backButtonClicked = true;
  }
  */
  public keyPress(keyPressEvent: string) {
    this.invalidKeyPress = true; 
    if ((keyPressEvent !== null) && (keyPressEvent !== undefined)) {
      Swal.fire({
        title: 'Locked out',
        text: "You have pressed an invalid key",
        icon: 'warning',
        input: 'textarea',
        inputPlaceholder: 'Provide a reason for invalid button click',
        inputAttributes: {
          'aria-label': 'Provide a reason for invalid button click'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Submit',
        inputValidator: (value) => {
          if (!value) {

            return "You need to submit a reason for invalid key combination";
          }
        },
      }).then((result) => {
        this.saveInvalidKeyPress(keyPressEvent, result.value);

      });
    }
    else {
      //Returning from bypassing invalid submit on exit fullscreen"
      return;
    }
  }

  public saveInvalidKeyPress(keyPressEvent: string, reason: string | null) {

    var keysPressed: KeyPressTracking;
    keysPressed = {
      id: this.studentId,
      studentId: this.studentId,
      event: keyPressEvent,
      reason: reason,
      testId: this.testId,
      oldStudentId: this.studentId,
      oldTestId: this.testId,
      student: null,
      test: null
    }
    console.log("save-irregular-keypressevent639")
    this.inTestWriteService.saveIrregularities(keysPressed).subscribe(() => {
      // 
    })
  }

  public getAnswerFile() {
     /*   if (this.eventEmitterService.subsVar == undefined) { 
        this.eventEmitterService.subsVar = this.eventEmitterService.
          invokeSetStudentsFullName.subscribe((data) => {
          this.setHeaderData(data); 
          });
      } 
    if (this.eventEmitterService.testVar == undefined) { // subVar will be defined at this point so we use a different variable testvar
      this.eventEmitterService.testVar = this.eventEmitterService.
        invokeSetTestName.subscribe((data) => {
          this.currentTestName = data; 
          alert(data); 
          alert(this.currentTestName)
        });
    }  */

    //this.container.showPropertiesPane = false;
    //const studentsTestData = JSON.parse(localStorage.getItem('studenttestdatakey'));
    //this.currentTestName = studentsTestData.testName;
    //studentsTestData.accomodation = true;
    this.accomodation = true;
    if (this.accomodation) {
      this.serviceLink = `${environment.syncfusionHostedWordUrl}`;
      this.testService.getUrl(`${this.studentId}/${this.testId}/get-studentanswer-file`)
        .subscribe((data) => {
          if (data) {
            this.dataloaded = true;
            this.blankloaded = false;
            this.loadDocument(data)
          }
          else {
            this.blankloaded = true;
            this.getUploadedAnswerTemplate()
          }

        })

    }
    // 

  }
  setHeaderData(data: any) {
    console.log("Child"+'  '+data); 
  }

  public getUploadedAnswerTemplate() {

    this.testService.getUrl(`${this.testId}/get-answer-file`)
      .subscribe((data) => {
        // 
        if (data) {
          this.dataloaded = true;
          this.blankloaded = false;
          this.loadDocument(data)
        }
        else {
          this.blankloaded = true;
          this.dataloaded = false
          this.loadBlankDocument();

        }
      })
  }

  private checkNetConnection() {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected.hasNetworkConnection
      if (this.isConnected) {
        this.status = "ONLINE";
      } else {
        this.status = "OFFLINE"
      }
    });
  }

  uploadOfflineAnswerDoc() {
    this.fileBlob = JSON.parse(localStorage.getItem('currentstudentanswerdockey'));
    this.uploadStudentOfflineAnswerDoc();
  }

  public saveAll() {
    if (this.workOffline) {
      this.updateTimeAfterOffline()
    }
    if (this.reconnected === 1) {
      this.reconnected = 0;
      this.updateTimeAfterOffline();
    }
    /*  try{
   
        if (this.checkConnectCookie = "0") {//connection to server
         if(this.studentTestAnswer.offline){
         this.updateTimeAfterOffline()
         }
         if (this.reconnected === 1) {
           this.reconnected = 0;
         this.updateTimeAfterOffline();
       //}
       //$("#lblTime").show();
       //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });
       //this.saveInterVal ///call to other component
       }
       //this.checkConnectCookie = "1";
       //saveInterval() check why this is needed
  /*    } 
     catch (e) {
       this.OfflineError("");
   } */

  }

  public saveAllConnectionServer() {
    //
    try {
      this.numberOfReconnects = 0
      if (this.checkConnectCookie = "0") {
        this.checkConnectCookie = "1";
        if (this.studentTestAnswer.offline) {
          this.updateTimeAfterOffline()

        }
        if (this.reconnected === 1) {
          this.reconnected = 0;
          this.updateTimeAfterOffline();

        }
        //$("#lblTime").show();
        //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });
        this.checkConnectCookie = "1";
        //this.saveInterVal ///call to other component
      }
      this.checkConnectCookie = "1";
      //saveInterval()
    }
    catch (e) {
      this.OfflineError("");
    }

  }

  private updateTimeAfterOffline() {

    //clearInterval(this.xTimer);
    /*If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(xTimer);
        document.getElementById("testTime").innerHTML = "00:00:00";
    }*/
    this.studentTestWriteService.getStudentTestDetails(this.testId, this.studentId)
      .subscribe((data) => {



        this.answerScanningAvailable = data[0].answerScanningAvailable,
          this.accomodation = data[0].accomodation
        //this.electronicReader =data[0].electronicReader,
        this.electronicReader = true,
          this.studentExtraTime = data[0].studentExtraTime,
          this.tts = data[0].tts,
          this.studentName = data[0].studentName,
          this.workOffline = data[0].workOffline;
          //this.testName = data[0].testName;
        const testDuration = data[0].testDuration.split(":");


        this.updatedTestDuration = new Date(Date.parse(new Date().toString()) + this.toMillesecond(Number(testDuration[0]), Number(testDuration[1]), Number(testDuration[2])));
        /*this.updatedTestDuration.add(data[0].studentExtraTime, 'minutes');*/
        this.testDuration = this.updatedTestDuration;
       /*  this.getExtraTime(data[0].studentExtraTime); */
        this.setCountDown();
      })

    this.numberOfReconnects = 0;
    this.numberOfDatabseReconnects = 0;
    this.reconnected = 0;
    //Collapse answer section 
    this.collapsed = 0;

  }
  public OfflineError(status: string | null) {

    //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });
    this.saving = false;
    this.irrOffline = "True";
    this.checkConnectCookie = "1";
    //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });

    if (this.accomodation = true) {
      if (this.workOffline = true) {
        this.OfflineSave();
        //toastr.remove();

        //this.toastr.error('You have lost connection to the server and you are now working offline. DO NOT REFRESH OR CLOSE YOUR BROWSER!!', 'Offline');

      }
      else {
        this.reconnected = 1;

        if (this.numberOfDatabseReconnects > 9) {
          //$("#lblTime").hide();

          Swal.fire({
            icon: 'error',
            title: 'No connection to server.',
            text: 'You have lost connection to the server and will not be able to continue. You time has been paused. Please establish a stable internet connection before trying to continue.',
            footer: 'Retrying to connect...',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
        else {
          this.numberOfDatabseReconnects = this.numberOfDatabseReconnects + 1;
          this.checkConnectCookie = "0";
          //$.cookie("CheckConnection", "0");

          this.toastr.error('You have lost connection to the server and you are now working offline. DO NOT REFRESH OR CLOSE YOUR BROWSER!!', 'Offline', { "timeOut": 60000 });
        }
      }
    }
    //var a = $("#testTime").html();
    let a = <HTMLElement>document.getElementById("testTime");
    //
    //Manipulating the element by setting its innerHTML
    //a.innerHTML = "Hello, World!";
    if (a.innerHTML === "00:00:00") {
      if (this.checkConnectCookie == "0" && this.accomodation) {
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Please re-establish a stable internet connection.",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      } else if (this.checkConnectCookie == "0" && !this.accomodation && this.workOffline) {
        downloadAnswers();
        this.OfflineSave();
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Your answers have been saved locally on your computer/laptop. Please close your browser. You will be able to upload your answers once you login with a stable internet connection",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      } else if (this.checkConnectCookie == "0" && this.accomodation && !this.workOffline) {
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Please re-establish a stable internet connection.",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      }
    }
  }
  public OfflineErrorServer() {

    //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });
    this.saving = false;
    this.irrOffline = "True";
    this.checkConnectCookie = "1";
    //this.toastr.success('You are back online!', 'Online', { "timeOut": 5000 });

    if (this.accomodation = true) {
      if (this.workOffline = true) {
        this.OfflineSave();
        //toastr.remove();
   
        this.toastr.error('You have lost connection to the server and you are now working offline. DO NOT REFRESH OR CLOSE YOUR BROWSER!!', 'Offline', { "timeOut": 60000 });
      }
      else {
        this.reconnected = 1;
      
        if (this.numberOfDatabseReconnects > 9) {
          //$("#lblTime").hide();
          Swal.fire({
            icon: 'error',
            title: 'No connection to server.',
            text: 'You have lost connection to the server and will not be able to continue. You time has been paused. Please establish a stable internet connection before trying to continue.',
            footer: 'Retrying to connect...',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
        else {
          this.numberOfDatabseReconnects = this.numberOfDatabseReconnects + 1;
          this.checkConnectCookie = "1";
          //$.cookie("CheckConnection", "0");
         
          this.toastr.error('You have lost connection to the server and you are now working offline. DO NOT REFRESH OR CLOSE YOUR BROWSER!!', 'Offline', { "timeOut": 60000 });
        }
      }
    }
    //var a = $("#testTime").html();
    let a = <HTMLElement>document.getElementById("testTime");
    //
    //Manipulating the element by setting its innerHTML
    //a.innerHTML = "Hello, World!";
    if (a.innerHTML === "00:00:00") {
      if (this.checkConnectCookie == "0" && this.accomodation) {
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Please re-establish a stable internet connection.",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      } else if (this.checkConnectCookie == "0" && !this.accomodation && this.workOffline) {
        downloadAnswers();
        this.OfflineSave();
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Your answers have been saved locally on your computer/laptop. Please close your browser. You will be able to upload your answers once you login with a stable internet connection",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      } else if (this.checkConnectCookie == "0" && this.accomodation && !this.workOffline) {
        Swal.fire({
          title: 'Time is Up',
          text: "Your test time has ran out. It appears that you do not have an internet connection. Please re-establish a stable internet connection.",
          icon: 'warning',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });
      }
    }
  }

  private getExtraTime(time: string) {
    this.extraTimeToAdd = time.split(":");
    if (this.extraTimeToAdd.length > 2) {
      this.testDuration = new Date(Date.parse(this.testDuration.toString()) + this.toMillesecond(this.extraTimeToAdd[0], this.extraTimeToAdd[1], this.extraTimeToAdd[2]));
    }
    else if (this.extraTimeToAdd.length > 1) {
      this.testDuration = new Date(Date.parse(this.testDuration.toString()) + this.toMillesecond(this.extraTimeToAdd[0], this.extraTimeToAdd[1]));
    }
  }

  private toMillesecond(hours: number, minutes: number, seconds: number = 0) {
    const milliseconds = 60 * 1000;
    const hoursToMillisecons = hours * 60 * milliseconds;
    const minutesToMillisecons = minutes * milliseconds;
    const secondsToMillisecons = seconds * 1000;
    return hoursToMillisecons + minutesToMillisecons + secondsToMillisecons;
  }

  private setCountDown() {
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);

    this.countDown$ = interval(1000).pipe(
      map(() => {
        return Math.floor((this.testDuration.getTime() - new Date().getTime()) / 1000);
      }));
  }

  public OfflineSave() {
    //
    // throw new Error('Function not implemented.');
  }

  private showIntervalSaveSuccess() {
    if (this.status == "ONLINE") {
     

      //WHILE THE USER IS OFFLINE ANSWERS WILL NOT UPLOAD SO UPDATE WHEN USER GETS BACK ONLINE. ITs DONE HERE BECAUSE WHEN SAVING VALUE OF OFFLINE WILL ALWAYS BE FALSE
      //this.checkOfflineBooleanLatestValue(); 
      //localStorage.setItem("exitedTest","false");
      
      this.toastr.success('Answers Saved!', 'Auto Save');
    }
    else {
     
  
      localStorage.setItem("TimeWentOffline",String(new Date())); 
      this.toastr.error('You have lost connection to the server and you are now working offline. DO NOT REFRESH OR CLOSE YOUR BROWSER!!', 'Offline');
    }
  }

  private checkOfflineBooleanLatestValue(){
    var currentOnlineStatus = localStorage.getItem('exitedTest');

   /*  if (JSON.stringify(currentOnlineStatus) == "false") {
      this.exitedTest = false;
    }

    if (JSON.stringify(currentOnlineStatus) == "true") {
      this.exitedTest = true;
    } */

  }

  onkeydown(args: DocumentEditorKeyDownEventArgs): void {
    let keyCode: number = args.event.which || args.event.keyCode;
    let isCtrlKey: boolean = (args.event.ctrlKey || args.event.metaKey) ? true : ((keyCode === 17) ? true : false);
    //Checks if the Ctrl, Shift and Space key are pressed.
    //if (isCtrlKey && keyCode === 67) {
    if (isCtrlKey && args.event.key === 'c') {

      this.keyCombination = "Ctrl + c";

      this.keyPress(this.keyCombination);
      console.log("answerTemp" + "line 1042"); 
      args.isHandled = true;
    }

    if (isCtrlKey && args.event.key === 'v') {
      // if (isCtrlKey && keyCode === 86) {
      args.isHandled = true;
      this.keyCombination = "Ctrl + v";

      this.keyPress(this.keyCombination);

    }

    //if (isCtrlKey && keyCode === 88) {
    if (isCtrlKey && args.event.key === 'x') {
      args.isHandled = true;
      this.keyCombination = "Ctrl + x";

      this.keyPress(this.keyCombination);
    }

    if (isCtrlKey && keyCode === 18 || keyCode === 46) {
      args.isHandled = true;
      args.event.preventDefault();
      this.keyCombination = "Ctrl + Alt + Delete.";
      this.keyPress(this.keyCombination);
    }

    if (args.event.key === 'LWin' || args.event.key === 'RWin' || args.event.key === 'Meta') {
      args.event.preventDefault();
      args.event.stopPropagation();
      this.keyCombination = "windows";
      this.keyPress(this.keyCombination);
      //return false;
    }


    if (args.event.altKey && args.event.code === 'Tab') {
      args.event.preventDefault();
      //event.stopPropagation();

      this.keyCombination = "Alt + Tab from handleKeyboardEvent";

      this.keyPress(this.keyCombination);
    }

    if (args.event.ctrlKey && args.event.code === 'Tab') {
      args.event.preventDefault();
      this.keyCombination = "Ctrl + Tab from handleKeyboardEvent";

      this.keyPress(this.keyCombination);
    }

    if (keyCode === 93) {

      var lastKey = 0;
      $(window).on("keydown", document, function (event) {
        lastKey = event.keyCode;
      });
      $(window).on("contextmenu", document, function (event) {
        if (lastKey === 93) {
          lastKey = 0;
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      });

    }
    if (isCtrlKey && keyCode === 27) { //escape

      args.isHandled = true;
      this.keyCombination = "escape";

      this.keyPress(this.keyCombination);
      //args.event.preventDefault();

    }
    if (args.event.shiftKey && args.event.code === 'ESC') {

      args.event.preventDefault();
      this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

      this.keyPress(this.keyCombination);
    }

    if (args.event.shiftKey && args.event.code === 'ESCAPE') {

      args.event.preventDefault();
      this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

      this.keyPress(this.keyCombination);
    }

    if (args.event.shiftKey && args.event.code === 'Escape') {

      args.event.preventDefault();
      this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

      this.keyPress(this.keyCombination);
    }


  }


  selectionChanges() {
    //Get the start index of current selection
    //Get the end index of current selection
    //
    this.currentPageNumberInFocus = this.getPageNumberinFocus();
    // 
  }


  public onContentChange(): void {
    this.container.documentEditor.keyDown = this.onkeydown.bind(this);
    //this.container.documentEditor.selectionChange = this.container.selectionChange.bind(this);
    //this.container.documentEditor = DocumentEditorComponent.ej2_instances[0];
    this.container.documentEditor.enableTextExport = true;
    let fileReader: FileReader = new FileReader();
    this.container.documentEditor.saveAsBlob('Txt').then((exportedDocument: Blob) => {
      fileReader.onload = () => {
        this.AnswerAreaReaderResult = fileReader.result.toString();
        //this.answerAreaText = 
        //);
      };

      fileReader.readAsText(exportedDocument);

    })
    this.contentChanged = true;
  }

  private loadDocument(documentBase64: string): void {
    let userAgentString = navigator.userAgent;
    this.testWriteDate = new Date();
    this.transformDate = this.datePipe.transform(this.testWriteDate, 'yyyy/M/dd');
    this.container.showPropertiesPane = false;

    if (userAgentString.includes("SEB")) {  
     this.currentTestName = this.currentTestNameSEB
     this.user.fullName = this.currentStudentNameSEB
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    try {
      this.container.documentEditor.open(documentBase64);
      let defaultCharacterFormat: CharacterFormatProperties = {
        bold: false,
        italic: false,
        baselineAlignment: 'Normal',
        underline: 'None',
        fontColor: "#808080",
        fontFamily: 'Arial',
        fontSize: 8
      }
      this.container.showPropertiesPane = false;
      this.container.documentEditor.zoomFactor = 0.80;
      /*this.container.documentEditor.fireZoomFactorChange;
      this.container.documentEditor.zoomFactorChange;*/
      this.container.documentEditor.setDefaultCharacterFormat(defaultCharacterFormat);
      this.container.toolbarItems = ["Undo", "Redo", "Table", "PageNumber", "Break", "Find"];
      this.container.documentEditor.selection.goToHeader();
      this.container.documentEditor.selection.selectAll();
      this.container.documentEditor.selection.sectionFormat.headerDistance = 6;
      //
      //this.container.documentEditor.selection.sectionFormat.pageStartingNumber = 1; 
      this.headerContent = this.user.fullName + '  ' + this.currentTestName + ' ' + this.datePipe.transform(this.testWriteDate, 'yyyy/M/dd');
      this.container.documentEditor.editor.delete();
      this.container.documentEditor.editor.insertText(this.headerContent.split('').join(' '));
      this.container.documentEditor.selection.closeHeaderFooter();
      /* if (this.container.documentEditor.pageCount > 1) {
          //this.container.documentEditor.selection.goToPage(1);
          this.pagetoInsert = JSON.parse(localStorage.getItem('current_pagenumber_infocuskey'));
          this.pagetoInsert = (Number(this.pagetoInsert)) + 1;
          //) + 1);
          this.container.documentEditor.selection.goToPage(this.pagetoInsert);
      }  */
      //this.container.documentEditor.enableAutoFocus = true;

      if (this.isImageInsert == true) {

        this.container.documentEditor.selection.goToPage(this.container.documentEditor.pageCount);

        if (this.imageURLList?.length > 0) {
          this.insertImage(this.imageURLList);
        }
        this.imageURLList = [];
        this.isImageInsert = false;
        this.storageService.removePageNumberInFocus();
      }
      else {

        this.container.documentEditor.selection.goToPage(1);
        //this.container.documentEditor.selection.moveToDocumentStart();
      }

    }
    catch (error) {
      console.error('Failed to decode base64 string:', error);
    }
  }

  onDocumentChange(): void {
    /* if (!isNullOrUndefined(this.titleBar)) {
        this.titleBar.updateDocumentTitle();
    } */
    this.container.documentEditor.focusIn();
  }

  private loadBlankDocument(): void {
    let userAgentString = navigator.userAgent;
    this.testWriteDate = new Date();
    this.transformDate = this.datePipe.transform(this.testWriteDate, 'yyyy/M/dd');
    /*this.container.documentEditor.openBlank(); */
    if (userAgentString.includes("SEB")) {
     this.currentTestName = this.currentTestNameSEB
     this.user.fullName = this.currentStudentNameSEB
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    try {
      let defaultCharacterFormat: CharacterFormatProperties = {
        bold: false,
        italic: false,
        baselineAlignment: 'Normal',
        underline: 'None',
        fontColor: "#808080",
        fontFamily: 'Arial',
        fontSize: 8
      }

      // Set default Character format   
      this.container.documentEditor.setDefaultCharacterFormat(defaultCharacterFormat);
      this.container.toolbarItems = ["Undo", "Redo", "Table", "PageNumber", "Break", "Find"];
      this.container.showPropertiesPane = false;
      let data: string = `{
      "sections": [
          {
              "blocks": [
                  {
                      "inlines": [
                          {
                              "characterFormat": {
                                  "bold": true,
                                  "italic": true
                              },
                              "text": ""
                          }
                      ]
                  }
              ]
          }
      ]
  }`;
      this.container.documentEditor.open(data);
      this.container.documentEditor.selection.goToHeader();
      this.container.documentEditor.selection.selectAll();
      this.container.documentEditor.selection.sectionFormat.headerDistance = 6;
      //);
      this.headerContent = this.user.fullName + '  ' + this.currentTestName + ' ' + this.datePipe.transform(this.testWriteDate, 'yyyy/M/dd');
      this.container.documentEditor.editor.delete();
      this.container.documentEditor.editor.insertText(this.headerContent.split('').join(' '));
      this.container.documentEditor.selection.closeHeaderFooter()
      //place Calibri or Arial as font here
      if (this.isImageInsert == true) {
        this.container.documentEditor.selection.goToPage(this.container.documentEditor.pageCount);
        if (this.imageURLList?.length > 0) {

          this.insertImage(this.imageURLList);
        }
        this.imageURLList = [];
        this.isImageInsert = false;
        this.storageService.removePageNumberInFocus();
      }
      else {
        this.container.documentEditor.enableAutoFocus = true;
        this.container.documentEditor.selection.moveToDocumentStart();
      }
      //this.container.documentEditor.selection.goToPage(1);
    } catch (error) {
      console.error('Failed to decode base64 string:', error);
    }
  }

  getPageNumberinFocus(): number {
    const selection = this.container.documentEditor.selection;

    if (selection) {
      if (this.container.documentEditor.selection.isEmpty) {
      }
      else {
      }
      return this.container.documentEditor.selection.startPage;
    }
    //
    return -1; // Return -1 or any default value if the page number is not found
  }

  savePageNumberinFocus() {
    this.storageService.saveFocusedPageNumber(String(this.getPageNumberinFocus))
  }

  checkIfPageIsEmpty(): boolean {
    // Get the document instance
    const document = this.container.documentEditor;
    if (document && document.selection) {
      // Check if the document is empty
      if (document.selection.isEmpty) {
        return true; // Document is empty
      } else {
        // Check if the document contains only non-visible characters (like spaces, tabs, etc.)
        const text = document.selection.text;
        const nonWhitespaceRegex = /\S/g;
        const containsNonWhitespace = nonWhitespaceRegex.test(text);
        return !containsNonWhitespace; // Return true if document contains no visible content
      }
    }

    return false; // Document not available or some other issue
  }

  private getStudentTestDetails() {

    this.studentTestWriteService.getStudentTestDetails(this.testId, this.studentId)
      .subscribe((data) => {
        this.answerScanningAvailable = data[0].answerScanningAvailable;
        this.setStudentTestData(data[0]);

      })

  }

  public setStudentTestData(arg0: StudentTestWriteInformation) {
    /* 
    */
  }

  public saveAsBlob(): void {
    let obj = this;
    let pdfdocument: PdfDocument = new PdfDocument();
    let count: number = this.container.documentEditor.pageCount;
    //obj.container.documentEditor.pageCount;
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

   public saveTestAnswerDoc(): void {
 
     if (!this.container) {
    }
    console.log('ExitTestBoolean' , this.exitedTest);
    let userAgentString = navigator.userAgent;

    if (userAgentString.includes("SEB")) {
     this.currentTestName = this.currentTestNameSEB
     this.user.fullName = this.currentStudentNameSEB
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    var base64DataLocal;
    var reader = new FileReader();
    var studentTestSave: StudentTestAnswerSave;
    const remainingTime = localStorage.getItem('remainingTime');
    studentTestSave = {
      id: this.testId,
      testId: this.testId,
      studentId: this.studentId,
      accomodation: true,
      fullScreenClosed: false,
      answerText: this.readerResult,
      keyPress: this.invalidKeyPress,
      //offline: false,
      offline: this.exitedTest,
      leftExamArea: false,
      fileName: "FileName",
      timeRemaining: remainingTime || '00:00' 
    }
    console.log(studentTestSave);
    this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {

      let formData: FormData = new FormData();
      formData.append("file", exportedDocument, "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
     /// var reader = new FileReader();

      //alert('Testid before saving:'+' '+ this.testId)
      //alert('studentId before saving:'+' '+ this.studentId)
      formData.append("data", JSON.stringify(studentTestSave));
      console.log(exportedDocument); 
      reader.readAsDataURL(exportedDocument);
      reader.onload = () => {
      base64DataLocal = reader.result;
      console.log(base64DataLocal); 
      this.storageService.saveStudentAnswerDocLocal(base64DataLocal); 
        
        localStorage.setItem("EncryptedAnswers: " + this.testId, this.currentTestName + ' ||' + this.testId + ' ||' + base64DataLocal);
      }; 
      
      //if (this.status != "OFFLINE") {
        this.inTestWriteService.postUrl(`upload-answer-document`, formData)
          .subscribe((data) => {
            if (data) {
             localStorage.setItem('extraTime', data.studentExtraTime);
            }
            else {

            }
          });
      //}

       this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {

        let formData: FormData = new FormData();
        // 
        formData.append("file", exportedDocument, "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
        formData.append("data", JSON.stringify(studentTestSave));
      }
      ) 
    }
    )
  }
 

  public async saveTestAnswerDocNew() {
    console.log('saveTestAnswerDoc');
    if (!this.container) {
    }

    let userAgentString = navigator.userAgent;
    if (userAgentString.includes("SEB")) {
     this.currentTestName = this.currentTestNameSEB
     this.user.fullName = this.currentStudentNameSEB
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    var base64DataLocal;
    var studentTestSave: StudentTestAnswerSave;
    const remainingTime = localStorage.getItem('remainingTime');
    studentTestSave = {
      id: this.testId,
      testId: this.testId,
      studentId: this.studentId,
      accomodation: true,
      fullScreenClosed: localStorage.getItem('isFullScreenExited') === 'true',
      answerText: this.readerResult,
      keyPress: this.invalidKeyPress,
      //offline: false,
      offline: this.exitedTest,
      leftExamArea: false,
      fileName: "FileName",
      timeRemaining: remainingTime || '00:00'
    }
    console.log('editor.base64', this.container.documentEditor.editor.base64);

    this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {

      var readerLocalStorage = new FileReader();
      readerLocalStorage.readAsDataURL(exportedDocument);
      readerLocalStorage.onload = () => {
        
        base64DataLocal = readerLocalStorage.result;
        this.storageService.saveStudentAnswerDocLocal(base64DataLocal)
        localStorage.setItem("EncryptedAnswers: " + this.testId, this.currentTestName + ' ||' + this.testId + ' ||' + base64DataLocal);
      };

      //alert('saveTestAnswerDocNewMethod'+' '+ 'Testid before saving:'+' '+ this.testId)
      //alert('studentId before saving:'  +' '+ this.studentId)
      const reader = new FileReader();

      reader.onload = async () => {
        console.log('Tracker', reader.result);
        const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
        const params = {
          fileBytes: arrayBuffer,
          TestId: this.testId, 
          StudentID: this.studentId + 'sample.docx', 
          //File:"data", JSON.stringify(studentTestSave)
          //formData.append("data", JSON.stringify(studentTestSave));
        };
        
        if (this.status != "OFFLINE") {
          this.inTestWriteService.postUrl(`upload-answer-document`, params)
            .subscribe((data) => {
              if (data) {
                localStorage.setItem('extraTime', data.studentExtraTime);
              }
              else {

              }
            });
        }

      }
      reader.readAsArrayBuffer(exportedDocument);

      /* let formData: FormData = new FormData();
      
            formData.append("file", exportedDocument);
            this.inTestWriteService.postUrl(`Import`, formData)
            .subscribe((data) => {
            console.log(data);
           this.downloadFile(data.sfdt); 
            
            });*/
    });

    /*.then((exportedDocument: Blob) => {

      let formData: FormData = new FormData();

      formData.append("file", exportedDocument, "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
      formData.append("data", JSON.stringify(studentTestSave));
      var reader = new FileReader();
      reader.readAsDataURL(exportedDocument);
      reader.onload = () => {
        formData.append("base64", base64DataLocal);
        base64DataLocal = reader.result;
        this.storageService.saveStudentAnswerDocLocal(base64DataLocal)
        localStorage.setItem("EncryptedAnswers: " + this.testId, this.currentTestName + ' ||' + this.testId + ' ||' + base64DataLocal);
      };
      if (this.status != "OFFLINE") {
        this.inTestWriteService.postUrl(`upload-answer-document`, formData)
          .subscribe((data) => {
            if (data) {
             localStorage.setItem('extraTime', data.studentExtraTime);
            }
            else {

            }
          });
      }

      this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {

        let formData: FormData = new FormData();
        // 
        formData.append("file", exportedDocument, "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
        formData.append("data", JSON.stringify(studentTestSave));
      }
      ) 
    }
    )*/
  }


  public saveLocalImageDoc(): void {

    console.log('saveLocalImageDoc');
    if (!this.container) {
    }

    let userAgentString = navigator.userAgent;

    if (userAgentString.includes("SEB")) {
     this.currentTestName = this.currentTestNameSEB
     this.user.fullName = this.currentStudentNameSEB
    }

    if(userAgentString.includes("CrOS")){
      this.currentTestName = this.currentTestNameSEB
      this.user.fullName = this.currentStudentNameSEB
    }

    var base64DataLocal;
    var reader = new FileReader();
   
    this.container.documentEditor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
   
    let formData: FormData = new FormData();
    formData.append("file", exportedDocument, "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
      reader.readAsDataURL(exportedDocument);
      reader.onload = () => {
        base64DataLocal = reader.result;
        this.storageService.saveStudentAnswerDocLocal(base64DataLocal)
        localStorage.setItem("ImageDocAnswers: " + this.testId, this.currentTestName + ' ||' + this.testId + ' ||' + base64DataLocal);
      };
      if (this.status != "OFFLINE") {
        this.inTestWriteService.postUrl(`upload-answer-document`, formData)
          .subscribe((data) => {

            if (data) {
              //
            }
            else {

            }
          });
      }
      else{
      
      }
    }
    )
  }

  public uploadAnswerDocFormData(formData: FormData) {
    console.log('uploadAnswerDocFormData');

    this.inTestWriteService.postUrl(`upload-answer-document`, formData)
      .subscribe((data) => {
        if (data) {
        }
        else {

          //this.saveToTrackingTable(); 
        }
      });
  }

  public uploadStudentOfflineAnswerDoc(): void {
    console.log('uploadStudentOfflineAnswerDoc');

    if (!this.container) {
      return;
    }
    if (!this.fileBlob) {

      return;
    }
    let formData: FormData = new FormData();
    var studentTestSave: StudentTestAnswerSave;
    studentTestSave = {
      id: this.testId,
      testId: this.testId,
      studentId: this.studentId,
      accomodation: true,
      fullScreenClosed: false,
      answerText: this.readerResult,
      keyPress: false,
      offline: false,
      leftExamArea: false,
      fileName: "FileName",
      timeRemaining: "00:00",
    }


    formData.append("file", new Blob(JSON.parse(localStorage.getItem('currentstudentanswerdockey'))), "TestId:" + this.testId + "StudentID:" + this.studentId + 'sample.docx');
    formData.append("data", JSON.stringify(studentTestSave));
    this.inTestWriteService.postUrl(`upload-answer-document`, formData)
      .subscribe((data) => {
        if (data) {
          //
        }
        else {
          //
        }
      });
  }

  public saveTrackingAnswersLocal(documentText: string) {
    // 
    this.storageService.saveTrackingText(documentText)

  }

  async saveToTrackingTable() {

    if (!this.container?.documentEditor) {
      //
      return;
    }
    const reader = new FileReader()
    this.container.documentEditor.enableTextExport = true;
    this.container.documentEditor?.saveAsBlob('Txt').then((exportedDocument: Blob) => {
      /* reader.onload = function () {
        //
        let AnswerText = reader.result.toString();
        const resultToRead = reader.result.toString(); 
        
        //this.readerResult = reader.result.toString();
    }; */
      reader.onload = () => {
        this.readerResult = reader.result.toString();
        //);
        this.saveTrackingAnswersLocal(reader.result.toString());

        //this.checkTrailingText(this.readerResult)
      }
      reader.readAsText(exportedDocument);
      this.container.documentEditor?.saveAsBlob('Txt').then((exportedDocument: Blob) => {
        /* reader.onload = function () {
          //
          let AnswerText = reader.result.toString();
          const resultToRead = reader.result.toString(); 
          
          //this.readerResult = reader.result.toString();
      }; */
        reader.onload = () => {
          this.readerResult = reader.result.toString();
          //);
          this.saveTrackingAnswersLocal(reader.result.toString());

          //this.checkTrailingText(this.readerResult)
        }
        reader.readAsText(exportedDocument);
      }
      )
    }
    )
 
    if (!this.readerResult) {

    }
    var stud: StudentTestAnswer;
    stud = {
      id: this.testId,
      studentId: this.studentId,
      accomodation: true,
      fullScreenClosed: false,
      answerText: this.readerResult,
      keyPress: false,
      offline: false,
      leftExamArea: false,
      fileName: "FileName",
      timeRemaining: "00:00",
      testId: this.testId,
    }

    this.studentTestWriteService.saveAnswersInterval(stud)
      .subscribe(() => {

      })
    //this.contentChanged = false;
    //
  }

  public verifyScanOTP() {
    this.inTestWriteService.verifyScannedOTP(this.otp, this.testId, this.studentId).subscribe(() => {

    })

  }

  ngOnDestroy() {
   
    this.blankloaded = false;
    this.unlistener();
    //this.storageService.removePageNumberInFocus(); 
  }
/* 
  onbeforeunload = function () {
    if (this.testCompleted !== "True") {
        this.irrLeftExamArea = "True";
        this.saveInvalidKeyPress("Browser closed or refreshed", "User has either tried or has refreshed / closed the browser");
        return "Data will be lost if you leave the page, are you sure you want to proceed?";
    }
}; */

  getOperatingSystem() {
    const userAgent = navigator.userAgent;
    //return "CrOS"; 
    if (userAgent.includes("Windows")) {
      return "Windows";
    } else if (userAgent.includes("Mac")) {
      return "Mac";
    } else if (userAgent.includes("Linux")) {
      return "Linux";
    } else if (userAgent.includes("SEB")) {
      return "SEB";
    } else if (userAgent.includes("CrOS")) {
      return "CrOS";
    } else {
      return "Unknown";
    }
  }
}
function downloadAnswers() {
  //

}



