import {
  Component, OnInit, AfterViewInit, ViewChild, Renderer2,
  ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ApplicationApiService } from '../../../../../../src/app/_services/application-api.service';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from '../../../../_helpers/app.constants';
/**
 * ChatHistory class
 */
class ChatHistory {
  constructor(
    public message: string[],
    public sender: number,
    public senderImage: string,
    public senderName: string,
    public time: string
  ) { }
}
class ChatHeader {
  constructor(
    public senderImage: string,
    public senderName: string
  ) { }
}
class ContactHeader {
  constructor(
    public senderImage: string,
    public senderName: string
  ) { }
}


/**
 * Chats class
 */
class Chats {
  constructor(
    public friendId: number,
    public name: string,
    public image: string,
    public showMessage: string,
    public _ChatHistory: Array<ChatHistory>,
    public chatHeader: Array<ChatHeader>,
    public isSelected: false
  ) { }
}
/**
 * Contact class
 */
class Contact {
  constructor(
    public friendId: number,
    public name: string,
    public image: string,
    public showMessage: string,
    public isSelected: false,
    public contactHeader: Array<ContactHeader>,
  ) {}
  }
@Component({
  selector: 'app-static-chat',
  templateUrl: './static-chat.component.html',
  styleUrls: ['./static-chat.component.css']
})
export class StaticChatComponent implements OnInit, AfterViewInit {
  showicon: boolean;
  isicon: boolean;
  isactive: boolean;
  isSelected: boolean;
  chatArray: any;
  headerArray: any;
  status = true;
  public contactChat = [];
  public headerChat = [];
  public Contact = [];
  newMessage = '';
  newMessageArray = [];

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: false };

  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content', { static: true }) content: ElementRef;

  chatsList: any[] = [];
  contactList: any[] = [];
  temp = [];
  temp2 = this.chatsList;
  temp3 = this.contactList;
  ContactHeader: any[] = [];

  /**
   * Constructor
   *
   * @param ApplicationApiService  chatApiService;
   * @param Renderer2              renderer
   */
  constructor(
    private chatApiService: ApplicationApiService,
    private renderer: Renderer2,
    private toastr: ToastrService) {
    this.headerArray = this.chatApiService.getChatContactData().subscribe(Response => {
      this.headerArray = Response;
    });
  }

  /**
   * Scroll chat to bottom
   */
  ngAfterViewInit() {
    this.messages.forEach(this.scrollToBottom);
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  /**
   * OnInit
   */
  ngOnInit() {
    this.toastr.clear();
     this.toastr.warning('', 'Please login through a personal account to experience the Live chat. We have it disabled for demo account.',
      { timeOut: 5000, disableTimeOut: true, closeButton: true });
    this.chatArray = this.chatApiService.getChatsData().subscribe(Response => {
      this.chatArray = Response;
      this.contactChat = this.chatArray[2].ChatHistory;
        this.chatsList.push(
        new Chats(
          2,
          'Kristopher Candy',
          '../../../assets/images/portrait/small/avatar-s-7.png',

          ' Thank you',

          this.chatArray[1].ChatHistory,
          this.chatArray[1].chatHeader,
          false
        )
      );
      this.chatsList.push(
        new Chats(
          3,
          'Sarah Woods',
          '../../../assets/images/portrait/small/avatar-s-8.png',

            ' Hello krish!',

          this.chatArray[2].ChatHistory,
          this.chatArray[2].chatHeader,
          false
        )
      );
      this.contactList.push(
        new Contact(
          1,
          'Kristopher Candy',
          '../../../assets/images/portrait/small/avatar-s-9.png',
          'lemon drops',
          false,
          this.headerArray[0].contactHeader,
       )
      );
      this.contactList.push(
        new Contact(
          2,
          'Jenny Perich',
          '../../../assets/images/portrait/small/avatar-s-10.png',
          'candy canes',
          false,
          this.headerArray[1].contactHeader,
       )
      );
      this.contactList.push(
        new Contact(
          3,
          'Rock Montgomery',
          '../../../assets/images/portrait/small/avatar-s-11.png',
          'powder gum',
          false,
          this.headerArray[2].contactHeader,
        )
      );
      this.contactList.push(
        new Contact(
          4,
          'Heather Howell',
          '../../../assets/images/portrait/small/avatar-s-12.png',
          'cheesecake toffee',
          false,
          this.headerArray[3].contactHeader,
        )
      );
     });
   }

  /**
   * Chat scroll to bottom
   */
  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  /**
   * Filter Chat
   *
   * @param event     search event
   */
  updateFilter(event) {
    const value = event.target.value.toLowerCase();
    this.chatsList = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.chatsList];
    // filter our data
    const temp = this.chatsList.filter(function (d) {
      return d.name.toLowerCase().indexOf(value) !== -1 || !value;
    });
    // update the rows
    this.chatsList = temp;
    // Whenever the filter changes, always go back to the first page
  }
  updateFilter1(event) {
    const value = event.target.value.toLowerCase();
    this.contactList = [...this.temp3]; // and here you have to initialize it with your data
    this.temp = [...this.contactList];
    // filter our data
    const temp = this.contactList.filter(function (d) {
      return d.name.toLowerCase().indexOf(value) !== -1 || !value;
    });
    // update the rows
    this.contactList = temp;
    // Whenever the filter changes, always go back to the first page
  }
  /**
   * Send message
   */
  sendMessage() {
    if (this.newMessage !== null && this.newMessage !== '') {
      this.contactChat.push({
        message: [this.newMessage],
        sender: 0,
        senderImage: '',
        time: '3:35AM',
      });
      this.newMessage = null;
    }
  }

  /**
   * Message send on Enter
   *
   * @param value       New message
   */
  onEnter(value: string) {
    this.newMessage = value;
    if (this.newMessage !== null && this.newMessage !== '') {
      this.contactChat.push({
        message: [this.newMessage],
        sender: 0,
        senderImage: '',
        time: '3:35AM'
      });
      this.newMessage = null;
    }
  }

  /**
   * Display chat when click on contact
   *
   * @param friendId      Friend id
   */
  showChat(friendId, number) {
    this.contactChat = [];
    if (number === 1) {
      for (let i = 0; i < this.chatsList.length; i++) {
        if (friendId !== this.chatsList[i].friendId) {
          this.chatsList[i].isSelected = false;
        }
        if (friendId === this.chatsList[i].friendId) {
          this.chatsList[i].isSelected = true;
        }
      }
      for (let i = 0; i < this.contactList.length; i++) {
        this.contactList[i].isSelected = false;
      }

      for (const friend of this.chatsList) {
        if (friend.friendId === friendId) {
          this.contactChat = this.chatArray[friendId - 1].ChatHistory;
          this.headerChat = this.chatArray[friendId - 1].chatHeader;
          break;
        }
      }

    } else if (number === 2) {
      for (let i = 0; i < this.contactList.length; i++) {
        if (friendId !== this.contactList[i].friendId) {
          this.contactList[i].isSelected = false;
        }
        if (friendId === this.contactList[i].friendId) {
          this.contactList[i].isSelected = true;
        }
      }
      for (let i = 0; i < this.chatsList.length; i++) {
        this.chatsList[i].isSelected = false;
      }
      this.contactChat = [];
      this.headerChat = this.headerArray[friendId - 1].contactHeader;
    }
  }




  /**
   * Overlay add/remove fuction in responsive
   *
   * @param event     Overlay click event
   */
  contentOverlay(event) {
    const toggleIcon = document.getElementById('chat-overlay1');
    const toggle = document.getElementById('chat-area d-none');
    if (event.currentTarget.className === 'chatSidebar ng-star-inserted') {
      this.renderer.addClass(toggleIcon, 'd-none');
      this.renderer.removeClass(toggle, 'd-none');
    }
  }
  /**
  * Warning add/remove class
  *
  * @param event    click event
  */
  chatFavorite(event) {
    const chatIcon = document.getElementById('chat-icon');
    if (event.currentTarget.className === 'chat-icon-favorite') {
      this.renderer.addClass(chatIcon, 'warning');
    } else if (event.currentTarget.className === 'chat-icon-favorite warning') {
      this.renderer.removeClass(chatIcon, 'warning');
    }
  }
  showContact(friendId) {
    this.contactChat = [];
    for (let i = 0; i < this.contactList.length; i++) {
      if (friendId !== this.contactList[i].friendId) {
        this.contactList[i].isSelected = false;
      }
      if (friendId === this.contactList[i].friendId) {
        this.contactList[i].isSelected = true;
      }
    }
  }
  /**
  * Show add/remove class at open profile
  *
  * @param event    Overlay click event
  */
  showProfile(event) {
    const toggleIcon = document.getElementById('user-profile');
    const toggle = document.getElementById('overlayChat');
    if (event.currentTarget.className === 'chat-sidebar-profile-toggle') {
      this.renderer.addClass(toggleIcon, 'show');
     this.renderer.addClass(toggle, 'show');
    } else if (event.currentTarget.className === 'chat-profile-close') {
      this.renderer.removeClass(toggleIcon, 'show');
    this.renderer.removeClass(toggle, 'show');
    }
  }
  /**
   * Show add/remove function in responsive
   *
   * @param event    Overlay click event
   */
  showSidebar(event) {
    if (window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH) {
      const toggleIcon = document.getElementById('sidebar-card');
      const toggle = document.getElementById('overlayChat');
      const toggleChat = document.getElementById('sidebar-left');
      if (event.currentTarget.className === 'ficon feather ft-message-square chat-sidebar-toggle chat-start-icon font-large-3 p-3 mb-1' ||
        'ficon feather ft-align-justify font-large-1 cursor-pointer') {
        this.renderer.addClass(toggle, 'show');
        this.renderer.addClass(toggleIcon, 'show');
      }
      if (window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH) {
        this.renderer.removeClass(toggleChat, 'sidebar-fixed');
      }
    }
  }
  /**
    * Show add/remove function in responsive
    *
    * @param event    Overlay click event
    */
  Sidebar(event) {
    const toggleChat = document.getElementById('sidebar-card');
    const toggleIcon = document.getElementById('chat-profile');
    const toggle = document.getElementById('overlayChat');
    if (event.currentTarget.className === 'chat-sidebar-close' || 'chat-overlay show') {
     this.renderer.removeClass(toggle, 'show');
    this.renderer.removeClass(toggleChat, 'show');
    this.renderer.removeClass(toggleIcon, 'show');
    }
  }
  /**
    * Show add/remove function
    *
    * @param event    Overlay click event
    */
  ShowChatProfile(event) {
    const toggleIcon = document.getElementById('chat-profile');
    const toggle = document.getElementById('overlayChat');
    if (event.currentTarget.className === 'avatar chat-profile-toggle m-0 mr-1') {
      this.renderer.addClass(toggleIcon, 'show');
      this.renderer.addClass(toggle, 'show');
    }
  }
  /**
  * Show add/remove function
  *
  * @param event    Overlay click event
  */
  ChatProfile(event) {
    const toggleIcon = document.getElementById('chat-profile');
    const toggle = document.getElementById('overlayChat');
    if (event.currentTarget.className === 'chat-profile-close') {
      this.renderer.removeClass(toggleIcon, 'show');
      this.renderer.removeClass(toggle, 'show');
    }
  }
}
