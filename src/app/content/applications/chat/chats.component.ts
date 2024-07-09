import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { UserService } from '../../../../../src/app/_api/user/user.service';
import { ChatService } from '../../../../../src/app/_api/chat/chat.service';
import { Chats } from './chats';
import { AppConstants } from '../../../_helpers/app.constants';
import * as _ from 'lodash';
@Component({
  selector: 'app-chat',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})

export class ChatsComponent implements OnInit, AfterViewInit {
  showicon: boolean;
  name: any;
  isicon: boolean;
  isactive: boolean;
  isSelected: boolean;
  chatArray: any;
  status = true;
  newMessage = '';
  contactId: string;
  messageInfo: any;
  userInfo: any;
  public displayName: boolean;
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: false };

  @ViewChild('chatPS') public chatPS?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true })
  directiveRef?: PerfectScrollbarDirective;
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content', { static: true }) content: ElementRef;

  contactList = [];
  contactChats = [];
  headerName: string;
  headerImage: any;
  showChatInProgress = false;
  createInProgress = false;
  contactMaster = this.contactList;
  chatListMaster = [];
  temp = [];
  loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUserUid = this.loggedInUser.uid;

  currentUser = ''; // UID of user 1
  clickedUser = ''; // UID of user 2
  chatList = [];
  displayChat = [];
  chatId = '';
  senderImage = '';
  currentUserImage = '';
  loadContacts = false;
  prevMsg = '';


  /**
   * Constructor
   *
   * @param ApplicationApiService  chatApiService;
   * @param Renderer2              renderer
   */
  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private chatService: ChatService) {
  }

  /**
   * Scroll chat to bottom
   */
  ngAfterViewInit() {
    this.messages.forEach(this.scrollToBottom);
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  getLoggedInUserChats () {
    if (this.contactChats) {
      const chatsWithHistory = this.contactChats.filter((item: Chats) => {
        return item.chatHistory.length > 0;
      });
      const loggedInUserChats = chatsWithHistory.filter(chatHistory => {
        return chatHistory.name.indexOf(this.loggedInUser.uid) !== -1;
      });
      return loggedInUserChats;
    }
    return [];
  }

  /**
   * OnInit
   */
  ngOnInit() {
      this.userService.getUsers().subscribe(users => {
      let contactList = users.map(item => {
        return {
          ...item.payload.doc.data() as {},
          id: item.payload.doc['id']
        };
      });
      contactList = contactList.filter(element => {
        return this.loggedInUser.uid !== element['uid'];
      });
      this.contactMaster = contactList;
      this.chatService.getChats().subscribe(chats => {
        this.chatList = [];
        this.contactList = [];
        const chatRooms = chats.map(item => {
          return {
            ...item.payload.doc.data() as Chats,
            id: item.payload.doc['id']
          };
        });
        this.contactChats = chatRooms;
        const loggedInUserChats = this.getLoggedInUserChats();

        const contactListMap = [];
        const chatListMap = [];

        this.contactMaster.forEach(element => {
          const userChat = this.isChatExistsWithUser(loggedInUserChats, element.uid);
          if (userChat && !chatListMap[element.uid]) {
            element['chatRoomId'] = userChat['id'];
            if (userChat['chatHistory'] && userChat['chatHistory'].length > 0) {
              const unreadMessages = userChat['chatHistory'].filter( history => {
                return history.uid !== this.loggedInUser.uid && history.status === 'send';
              });
              if (unreadMessages.length > 0 && this.clickedUser !== element.uid) {
                element['unreadMessageCount'] = unreadMessages.length;
              } else {
                element['unreadMessageCount'] = 0;
              }
              element['chatHistory'] = userChat['chatHistory'];
            }
            chatListMap[element.uid] = true;
            this.chatList.push(element);
            this.chatListMaster.push(element);
          } else if (!contactListMap[element.uid]) {
            contactListMap[element.uid] = true;
            this.contactList.push(element);
          }
        });
        this.chatList = _.orderBy(this.chatList, [user => user.name.toLowerCase()], ['asc']);
        this.contactList = _.orderBy(this.contactList, [user => user.name && user.name.toLowerCase()], ['asc']);
        this.currentUserImage = this.loggedInUser.photoURL;
        this.senderImage = this.contactList[0].image;
        this.createInProgress = false;
      });
    });

  }

  isChatExistsWithUser (userChats, userId) {
    for (let index = 0; index < userChats.length; index++) {
      if (userChats[index].name.indexOf(userId) !== -1) {
        return userChats[index];
      }
    }
    return false;
  }

  /**
   * Chat scroll to bottom
   */
  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
      this.chatPS.directiveRef.scrollToBottom(0, 500);
    } catch (err) { }
  }

  /**
   * Filter Chat
   *
   * @param event     search event
   */
  searchContact (event) {
    const value = event.target.value.toLowerCase();
    // filter our data
    let temp = this.contactMaster.filter(function (d) {
      return d.name && d.name.toLowerCase().indexOf(value) !== -1 || !value;
    });
    const loggedInUserChats = this.getLoggedInUserChats();
    const _self = this;
    temp = temp.filter(function (user) {
      return !_self.isChatExistsWithUser(loggedInUserChats, user.uid);
    });
    // update the rows
    this.contactList = [];
    const contactListMap = [];
    temp.forEach(element => {
      if (!contactListMap[element.uid]) {
        contactListMap[element.uid] = true;
        this.contactList.push(element);
      }
    });

    // filter our data
    const tempChat = this.chatListMaster.filter(function (d) {
      return d.name && d.name.toLowerCase().indexOf(value) !== -1 || !value;
    });
    // update the rows
    this.chatList = [];
    const chatListMap = [];
    tempChat.forEach(element => {
      if (!chatListMap[element.uid]) {
        chatListMap[element.uid] = true;
        this.chatList.push(element);
      }
    });
  }

  /**
   * Send message
   */
  sendMessage() {
    if (this.newMessage !== null && this.newMessage !== '') {
      this.messageInfo = {
        message: this.newMessage,
        date: Date.now(),
        uid: this.loggedInUser.uid,
        status: 'send'
      };
      if (this.chatId !== '') {
        this.chatService.sendMessage(this.chatId, this.messageInfo);
      } else {
        this.currentUser = this.loggedInUser.uid;
        const roomName = (this.currentUser < this.clickedUser ? this.currentUser + '_' +
          this.clickedUser : this.clickedUser + '_' + this.currentUser);
        this.userInfo = {
          uid: this.loggedInUser.uid,
          name: roomName,
          image: this.loggedInUser.photoURL,
          time: Date.now(),
          showMessage: '',
          badge: '',
          showicon: true,
          isicon: false,
          isactive: 'online',
          isSelected: false,
          chatHistory: []
        };
        // Add message to box before sending
        this.displayChat.push(this.messageInfo);
        this.createInProgress = true;
        this.chatService.createChatRoom(this.userInfo).then(chatRoom => {
          this.chatId = chatRoom.id;
          this.loadChatRoom(chatRoom.id);
          this.chatService.sendMessage(this.chatId, this.messageInfo);
          this.createInProgress = false;
        });
      }
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
    this.sendMessage();
  }

  /**
   * Display chat when click on contact
   *
   * @param friendId      Friend id
   */
  showChat(data) {
    if (this.showChatInProgress || this.createInProgress) {
      return;
    }
    this.showChatInProgress = true;
    this.currentUser = this.loggedInUser.uid;
    this.currentUserImage = this.loggedInUser.photoURL;
    this.clickedUser = data.uid;
    this.contactId = data.id;
    this.senderImage = data.image;
    this.showHeaderData();
    const roomName = (this.currentUser < this.clickedUser ? this.currentUser + '_' +
      this.clickedUser : this.clickedUser + '_' + this.currentUser);

    this.userInfo = {
      uid: this.loggedInUser.uid,
      name: roomName,
      image: this.loggedInUser.photoURL,
      time: Date.now(),
      showMessage: '',
      badge: '',
      showicon: true,
      isicon: false,
      isactive: 'online',
      isSelected: false,
      chatHistory: []
    };

    if (this.contactChats.length === 0) {
      this.createAndLoadChatRoom();
    } else if (this.contactChats.length !== 0) {
      let chatExists = false;
      for (let i = 0; i < this.contactChats.length; i++) {
        const room = this.contactChats[i].name;
        if (room === roomName) {
          chatExists = true;
          this.chatId = this.contactChats[i].id;
          break;
        }
      }
      if (!chatExists) {
        this.createAndLoadChatRoom();
      } else {
        // subscribe
        this.loadChatRoom(this.chatId);
        this.showChatInProgress = false;
        this.userInfo.isSelected = true;
      }
    }
  }

  createAndLoadChatRoom() {
    this.createInProgress = true;
    this.chatService.createChatRoom(this.userInfo).then(chatRoom => {
      this.chatId = chatRoom.id;
      this.loadChatRoom(chatRoom.id);
    });
  }

  setUserImage(chatHistory) {
    for (let i = 0; i < chatHistory.length; i++) {
      if (chatHistory.length > 0) {
        if (i > 0) {
          this.prevMsg = chatHistory[i - 1];
        }
        if (i > 0 && chatHistory[i].uid === this.prevMsg['uid']) {
          continue;
        }
        if (chatHistory[i].uid === this.loggedInUser.uid) {
          chatHistory[i]['userImage'] = this.currentUserImage;
        } else {
          chatHistory[i]['userImage'] = this.senderImage;
        }
      }
    }
  }

  loadMyChatRoom(selectedUser) {
    this.chatId = selectedUser.chatRoomId;
    this.loadChatRoom(selectedUser.chatRoomId);
    this.clickedUser = selectedUser.uid;
    this.contactId = selectedUser.id;
    this.senderImage = selectedUser.image;
    this.headerName = selectedUser.name;
    this.headerImage = selectedUser.image;
    this.setHistoryAsRead(selectedUser, selectedUser.chatRoomId, selectedUser.chatHistory);
  }

  setHistoryAsRead (selectedUser, chatRoomId, history) {
    let unreadMsgExists = false;
    history.forEach(element => {
      if (element.uid !== this.loggedInUser.uid && element.status !== 'read') {
        element.status = 'read';
        unreadMsgExists = true;
      }
    });
    if (unreadMsgExists) {
      this.chatService.updateChatStatus(chatRoomId, history).then(result => {
        delete selectedUser.unreadMessageCount;
      });
    }
  }

  loadChatRoom(chatRoomId) {
    this.chatService.showChat(chatRoomId).subscribe(res => {
      if (chatRoomId === this.chatId) {
        this.setUserImage(res.chatHistory);
        this.displayChat = res['chatHistory'];
        this.chatId = res['chatId'];
      }
      this.showChatInProgress = false;
      this.scrollToBottom();
    });
  }

  showDefaultChat() {
    this.currentUser = this.loggedInUser.uid;
    const roomName = (this.currentUser < this.clickedUser ? this.currentUser + '_' +
      this.clickedUser : this.clickedUser + '_' + this.currentUser);
    for (let j = 0; j < this.contactChats.length; j++) {
      if (this.contactChats[j].name === roomName) {
        if (this.contactChats[j].chatHistory && this.contactChats[j].chatHistory.length > 0) {
          this.displayChat = this.contactChats[j].chatHistory;
          this.setUserImage(this.contactChats[j].chatHistory);
        }
        this.chatId = this.contactChats[j].id;
      }
    }
  }

  showLastMessage() {
    for (let i = 0; i < this.contactList.length; i++) {
      if (this.contactList[i]) {
        for (let j = 0; j < this.contactChats.length; j++) {
          const room = this.contactChats[j].name;
          const index = room.indexOf(this.contactList[i].uid);
          const currentUser = this.loggedInUser.uid;
          const userUid = this.contactList[i].uid;
          const roomName = (currentUser < userUid ? currentUser + '_' +
            userUid : userUid + '_' + currentUser);
          if (index >= 0) {
            if (this.contactChats[j].chatHistory.length > 0 && roomName === room) {
              this.contactList[i]['lastmsg'] = this.contactChats[j].chatHistory[this.contactChats[j].chatHistory.length - 1].message;
              this.contactList[i]['isActive'] = this.contactChats[j].isactive;
              this.contactList[i]['icon'] = this.contactChats[j].isicon;
              this.contactList[i]['showicon'] = this.contactChats[j].showicon;
              this.contactList[i]['lastmsgTime'] = this.contactChats[j].chatHistory[this.contactChats[j].chatHistory.length - 1].date;
            }
          }
        }
      }
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
  Sidebar(event) {
    const toggleChat = document.getElementById('sidebar-card');
    const toggleIcon = document.getElementById('chat-profile');
    const toggle = document.getElementById('overlayChat');
    if (event.currentTarget.className === 'chat-sidebar-close' || 'chat-overlay') {
      this.renderer.removeClass(toggle, 'show');
      this.renderer.removeClass(toggleIcon, 'show');
      this.renderer.removeClass(toggleChat, 'show');
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
  // FixChat() {
  //   const toggleIcon = document.getElementById('sidebar-left');
  //   if (window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH) {
  //     this.renderer.removeClass(toggleIcon, 'sidebar-fixed');
  //   }
  // }
  chatFavorite(event) {
    const chatIcon = document.getElementById('chat-icon');
    if (event.currentTarget.className === 'chat-icon-favorite') {
      this.renderer.addClass(chatIcon, 'warning');
    } else if (event.currentTarget.className === 'chat-icon-favorite warning') {
      this.renderer.removeClass(chatIcon, 'warning');
    }
  }

  showHeaderData() {
    this.contactList.forEach(element => {
      if (this.clickedUser === element['uid']) {
        this.headerName = element.name;
        this.headerImage = element.image;
      }
    });
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
