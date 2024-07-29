import { Component, ElementRef, Input, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, VERSION, SimpleChanges, HostListener, input, NgZone, Renderer2, EventEmitter, TemplateRef, } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerComponent } from '@syncfusion/ej2-angular-pdfviewer';
import { environment } from 'src/environments/environment';
import { Firestore, collection, addDoc, getDocs, query, where, serverTimestamp, orderBy, DocumentReference } from '@angular/fire/firestore';
import { TestService } from 'src/app/core/services/shared/test.service';
import { StudentTestWriteService } from 'src/app/core/services/shared/studentTestWrite.service';
import { Test } from 'src/app/core/models/test';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, interval, map, merge, tap, timer } from 'rxjs';
import { StudentTestAnswer } from 'src/app/core/models/studentTestAnswer';
import { StudentTestWriteInformation } from 'src/app/core/models/StudentTestWriteInformation';
import { StudentsTestService } from 'src/app/core/services/shared/studentTest.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { TestChat } from 'src/app/core/models/testChat';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { EventEmitterService } from 'src/app/core/services/shared/event-emitter.service';
import { SpeechService } from 'src/app/core/services/shared/speech.service';
import { SpeechSynthService } from 'src/app/core/services/shared/speechSynth.service';
import { InstalledVoiceService } from 'src/app/core/services/shared/installedVoices.service';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { InTestWriteService } from 'src/app/core/services/shared/inTestWrite.service';
import { enableRipple } from '@syncfusion/ej2-base';
import { createPopper } from "@popperjs/core";
//import { AnchoredFloatingBoxService } from '@babybeet/anchored-floating-box';
//import { TooltipService, Placement, Theme } from '@lazycuh/angular-tooltip';
enableRipple(true);
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
import { ImageScan } from 'src/app/core/models/ImageScan';
import { ScanLogService } from 'src/app/core/services/shared/ScanLogService';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { log } from 'console';
import { AuthService } from '../../core/services/shared/auth.service';
import { PropertyName, SpeechProperties } from 'src/app/core/interfaces/speech.interface';
import { KeyPressTracking } from 'src/app/core/models/keyPressTracking';
import { MyServiceEvent } from 'src/app/core/models/MyServiceEvent';
import { doc, onSnapshot } from "firebase/firestore";
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection , AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UploadedSourceDocument } from 'src/app/core/models/uploadedSourcDocument';
import { TooltipModule } from 'ng2-tooltip-directive';



type RouteData = {
  langTo: string;
  voice: string;
};
@Component({
  selector: 'app-test-writing-management',
  templateUrl: './test-writing-management.component.html',
  styleUrls: ['./test-writing-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
  ],
})

export class TestWritingManagementComponent {

  private scannerEnabled: boolean = true;
  private transports: Transport[] = [];

  public hostedUrl = environment.syncfusionHostedUrl;
  closeResult: string;
  disclaimerAccepted: boolean;
  disclaimerChecked: boolean;
  form: FormGroup;
  selectedTestId: number;
  studentsChatlist: TestChat[] = [];
  bulkMessageList:TestChat[] =[];
  sourceDocs: UploadedSourceDocument[] = [];
  scanResult: any = '';
  liveMonitoringCandidateList: any;
  messages: string;
  //voices:string; 
  voiceListArray: any;
  user: User | null;
  testChatMessageArea = new FormControl('');
  textToSend: string;
  title = 'internet-connection-check';
  status = 'ONLINE'; //initializing as online by default
  ttSourceStatus: string;
  isConnected = true;
  numberOfReconnects = 0;
  numberOfDatabseReconnects = 0;
  checkConnectCookie = "0";
  reconnected = 0;
  studentsTestData: StudentTestWriteInformation;
  qrDataUrl: string;
  ReadMore:boolean = true
  //hiding info box
  collapseOptionsVisible:boolean = false

  ngVersion = VERSION.full;
  initialTime = '00:00:00';
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;
  isTestComplete = false;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  private _serviceSubscription;

  @ViewChild('pdfTestViewer') public pdfTestViewer: PdfViewerComponent;
  @ViewChild('pdfViewerSourcePdf') public pdfViewerSourcePdf: PdfViewerComponent;
  @ViewChild("content", { static: true }) content: ElementRef;
  //@ViewChild('ejDialog', { static: true }) ejDialog: DialogComponent;
  @ViewChild("studentTestChatModal", { static: true }) chatContent: ElementRef;
  @ViewChild("voiceAPIModal", { static: true }) voiceAPIContent: ElementRef;
  @ViewChild("viewSourceDocModal", { static: true }) sourceContent: ElementRef;
  @ViewChild('rate', { static: true, read: ElementRef })
  rate!: ElementRef<HTMLInputElement>;

  @ViewChild('pitch', { static: true, read: ElementRef })
  pitch!: ElementRef<HTMLInputElement>;

  @ViewChild('voices', { static: true, read: ElementRef })
  voiceDropdown!: ElementRef<HTMLSelectElement>;

  voices$!: Observable<SpeechSynthesisVoice[]>;
  subscription = new Subscription();
  @Input() testId: number;
  @Input() studentId?: number;

  timer: any | null;
  pdfUrl: any;
  test: Test;
  counter = 1800;
  countDown: Subscription;
  countDown$: Observable<any>;
  testName: string;
  tick = 1000;
  testDuration: Date = new Date();
  updatedTestDuration: any;
  cachedTestDuration: any;
  studentTestAnswer: StudentTestAnswer;
  testWriteInfo: StudentTestWriteInformation;
  testChatMessage = new FormControl('');
  electronicReader: boolean;
  answerScanningAvailable: boolean;
  accomodation: boolean;
  studentExtraTime: string;
  studentAddedExtraTime: Date;
  tts: boolean;
  studentName: string;
  workOffline: any;
  submitted: boolean;
  extraTimeToAdd = [];
  cachedDuration: any;
  cachedFile: string;
  isPdfHasLoaded: boolean;
  _voices$: any;
  defaultVoiceName: string;
  voices: SpeechSynthesisVoice[]
  public sayCommand: string;
  public rates: number[];
  public selectedVoice: SpeechSynthesisVoice | null;
  public text: string;
  public synthesisVoiceList: SpeechSynthesisVoice[];
  demoTextTwo: string;
  ttsText: string;
  show: boolean = false;
  xTimer: any;
  saving: boolean;
  irrOffline: string;
  collapsed: number;
  iWorkOffline: number;
  keyPressDescription: string;
  QstnPaperTTSBtnText: string = "Play";
  QstnPaperPauseTTSBtnText: string = "Pause";
  AnsTemplateTTSBtnText: string = "Read Answer";
  imageURLList: string[];
  showEditor = true;
  collapseQuestionPaper = false;
  collapseAnswerSheet = false;
  questionPaperFullText: string;
  fullSourcePaperText: string;
  SourcePaperPauseTTSBtnText: string = "Pause";
  SourcePaperTTSBtnText: string = "Read Source Document";
  ttStatus: string;
  synthesis = window.speechSynthesis;
  operatingSystem = '';
  isFullScreenExited = false;

  routeData: RouteData = {
    langTo: 'en-GB',
    voice: 'Microsoft George - English (United Kingdom)',
  };
  fullQuestionPaperText: string;
 
  selectedVoiceAnsTxt: SpeechSynthesisVoice;
  rateValue: number = 10;
  rateChange: any;
  selectedPitch: number = 1;
  irreguarityReason: string;
  keypressed: string;
  iskeyPressed: boolean;
  keyCombination: string;
  securityTestLevelId: number;
  message: string;
  showModal: boolean;
  bulkMessages: string;
  isPendingMessageWrite: boolean;
  private dbPath = '/CloudMessagingStagePortal';
  testChatRef: AngularFirestoreCollection<TestChat>;
  fireBaseDocId: string;
  messagesRead: TestChat;
  bulkMessagesRead: TestChat;
  timeDifferenceInSeconds: number;
  sourceDocId: number;
  base64UrlSource: string;
  isSourceDocClicked: boolean;
  
  //datepipe: any;

  constructor(
    private storage: TokenStorageService,
    private activateRouter: ActivatedRoute,
    private modalService: NgbModal,
    private db: Firestore,
    private fdb: AngularFirestore,
    private formBuilder: UntypedFormBuilder,
    private studentTestWriteService: StudentTestWriteService,
    private testService: TestService,
    private installedVoiceService: InstalledVoiceService,
    private studentTestService: StudentsTestService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private connectionService: ConnectionService,
    private storageService: TokenStorageService,
    private toastr: ToastrService,
    private inTestWriteService: InTestWriteService,
    private cd: ChangeDetectorRef,
    private renderer2: Renderer2,
    private _ngZone: NgZone,
    private authService: AuthService,
    //private readonly anchoredFloatingBoxService: AnchoredFloatingBoxService,
     
    public datepipe: DatePipe) {
    this.activateRouter.params.subscribe((p) => {
      this.testId = p['id']
      this.studentId = p['studentId']

      if (this.studentTestAnswer) {
        this.studentTestAnswer.testId = this.testId = p['id']


      }
      if (this.studentTestAnswer) {
        this.studentTestAnswer.studentId = this.studentId = p['studentId']


      }
      this.testName = p['testName'];
      this.lockscreen();
      this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected.hasInternetAccess
        if (this.isConnected) {
          this.status = "ONLINE";
        } else {
          this.status = "OFFLINE"
        }

      });
      this.testChatRef = fdb.collection(this.dbPath)
    })
    this.operatingSystem = this.getOperatingSystem();
    setInterval(() => this.checkFullScreen()
      , 1000)
  
    this.user = this.storage.getUser();
    console.log(this.user); 
    const privateChatListener = query(collection(db, "CloudMessagingStagePortal"),where('studentID', '==', Number(this.user.id)), where('testID', '==', Number(this.testId)), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(privateChatListener, (querySnapshot) => {
    const changesArray = [];
    querySnapshot.forEach((doc) => {
          changesArray.push(doc.data().name);
        /*if(doc.data().StudentReadStatus === "Unread"){this.openStudentsTestChats() }*/
         const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
         if(source)
          {
            var msgDate = new Date (); 
            msgDate = doc.data().createdAt.toDate();
            let currntDate = new Date() 
            console.log("Firestore Time",msgDate); 
            console.log("Current Date", currntDate);
            this.timeDifferenceInSeconds = currntDate.getTime() - msgDate.getTime();
            console.log("Time Difference In Seconds" ,  currntDate.getTime() - msgDate.getTime()/1000)
            console.log("Time Difference In millieSeconds" , this.timeDifferenceInSeconds)
            if(this.timeDifferenceInSeconds < 10000 )
              {
                this.isPendingMessageWrite = true; 
                this.openStudentsTestChats() 
              }
              else{
                console.log("MORE THAN 1 SEC")
              }         
          }
      });

    });

    const bulkChatListener = query(collection(db,'CloudBroadcastMessaging'),where('testID', '==',Number(this.testId)), where('studentID', '==', 0),orderBy('createdAt', 'asc'))
      const unsubscribeBulk = onSnapshot(bulkChatListener, (querySnapshot) => {
      const bulkChangesArray = [];
      querySnapshot.forEach((doc) => {
      bulkChangesArray.push(doc.data().name);
      /*if(doc.data().StudentReadStatus === "Unread"){this.openStudentsTestChats() }*/
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if(source)
      {
        var msgDate = new Date (); 
        msgDate = doc.data().createdAt.toDate();
        let currntDate = new Date() 
        console.log("Firestore Time",msgDate); 
        console.log("Current Date", currntDate);
        this.timeDifferenceInSeconds = currntDate.getTime() - msgDate.getTime();
        console.log("Time Difference In Seconds" ,  currntDate.getTime() - msgDate.getTime()/1000)
        console.log("Time Difference In millieSeconds" , this.timeDifferenceInSeconds)
        if(this.timeDifferenceInSeconds < 10000 )   {
        this.isPendingMessageWrite = true; 
        this.openStudentsTestChats();
        //console.log(JSON.stringify(document.data().id) +'  '+JSON.stringify(document.data()))
        }
        else{
        console.log("MORE THAN 1 SEC BULK CHAT")
        }         
      }
      });

    })
  /*async getTestBulkMessages() {
      const appRef = collection(this.db, 'CloudBroadcastMessaging')
      const appQuery = query(appRef, where('studentID', '==', 0),where('testID', '==',Number(this.testId)), orderBy('createdAt', 'asc')); 
      const querySnapshot = await getDocs(appQuery);
      querySnapshot.forEach((doc) => {
       
        let InvgChat = new TestChat();
        InvgChat.name = doc.data().name;
        InvgChat.message = doc.data().message;
        InvgChat.fromStudent = doc.data().fromStudent;
        InvgChat.fromTeacher = doc.data().fromTeacher;
        InvgChat.testID = doc.data().testID;
        InvgChat.id = doc.data().studentID;
        InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
        InvgChat.studentReadStatus = doc.data().studentReadStatus;
        InvgChat.studentID = doc.data().studentID;
        
        this.bulkMessageList.push(InvgChat)
  
      }); */
    
    }
  /*   onOpen(content: TemplateRef<any>, anchor: HTMLButtonElement) {
      this.anchoredFloatingBoxService.open({
        content,
        anchor,
        className: 'optional-class-name',
        context: {
          greeting: 'Hello',
          $implicit: 'Angular!!!'
        }
      });
    } */
    public async updateReadStatus(c:TestChat){
      
      const appRef = collection(this.db, 'CloudMessagingStagePortal')
      const appQuery = query(appRef, where('message', '==', c.message));
      const querySnapshot = await getDocs(appQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc); 
        this.fireBaseDocId = doc.id
        console.log(doc.id); })
        c.studentReadStatus = "Read"; 
        const data = {
        studentReadStatus: "Read"
      };
      this.testChatRef.doc(this.fireBaseDocId).update(data); 
     }

     public async updateBulkReadStatus(c:TestChat){
      
      const appRef = collection(this.db, 'CloudBroadcastMessaging')
      const appQuery = query(appRef, where('message', '==', c.message));
      const querySnapshot = await getDocs(appQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc); 
        this.fireBaseDocId = doc.id
        console.log(doc.id); })
        c.studentReadStatus = "Read"; 
        const data = {
        studentReadStatus: "Read"
      };
      this.testChatRef.doc(this.fireBaseDocId).update(data); 
     }

     //const appRef = collection(this.db, 'CloudBroadcastMessaging')
  

  async getStudentTestChatsAutoPop() {
  
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    const appQuery = query(appRef, where('studentID', '==', Number(this.user.id)), where('testID', '==', Number(this.testId)), orderBy('createdAt', 'asc'));
    //const snapShotQuery = query(appRef, where('studentID', '==', Number(this.user.id)), where('testID', '==', Number(this.testId)), orderBy('createdAt', 'asc'), onSnapshot(function(querySnapshot{})));
    const querySnapshot = await getDocs(appQuery);
     console.log(doc);
    querySnapshot.docChanges().forEach((doc) => { 
      console.log(doc);
     //doc.doc.data().StudentReadStatus
     if(doc.type === "added"){
      
      console.log(doc);
      //if (doc.doc.data().StudentReadStatus === "Unread") {
          //alert("NEW DOC ADDED"); 
          //this.openStudentsTestChats() 
        //}
     }

    });
  }

  private unlistener: () => void;
  onRateValueChanged(event: number) {

    this.rateValue = event;
    this.eventEmitterService.onSetAnswerSpeechRate(this.rateValue);

  }


  onPitchValueChanged(event: number) {
    this.selectedPitch = event;
    this.eventEmitterService.onSetAnswerPitchValue(this.selectedPitch)

  }

  @HostListener('document:fullscreenchange', ['$event'])
  onResize(): void {
    this.lockscreen();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {

    e.preventDefault();
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus() {

  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(): void {
    if (this.disclaimerAccepted) {

    }

  }

  //@HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keypressed = event.key;
    this.iskeyPressed = true;

    if (this.securityTestLevelId == 3) {
      if (event.ctrlKey && event.keyCode === 18 || event.keyCode === 46) {
        //event.isHandled = true;
        event.preventDefault();
        //
        this.keyCombination = "Ctrl + Alt + Delete";

        this.keyPress(this.keyCombination);
      }

      if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();


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
        event.preventDefault();
        this.keyCombination = "Ctrl + Tab from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }

      if (event.key === 'Escape') {

        event.preventDefault();
        this.keyCombination = "Escape";

        this.keyPress(this.keyCombination);
      }

      if (event.key === 'LWin' || event.key === 'RWin' || event.key === 'Meta') {
        event.preventDefault();
        event.stopPropagation();
        this.keyCombination = "windows";

        this.keyPress(this.keyCombination);
      }

      if (event.ctrlKey && event.code === 'ESC') {

        event.preventDefault();
        this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }


      if (event.shiftKey && event.code === 'ESC') {

        event.preventDefault();
        this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }

      if (event.shiftKey && event.code === 'ESCAPE') {

        event.preventDefault();
        this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }

      if (event.shiftKey && event.code === 'Escape') {

        event.preventDefault();
        this.keyCombination = "Ctrl + ESC from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }

      if (event.altKey) {

        event.preventDefault();
        this.keyCombination = "Ctrl + TAB from handleKeyboardEvent";

        this.keyPress(this.keyCombination);
      }
    }

  }
  windowKeyDown() {

    //fromEvent(window, 'keydown')
    fromEvent(document, 'keydown')
      .pipe(this.outsideZone(this._ngZone))
      .subscribe(event => this.handleKeyboardEvent(<KeyboardEvent>event));
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

  checkFullScreen() {
    if (!this.disclaimerAccepted) {
      return;
    }
    if (!document.fullscreenElement && !this.isFullScreenExited && this.securityTestLevelId > 1) {
      this.keyPress('LEFT EXAM AREA')

      this.isFullScreenExited = true;
      
      localStorage.setItem('isFullScreenExited', 'true' );
    }
  }

  ngOnChanges(): void {

  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    if (localStorage.getItem('curent_testsecurity_levelId')) {
      this.securityTestLevelId = JSON.parse(localStorage.getItem('curent_testsecurity_levelId'));
    };


    this.user = this.storage.getUser();
    let userAgentString = navigator.userAgent;
    if (userAgentString.indexOf('SEB') > -1) {

    }
    else {

    }

    this.openSm(this.content);
    this.windowKeyDown();
    window.addEventListener("keyup", (event) => {

      if (this.securityTestLevelId) {
        //if (this.securityTestLevelId === 3) { //change this before deploying
          if (this.securityTestLevelId > 1) { //change this before deploying
          event.preventDefault();
          if (event.key === "ContextMenu") {
            event.preventDefault();

          }
        }

      }
    }, { capture: true })


    document.addEventListener("visibilitychange", () => {

      //if (this.securityTestLevelId === 3) {
        if (this.securityTestLevelId > 1) {
        this.OffScreenEvent("Left Test Screen")

      }
      // Modify behavior…
    }, { capture: true })


    this.unlistener = this.renderer2.listen("document", "keydown", event => {
      event.stopPropagation();
      if (event.code === 'MetaLeft') {
        event.preventDefault();

      }
    });

    this.unlistener = this.renderer2.listen("document", "keyup", event => {
      event.preventDefault();
      event.stopPropagation();
      if (event.code === 'MetaLeft') {
        event.preventDefault();

      }
    });

    this.testChatMessage.valueChanges.subscribe(() => {
    })

    this.initForms();
    this.getSourceDocuments(); 
    this.getStudentTestDetails();

    //this.getStudentTestChatsAutoPop(); 

    if (this.eventEmitterService.answerTextButton == undefined) {
      this.eventEmitterService.answerTextButton = this.eventEmitterService.
        invokeOnChangeAnswerButtonText.subscribe((answerTextBtn) => {
          this.getAnswerButtonText(answerTextBtn);
        });
    }


    this.lockscreen();
    //this.setFullScreen();
    this.voices = window.speechSynthesis.getVoices();
    this.selectedVoice = (this.voices[0] || null);
    //this.updateSayCommand();

    if (this.voices.length == 0) {
      const allVoicesObtained = new Promise<SpeechSynthesisVoice[]>(function (resolve) {
        let voicesChanged;
        let voices = speechSynthesis.getVoices();
        if (voices.length !== 0) {
          resolve(voices);

        } else {
          var selectedVoice: SpeechSynthesisVoice | null;

          speechSynthesis.addEventListener("voiceschanged", function () {
            voicesChanged = window.speechSynthesis.getVoices();
            resolve(voicesChanged);
            selectedVoice = (voicesChanged[0] || null);
            // updateSayCommand(); 
          });
          voices = voicesChanged;

        }

      });

      allVoicesObtained.then(result =>
        Promise.resolve(result)
          .then((result) => {
            // 1
            //this.checkBrowser();
            this.voices = [...this.voices, ...result]
          })
      )
      //return p; 
    }

    // #Start angular pop over for hide and collapse
    const button = document.querySelector('#button');
    const tooltip = document.querySelector<any>('#tooltip');

    let popperInstance = null;

    function create() {
      popperInstance = createPopper(button, tooltip, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
    }

    function destroy() {
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
    }

    function show() {
      tooltip.setAttribute('data-show', '');
      create();
    }

    function hide() {
      tooltip.removeAttribute('data-show');
      destroy();
    }

    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach(event => {
      button.addEventListener(event, show);
    });

    hideEvents.forEach(event => {
      button.addEventListener(event, hide);
    });

    // #End angular pop over for hide and collapse
  }

  private getSourceDocuments = () => {

    //if (this.testId.includes("test-upload")) return;
    if (!this.testId) return; // this line alone could be checking for null and undefined? Remove line 271 if 270 works fine (Tinashe ToDO)
    if (this.testId == null || this.testId == undefined) return;
    console.log(this.testId); 
    this.testService.getUrl(`${this.testId}/get-source-documents`)
      .subscribe((data) => {
        this.sourceDocs = data;
        if(this.sourceDocs.length > 0 ){
          console.log(this.sourceDocs)
        }
        else{
          console.log("."); 
          //alert("NO SOURCE DOC");
        }
        this.sourceDocs.some(sourceDoc => {
          if (sourceDoc.fileName.includes("pdf") || sourceDoc.fileName.includes("PDF") || sourceDoc.fileName.includes('pdf') || sourceDoc.fileName.includes('PDF')) {
            this.sourceDocId = sourceDoc.id;
            this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
              .subscribe((data) => {
               this.base64UrlSource = 'data:application/pdf;base64,' + data.file;
                console.log(this.base64UrlSource); 
                this.pdfViewerSourcePdf.load(this.base64UrlSource, '');
                this.pdfViewerSourcePdf.enableHyperlink = false;
                
                return true;
              })


          }

          if (sourceDoc.fileName.includes("docx") || sourceDoc.fileName.includes("DOCX") || sourceDoc.fileName.includes('docx') ||
            sourceDoc.fileName.includes('DOCX')) {
            this.sourceDocId = sourceDoc.id;
            this.testService.getUrl(`get-file/${sourceDoc.id}/source`)
              .subscribe((data) => {
                this.base64UrlSource = 'data:application/pdf;base64,' + data.file;
                console.log(this.base64UrlSource); 
                this.pdfViewerSourcePdf.load(this.base64UrlSource, '');
                this.pdfViewerSourcePdf.enableHyperlink = false;
        
                return true;
              })
          }

        })

      });

  }

  viewClickedSourceDoc(id:number, fileName:string, item:UploadedSourceDocument[]){

    //this.clickedSourceFileName = JSON.stringify(item.file)
   //console.log(fileName); 
    //item.some(sourceDoc => {
      if (fileName.includes("pdf") || fileName.includes("PDF") || fileName.includes('pdf') ||fileName.includes('PDF')) {
        console.log("PDF file");
        this.testService.getUrl(`get-file/${id}/source`)
          .subscribe((data) => {
           this.base64UrlSource = 'data:application/pdf;base64,' + data.file;
            console.log(this.base64UrlSource); 
            this.pdfViewerSourcePdf.load(this.base64UrlSource, '');
            this.pdfViewerSourcePdf.enableHyperlink = false;
       
            //this.ejDialog.show(true);
            return true;
          })  
             this.getSourcePaperText(); 
             this.isSourceDocClicked = true; 
             //alert(this.isSourceDocClicked); 
      }

      if (fileName.includes("docx") || fileName.includes("DOCX") ||fileName.includes('docx') ||
      fileName.includes('DOCX')) {
        //this.sourceDocId = sourceDoc.id;
        this.testService.getUrl(`get-file/${id}/source`)
          .subscribe((data) => {
            this.base64UrlSource = 'data:application/pdf;base64,' + data.file;
            console.log(this.base64UrlSource); 
            this.pdfViewerSourcePdf.load(this.base64UrlSource, '');
            this.pdfViewerSourcePdf.enableHyperlink = false;
            
            //this.ejDialog.show(true);
            return true;
          })
          this.getSourcePaperText();
          this.isSourceDocClicked = true; 
          //alert(this.isSourceDocClicked); 
          //this.ejDialog.show(true);
      }

   // })
    //alert(JSON.stringify(id)); 
    //alert(JSON.stringify(item)); 
    //this.isSourceDocClicked = true; 

  }

  newInvigChatPopUp(invigilatorTextMsg: any) {
    //alert("NEW MSG")
    console.log("NEW MSG")
     /* this.getStudentTestChats();
     this.getTestBulkMessages(); */
   }

  getAnswerButtonText(answerButtonText: string) {
    this.AnsTemplateTTSBtnText = answerButtonText;
    //this.read
  }

  //public loginStudentToSecureBrowser(SecureTestpayload: { uniqueExamNo: any; testId: number; userId: string; testName: string; })
  public loginStudentToSecureBrowser(SecureTestpayload: any) {

    this.authService.loginStudentToTest(SecureTestpayload).subscribe(() => {
      this.router.navigate(['/portal/test-writing/test-writing-management', SecureTestpayload.testId, SecureTestpayload.userId, SecureTestpayload.testName, "HJHJHJ"]);

      //window.location.reload(); 
    },
      async () => {

        //await this.loginPopup();
      });
  }
  handleSourceButtonPlayClick(speed: number) {
    //alert("Voice clicked"); 
    //this.checkButtonTextAnsPaper()


    if(this.SourcePaperTTSBtnText === 'Stop Source Document' && this.SourcePaperPauseTTSBtnText === 'Resume'){
      this.SourcePaperTTSBtnText = "Read Source Document"
      this.SourcePaperPauseTTSBtnText = "Pause"; 
      speechSynthesis.cancel();
      return; 
    }

    if (this.SourcePaperTTSBtnText === 'Read Source Document') {
      speechSynthesis.cancel();
      this.SourcePaperTTSBtnText = 'Stop Source Document';
      this.ttSourceStatus = 'reading';
      console.log(this.fullSourcePaperText); 

      //var temp = this.pdfViewerSourcePdf.textSelection.selectionRangeArray[0];

      //if (this.isNullOrUndefined(temp)) {


        //this.ttsText  ="Read out the entire question from top to bottom until the pause or stop button is clicked";
        if(this.isNullOrUndefined(this.fullQuestionPaperText)){
          this.getSourcePaperText(); 
          this.ttsText = this.fullSourcePaperText; 
        }
  
        this.ttsText = JSON.stringify(this.fullSourcePaperText); // remove this and put it in the if statement above.
        console.log(this.ttsText); 
     // }
      //if (!this.isNullOrUndefined(temp)) {
       // this.ttsText = this.pdfViewerSourcePdf.textSelection.selectionRangeArray[0].textContent;
      //}

      this.speechSynthStart(this.ttsText, speed);
    }
    else {
      //this.QstnPaperTTSBtnText = 'Play';
      this.SourcePaperTTSBtnText = "Read Source Document";
      this.ttSourceStatus = "";
      speechSynthesis.cancel();

    }

  }

  changePauseTTSButtonSourceText():void{
    if (this.ttSourceStatus === 'reading') {
      if (speechSynthesis) {
        this.ttStatus = 'paused';
        speechSynthesis.pause();
        this.SourcePaperTTSBtnText = 'Resume';
        //$('#btnPauseStatus').text('Resume');
      }
    }
    else if (this.ttSourceStatus === 'paused') {
      speechSynthesis.resume();
      this.SourcePaperTTSBtnText = 'Pause';
      //$('#btnPauseStatus').text('Pause');
      this.ttStatus = 'reading';
    }
  }

  public checkIrregularites(stud: StudentTestAnswer) {

    setInterval(() => {
      this.storageService.saveStudentIrregularities(stud);
    }, 45000)
  }

  public checkBrowser() {
    // Get the user-agent string
    let userAgentString =
      navigator.userAgent;

    // Detect Chrome
    let chromeAgent =
      userAgentString.includes("Chrome");
    if (chromeAgent) {
      this.getInstalledVoices();
    }

    // Detect Internet Explorer
    let IExplorerAgent =
      userAgentString.includes("MSIE") ||
      userAgentString.includes("rv:");
    if (IExplorerAgent) {
      this.getInstalledVoices();
    }

    // Detect Firefox
    let firefoxAgent =
      userAgentString.includes("Firefox");
    if (firefoxAgent) {
      this.getInstalledVoices();
    }

    let braveAgent =
      userAgentString.includes("Brave");
    if (braveAgent) {
      this.getInstalledVoices();
    }

    // Detect Safari
    let safariAgent =
      userAgentString.includes("Safari");
    if (safariAgent) {
      this.getInstalledVoices();
    }

    let operaAgent =
      userAgentString.includes("Opera");

    if (operaAgent) {
      this.getInstalledVoices();
    }
  }

  public getInstalledVoices() {
    this.installedVoiceService.getAllInstalledVoices()
      .subscribe((data) => {
        this.voices.push(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
      })
  }

  get f() { return this.form.controls; }


  public demoSelectedVoice(): void { }

  handleButtonPlayClick(speed: number) {
    this.checkButtonTextAnsPaper()
    if (this.QstnPaperTTSBtnText === 'Play') {
      speechSynthesis.cancel();
      this.QstnPaperTTSBtnText = 'Stop';
      this.ttStatus = 'reading';

      var temp = this.pdfTestViewer.textSelection.selectionRangeArray[0];

      if (this.isNullOrUndefined(temp)) {


        //this.ttsText  ="Read out the entire question from top to bottom until the pause or stop button is clicked";
        this.ttsText = JSON.stringify(this.fullQuestionPaperText);
      }
      if (!this.isNullOrUndefined(temp)) {
        this.ttsText = this.pdfTestViewer.textSelection.selectionRangeArray[0].textContent;
      }

      this.speechSynthStart(this.ttsText, speed);
    }
    else {
      this.QstnPaperTTSBtnText = 'Play';
      this.ttStatus = "";
      speechSynthesis.cancel();
    }
  }

  checkButtonTextAnsPaper() {
    if (this.AnsTemplateTTSBtnText === 'Stop') {
      this.AnsTemplateTTSBtnText = "Read Answer";
    }
  }

  public changeQstnPaperPlayBtnText(): void {
    if (this.QstnPaperTTSBtnText === 'Play') {
      this.demoSelectedVoice();
    }
    else {
      this.QstnPaperTTSBtnText = 'Play';
      speechSynthesis.cancel();
    }
  }

  speechSynthStart(text: string, rate: number) {
    if (this.isNullOrUndefined(this.rateValue)) {
      this.rateValue = 100;
    }

    let QstnPaperTTSBtnText = this.QstnPaperTTSBtnText;
    let QstnPaperPauseTTSBtnText = this.QstnPaperPauseTTSBtnText;
    let ttStatus = this.ttStatus

    const textToSpeech = new SpeechSynthesisUtterance(text);

    textToSpeech.lang = this.routeData.langTo;
    textToSpeech.text = text;
    textToSpeech.rate = this.rateValue / 10;
    if (this.selectedPitch) {
      textToSpeech.pitch = this.selectedPitch;
    }

    textToSpeech.onend = () => {
      ttStatus = "";
      this.QstnPaperTTSBtnText = 'Play';
      this.QstnPaperPauseTTSBtnText = 'Pause';

    };

    this.ttStatus = ttStatus;
    this.QstnPaperTTSBtnText = QstnPaperTTSBtnText;
    this.QstnPaperPauseTTSBtnText = QstnPaperPauseTTSBtnText;

    textToSpeech.onerror = function (error) {
      console.error('SpeechSynthesisUtterance.onerror ', error);
    };

    textToSpeech.onstart = function () {
      console.info('SpeechSynthesisUtterance.onstart');
    };

    const voice = this.getSelectedVoiceName();
    textToSpeech.voice = voice;
    this.synthesis.speak(textToSpeech);
    this.QstnPaperPauseTTSBtnText = 'Pause';
  }
  getSelectedVoiceName(): SpeechSynthesisVoice {

    var selectedVoiceEntry = this.selectedVoice;

    this.voices.forEach(voiceEntry => {
      //voiceEntry.name === this.selectedVoice.name;
      if (voiceEntry.name == this.selectedVoice.name)
        selectedVoiceEntry = voiceEntry
    });

    return selectedVoiceEntry;
  }
  private isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined || value === 'undefined';
  }

  public readAnswerTTSButtonText(): void {
    this.selectedVoiceAnsTxt = this.getSelectedVoiceName();
    this.eventEmitterService.onGetReadAnswerSelectedVoice(this.selectedVoiceAnsTxt);
    this.eventEmitterService.onReadAnswerTTSButtonClick(this.AnsTemplateTTSBtnText);
    this.checkButtonTextQstnPaper();
    if (this.AnsTemplateTTSBtnText === 'Read Answer') {
      this.AnsTemplateTTSBtnText = 'Stop'
      this.ttStatus = "reading";
    } else {
      this.AnsTemplateTTSBtnText = 'Read Answer'
      speechSynthesis.cancel();
    }
  }

  checkButtonTextQstnPaper() {
    if (this.QstnPaperTTSBtnText === 'Stop') {
      this.QstnPaperTTSBtnText = 'Play'
    }
  }

  public changePauseTTSButtonText(): void {
    if (this.ttStatus === 'reading') {
      if (speechSynthesis) {
        this.ttStatus = 'paused';
        speechSynthesis.pause();
        this.QstnPaperPauseTTSBtnText = 'Resume';
        //$('#btnPauseStatus').text('Resume');
      }
    }
    else if (this.ttStatus === 'paused') {
      speechSynthesis.resume();
      this.QstnPaperPauseTTSBtnText = 'Pause';
      //$('#btnPauseStatus').text('Pause');
      this.ttStatus = 'reading';
    }
  };

  public stop(): void {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
  }

  private refreshQuestionPaper() {
    console.log("refreshing question paper");
    this.testService.getUrl(`get-questionpaper-file/${this.testId}/${this.studentId}`)
      .subscribe((data) => {
        this.test = data.exam;
        if (data.file) {
          const base64Url = 'data:application/pdf;base64,' + data.file;
          this.pdfTestViewer.load(base64Url, '');

          this.pdfTestViewer.enableTextSelection = true;
          if (data.exam.testDuration) {
            /*  localStorage.setItem('extraTime', data.exam.extraTime);
            this.getTestDurationTime(data.exam.testDuration);
            this.addExtratime()
           localStorage.setItem('extraTime',data.exam.extraTime);
          this.setStartDate(this.testId, this.studentId); */
          } 
        }
        this.isPdfHasLoaded = true;
      });
  }

  public toggleDisclaimer(event) {
    this.disclaimerChecked = event.target.checked;
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openSmc(chatContent) {
    this.modalService.open(chatContent, ModalSizes.lg)
    this.isPendingMessageWrite = false;
  }

  openSmv(voiceAPIContent) {
    this.modalService.open(voiceAPIContent, ModalSizes.lg)
  }

  openSourceModal(sourceContent) {
    this.previewSourceDoc(); 
    this.modalService.open(sourceContent, ModalSizes.lg)
  }


  public previewSourceDoc() {
      //this.testService.getUrl(`get-file/${doc.id}/source`)
      this.testService.getUrl(`get-file/${this.sourceDocId}/source`)
        .subscribe((data) => {
          const base64Url = 'data:application/pdf;base64,' + data.file;
          this.pdfViewerSourcePdf.load(base64Url, '');
          this.pdfViewerSourcePdf.enableHyperlink = false;
        })
    
  }

  public dismissModal() {
    this.modalService.dismissAll();
    if (this.disclaimerChecked) {
      this.disclaimerAccepted = true;
      //this.acceptDisclaimerMethod(); 
      //this.onPdfViewerLoad(); 

    }
    else {
      this.disclaimerAccepted = false;
      Swal.fire(
        "Disclaimer",
        "Please accept the disclaimer to continue.",
        "error"
      );
      this.router.navigate(["/portal"]);
    }
  }

  downloadOfflineClicked() {
    this.eventEmitterService.onFirstComponentButtonClick();
  }

  showCollapseOptions(){
    //alert("Collapse Options")
    this.collapseOptionsVisible = !this.collapseOptionsVisible
  }

  verifyScanOTP() {
    this.imageURLList = [];
    //this.eventEmitterService.onValidateScannedImagesOTP(); 
    let otpToValidate = document.getElementById('otpToValidate')['value'];
    const qrCodePayload = {
      testId: this.testId,
      studentId: this.studentId,
      OTP: Number(otpToValidate),
    }
    this.inTestWriteService.verifyScannedOTP(qrCodePayload.OTP, qrCodePayload.testId, qrCodePayload.studentId).subscribe((data: string[]) => {
      this.imageURLList = data;
      this.showEditor = true;
      // this.cd.detectChanges();
    })

    // this.eventEmitterService.onValidateScannedImagesOTP(this.imageURLList); 
  }

  private onPdfViewerLoad() {

    if (this.disclaimerAccepted) {

      this.previewQuestionPaperDocument();
      this.getQuestionPaperText();
    }
    else {

      this.openSm(this.content);
    }
  }

  private previewQuestionPaperDocument() {
    //this.testService.getUrl(`get-questionpaper-file/${this.testId}/${this.studentId}`)
    this.testService.getUrl(`get-dbtest-with-file/${this.testId}/${this.studentId}`)
      .subscribe((data) => {

        this.test = data.exam;
        if (data.file) {
          const base64Url = 'data:application/pdf;base64,' + data.file;
          this.pdfTestViewer.load(base64Url, '');

          this.pdfTestViewer.enableTextSelection = true;
          if (data.exam.testDuration) {
            localStorage.setItem('extraTime',data.exam.extraTime);
            this.getTestDurationTime(data.exam.testDuration);
            this.setStartDate(this.testId, this.studentId);
            this.addExtratime();
          }
        }
        this.isPdfHasLoaded = true;
      });
    this.getVoicesPostSEBLaunch();
    //}
  }

  getVoicesPostSEBLaunch() {
    this.voices = window.speechSynthesis.getVoices();
    this.selectedVoice = (this.voices[0] || null);
    if (this.voices.length == 0) {
    }
    else {

    }
  }

  private getQuestionPaperText() {

    this.testService.getUrl(`get-questionpaper-text/${this.testId}`)
      .subscribe((data) => {
        this.fullQuestionPaperText = data

      });
  }

  private getSourcePaperText() {
 console.log(this.testId);
    this.testService.getUrl(`get-sourcepaper-text/${this.testId}`)
      .subscribe((data) => {
        this.fullSourcePaperText = data
        console.log(data); 

      });
  }

  private checkPdfIsLoaded() {
    if (this.pdfTestViewer && !this.isPdfHasLoaded) {
      this.isPdfHasLoaded = true;
      return true;
    }
    else {
      return false;
    }
  }

  private getStudentTestDetails() {
    //this.getQuestionPaperText();


    if (!this.testId) return;

    this.studentTestWriteService.getStudentTestDetails(this.testId, this.studentId)
      .subscribe((data) => {
        this.setStudentsTestData(data[0]);
        if (this.workOffline = "1") {
          this.iWorkOffline = 1;
        } else {
          this.iWorkOffline = 0;
        }
      })


    const qrCodePayload = {
      testId: this.testId,
      studentId: this.studentId,
    }

    this.qrDataUrl = environment.baseUrlSandbox + `scan-document?testId=${qrCodePayload.testId ?? ''}&studentId=${qrCodePayload.studentId ?? ''}`
  }

  public openOfflineAnswerPane() {
    this.router.navigate(['/portal/test-writing/test-writing-management', 0, 0, "", ""]);
  }

  public setStudentsTestData(studentTestData: StudentTestWriteInformation) {
    this.electronicReader = true,
    this.answerScanningAvailable = studentTestData.answerScanningAvailable,
    this.accomodation = studentTestData.accomodation,
    this.studentExtraTime = studentTestData.studentExtraTime,
    this.tts = studentTestData.tts,
    this.studentName = studentTestData.studentName,
    this.workOffline = studentTestData.workOffline,
    this.testName = studentTestData.testName;
    const testDuration = studentTestData.testDuration.split(":");
    this.getTestDurationTime(studentTestData.testDuration);
    this.setCountDown();
    this.setStartDate(this.testId, this.studentId);

    this.studentsTestData = {
      id: this.user.id,
      studentId: this.user.id,
      testID: this.testId,
      testName: this.testName,
      tts: this.tts,
      //electronicReader:this.electronicReader,
      electronicReader: true,
      accomodation: this.accomodation,
      //testDuration: this.testDuration;
      studentExtraTime: this.studentExtraTime,
      //endDate?: Date; 
      workOffline: this.workOffline,
      answerScanningAvailable: this.answerScanningAvailable,
      studentName: this.user.fullName,
      grade: 0,
      subject: "string",
      //Data 
      questionPageCount: 0
    }

    this.storageService.saveStudentData(this.studentsTestData);
    // this.previewQuestionPaperDocument();
    this.getQuestionPaperText();
  }

  async getStudentTestChats() {
    this.studentsChatlist = []; 
    const appRef = collection(this.db, 'CloudMessagingStagePortal')
    //const appQuery = query(appRef,where('testID', '==', String(this.selectedTestId)),where('studentID', '==', String(this.user.id)));
    const appQuery = query(appRef, where('studentID', '==', Number(this.user.id)), where('testID', '==', Number(this.testId)), orderBy('createdAt', 'asc'));
    //const appQuery = query(appRef,where('studentID', '==',Number(this.user.id)),orderBy ('studentID', 'asc'));
    // const appQuery = query(appRef,where('testID', '==', `${this.testId}`));
    //const appQuery = query(appRef);
    const querySnapshot = await getDocs(appQuery);
    querySnapshot.forEach((doc) => {
      /*doc.data() is never undefined for query doc snapshots
        );*/
      let InvgChat = new TestChat();
      
      InvgChat.name = doc.data().name;
      InvgChat.message = doc.data().message;
      InvgChat.fromStudent = doc.data().fromStudent;
      InvgChat.fromTeacher = doc.data().fromTeacher;
      InvgChat.testID = doc.data().testID;
      InvgChat.id = doc.data().studentID;
      InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
      InvgChat.studentReadStatus = doc.data().studentReadStatus;
      InvgChat.studentID = doc.data().studentID;
      this.studentsChatlist.push(InvgChat)
      this.messagesRead = InvgChat; 
    });
    this.messages = this.studentsChatlist.map(x => `${x.name}:${x.message}`).join('\n')
     this.updateReadStatus(this.messagesRead)
  }



  async getTestBulkMessages() {
    this.bulkMessageList = []; 
    const appRef = collection(this.db, 'CloudBroadcastMessaging')
    const appQuery = query(appRef, where('studentID', '==', 0),where('testID', '==',Number(this.testId)), orderBy('createdAt', 'asc')); 
    const querySnapshot = await getDocs(appQuery);
    querySnapshot.forEach((doc) => {
     
      let InvgChat = new TestChat();
      InvgChat.name = doc.data().name;
      InvgChat.message = doc.data().message;
      InvgChat.fromStudent = doc.data().fromStudent;
      InvgChat.fromTeacher = doc.data().fromTeacher;
      InvgChat.testID = doc.data().testID;
      InvgChat.id = doc.data().studentID;
      InvgChat.teacherReadStatus = doc.data().teacherReadStatus;
      InvgChat.studentReadStatus = doc.data().studentReadStatus;
      InvgChat.studentID = doc.data().studentID;
      
      this.bulkMessageList.push(InvgChat)

    });
    
    this.bulkMessages = this.bulkMessageList.map(x => `${x.name}:${x.message}`).join('\n')
    this.updateBulkReadStatus(this.bulkMessagesRead)
  }
  
  private initForms(): void {

    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      testName: ['', [Validators.required]],
      testChatMessage: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
    });
    this.submitted = false;
  }

  public onStudentChatMessgeSend(testData: TestChat): any {

    let testChatMessagetextArea = document.getElementById('testChatMessageArea');
    testChatMessagetextArea.append(this.user.firstName + ":" + this.f.testChatMessage.value);
    this.textToSend = "" + " " + this.f.testChatMessage.value
    this.f.testChatMessage.setValue('');

    var testData: TestChat;

    testData = {
      testID: Number(this.testId),
      id: Number(this.testId),
      studentID: Number(this.user.id),
      name: this.user.fullName,
      message: this.textToSend,
      otpMessage: "0",
      fromStudent: "1",
      fromTeacher: "0",
      studentReadStatus: "Read",
      teacherReadStatus: "Unread",
      createdAt: serverTimestamp()
    }; // valid

    const collectionInstance = collection(this.db, 'CloudMessagingStagePortal');
    addDoc(collectionInstance, testData)
      .then(() => {

      })
      .catch(() => {

      })
  }

  public onCodeResult(result: string) {
    this.scanResult = result
  }

  public scanSuccessHandler($event: any) {


    //this.information = "Espera recuperando informaciÃ³n... ";

    const appointment = new ImageScan($event);
    //this.scanLogService.logAppointment(appointment).subscribe((result: OperationResponse) => {
    this.inTestWriteService.qrCodeScanResult(appointment).subscribe((result) => {
      //this.inTestWriteService.qrCodeScanResultString("").subscribe((result)=> {
      //this.information = $event;
      this.transports = result.object;
      this.cd.markForCheck();
    },
      () => {
        //this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      });
  }
  /*public setStartDate(testId: number, id: number) {
    this.studentTestService.setStudenTestStartDate(testId,id)
    .subscribe((data)=>{
    })
  }*/
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    /*this.information = "No se ha detectado informaciÃ³n de ningÃºn cÃ³digo. Acerque un cÃ³digo QR para escanear.";*/
  }

  public openStudentsTestChats() {
    this.getStudentTestChats();
    this.getTestBulkMessages(); 
    //this.openSm(this.chatContent);
    this.openSmc(this.chatContent);
  }

  public openVoiceAPIModal() {
    this.openSmv(this.voiceAPIContent);
  }

  public openModal(modal: any) {

    this.modalService.open(modal, ModalSizes.lg);
  }

  public sourceDocumentsClicked() {
   // console.log("."); 
    //this.ejDialog.show(true);
    //this.modalService.open(this.sourceContent, { size: 'sm' });
    this.openSourceModal(this.sourceContent);
    //this.modalService.open(modal, ModalSizes.lg);
    //console.log("clicked")
  }

  private toMillesecond(hours: number, minutes: number, seconds: number = 0) {
    hours = Number(hours);
    minutes = Number(minutes);
    seconds = Number(seconds);

    hours = isNaN(hours) ? 0 : hours;
    minutes = isNaN(minutes) ? 0 : minutes;
    seconds = isNaN(seconds) ? 0 : seconds;

    const milliseconds = 60 * 1000;
    const hoursToMillisecons = hours * 60 * milliseconds;
    const minutesToMillisecons = minutes * milliseconds;
    const secondsToMillisecons = seconds * 1000;
    return hoursToMillisecons + minutesToMillisecons + secondsToMillisecons;
  }

  private setCountDown() {
    this.countDown = timer(0, this.tick).subscribe(() => this.counter > 0 ? --this.counter : 0);

    this.countDown$ = interval(1000).pipe(
      map(() => {
        const time = this.testDuration.getTime() - new Date().getTime();
        if (time > 0) {
          localStorage.setItem('remainingTime', String(time));
          this.addExtratime()
          return Math.floor(time / 1000);
        }
        else {
          if (!this.isTestComplete && !isNaN(time)) {
            Swal.fire({
              title: 'Time is Up',
              text: 'Your test time has ran out. Your answers have been saved. Please click on the OK button to return to the assessment screen.',
              icon: 'info'
            }).then(() => {
              this.studentTestWriteService.finishTest(this.testId, this.studentId).subscribe({
                next: (data: any) => {
                  //this.eventEmitterService.onFinishSave();
                  this.router.navigate(["/portal"])
                },
                error: (error) => {
                  Swal.fire({
                    title: "Finish Test Unsuccesful",
                    text: "Please contact administrator",
                    icon: "error"
                  });
                  this.router.navigate(["/portal"]); 
                  return;
                },
                complete: () => {}
              });
            });
          }
          this.isTestComplete = true;
          return 0;
        }
      }));
  }


  public setStartDate(testId: number, id: number) {

    this.studentTestService.setStudenTestStartDate(testId, id)
      .subscribe(() => {

      })
  }


  public lockscreen() {
    if (!document.fullscreenElement) {
      this.openfullscreen();
    }

  }

  openfullscreen() {
    // Trigger fullscreen
    // eslint-disable-next-line no-shadow,@typescript-eslint/no-shadow
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
    this.isFullScreenExited = false;
  }

  ngOnDestroy() {
    localStorage.setItem('onclose', 'closed');
    localStorage.removeItem('isFullScreenExited');
    this.storageService.removeSelectedTestSecurityId();
    this.unlistener();
    speechSynthesis.cancel();
  }

  ngAfterViewChecked() {
    if (window.innerWidth !== screen.width || window.innerHeight !== screen.height) {
    }

    if (this.checkPdfIsLoaded()) {
      this.onPdfViewerLoad();
      this.pdfTestViewer.isExtractText = true;
    }
   
  }

  showScanQRCode() {
    // this.show = !this.show;
    this.showEditor = !this.showEditor;
    this.cd.detectChanges();
  }

  toggleQuestionDiv() {
    alert("Question Div Toggled");
    // this.show = !this.show;
    //this.showEditor = !this.showEditor;
    //this.cd.detectChanges();
  }

  toggleAnswerDiv() {
    alert("Answer Div Toggled")
    // this.show = !this.show;
    //this.showEditor = !this.showEditor;
    //this.cd.detectChanges();
  }

  getOperatingSystem() {
    const userAgent = navigator.userAgent;

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

  public keyPress(keyPressEvent: string) {

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
            this.lockscreen(); 
            return "You need to submit a reason for invalid key combination";
          }
        },
      }).then((result) => {

        //this.invalidCheck(keyPressEvent, document.getElementsByClassName('swal2-textarea')['value'])
        this.saveInvalidKeyPress(keyPressEvent, result.value);
        this.lockscreen(); 
      });
    }
    else {
      //Returning from bypassing invalid submit on exit fullscreen"
      this.lockscreen(); 
      return;

    }
  }


  public OffScreenEvent(offScreenEvent: string) {
    this.toastr.error('Confirm leaving the screen. Confirm Invalid Naviagation!!', 'Invalid Navigation');
    const confirmed = confirm("Confirm Invalid Navigation!!?");
    // Check the user's response
    if (confirmed) {
      //Delete the item
    } else {
      // Cancel the operation
    }
  }

  public finishTestWrite() {
    //alert("FINISHING");
    this.studentTestWriteService.finishTest(this.testId, this.studentId).subscribe({
    next: (data: any) => {
      setTimeout(() => {
        Swal.fire({
          title: 'Are you sure you want to finish your test,  return to the test list?',
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
        localStorage.setItem('RemainingTime', '0');
         Swal.fire(
          'Test Completed',
          'You have successfully completed your test. Resume from test list or close your browser.',
          'success'
          ); 
            this.router.navigate(["/portal"])
          } else if (result.isDenied) {
           // stay on current page
          }
        })
      }, 2000);

       },
       error: (error) => { 
        Swal.fire({
          title: "Finish Test Unsuccesful",
          text: "Please contact administrator",
          icon: "error"
        });
        return; 
        },
        complete: () => { }
      }); 
      this.isTestComplete = true;
 
  }


  public OffScreenEvent2() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Left test Screen?",
      text: "Please confirm leaving the screen and state reason!",
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes, confirm!",
      allowOutsideClick: false,
      allowEscapeKey: false,
      //cancelButtonText: "No, cancel!",
      //reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Confirmed!",
          text: "invalid navigation confirmed.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
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
    this.inTestWriteService.saveIrregularities(keysPressed).subscribe(() => {

    })
  }

  getTestDurationTime(duration: string) {

    if (!duration.includes(':')) {
      this.testDuration = new Date(Date.parse(new Date().toString()) + Number(duration));
    } else {

      const testDuration = duration.split(":");
      if(!testDuration) return;

      this.testDuration = new Date(Date.parse(new Date().toString()) + this.toMillesecond(Number(testDuration[0]), Number(testDuration[1]), Number(testDuration[2])));
    }
    this.addExtratime();
  }

  addExtratime() {
      
      if (localStorage.getItem('extraTime')) {
        const extraTime = localStorage.getItem('extraTime').split(":");
        localStorage.removeItem('extraTime');
        if(!extraTime) return;
        this.testDuration = new Date(Date.parse(this.testDuration.toString()) + this.toMillesecond(Number(extraTime[0]), Number(extraTime[1]), Number(extraTime[2])));
      }
    }
}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}

