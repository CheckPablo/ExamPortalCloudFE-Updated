import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ApplicationApiService } from '../../../_services/application-api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { QuillInitializeServiceService } from '../../../_services/quill-initialize-service.service';

class Email {
  constructor(
    public emailId: number,
    public mediaClass: string,
    public starClass: string,
    public starIcon: string,
    public image: any,
    public time: string,
    public title: string,
    public message: string,
    public showicon: boolean,
    public bullet: string,

  ) { }
}

class EmailHistory {
  constructor(
    public emailId: number,
    public username: string,
    public email: string,
    public image: any,
    public date: any,
    public title: string,
    public message: string,
    public descrition: string,
    public descrition_detail: string,
    public sender: string,
    public sender_name: string,
    public iconClass: string,
    public image_icon1: string,
    public file_name1: string,
    public image_icon2: string,
    public file_name2: string
  ) { }
}
class EmailMenu {
  constructor(
    public Id: string,
    public name: string,
    public icon: string,
    public budge: string,
    public budgeClass: string,
    public budgeIcon: boolean,
    public isSelected: false
  ) { }
}
class EmailLable {
  constructor(
    public Id: string,
    public name: string,
    public isSelected: boolean,
    public bulletClass: string,
  ) { }
}
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent)
  componentRef?: PerfectScrollbarComponent;
  directiveRef?: PerfectScrollbarDirective;
  @ViewChild(PerfectScrollbarDirective, { static: true })

  isHidden = false;
  isShown = true;
  emailList: any[] = [];
  emailDisplayList: any[] = [];
  emailMenuList: any[] = [];
  email: EmailHistory[];
  emailLable: EmailLable[];
  emailArray: any;
  temp = [];
  temp2 = this.emailList;
  isSelected: boolean;
  isCollapsed = false;
  selectAll = false;
  selected: [];
  blured = false;
  focused = false;
  hide = false;
  htmlText = 'Type Something';
  form: FormGroup;
  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ];
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
      ]
    },
    autoLink: true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range, context) => {
            
            return true;
          }
        }
      }
    }
  };
  emailquillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
      ]
    },
    autoLink: true
  };

  /**
   * Constructor
   *
   * @param ApplicationApiService     emailApiService
   * @param Renderer2                 renderer
   */
  constructor(
    private emailApiService: ApplicationApiService,
    private renderer: Renderer2,
    private QuillInitializeServiceServicec: QuillInitializeServiceService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      editor: ['']
    });
  }

  /**
   * OnInit
   */
  ngOnInit() {
    this.emailApiService.getEmailData().subscribe(Response => {
      this.emailArray = Response;
      this.emailDisplayList = Response.EmailHistory;
      this.emailMenuList = Response.EmailMenu;
      this.emailLable = Response.EmailLable;
      this.email = this.emailArray.EmailHistory[1];
      this.emailList.push(
        new Email(
          1,
          'media mail-read',
          'favorite warning',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-1.png',
          '4.14 AM',
          'Open source project public release 👍',
          'Hey John, bah kivu decrete epanorthotic unnotched Argyroneta nonius veratrine preimaginary ',
          false,
          'gradient-mint',
        )
      );
      this.emailList.push(
        new Email(
          2,
          'media mail-read',
          'favorite',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-2.png',
          '2.15 AM',
          'Ecommerce website Paypal integration 😃',
          ' We will start the new application development soon once this will be completed. ',
          false,
          'gradient-danger',
        )
      );
      this.emailList.push(
        new Email(
          3,
          'media',
          'favorite warning',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-3.png',
          '11.18AM',
          'How To Set Intentions That Energize You',
          ' I will provide you more details after this Saturday. Hope that will be fine for you.. ',
          true,
          'gradient-mint',
        )
      );
      this.emailList.push(
        new Email(
          4,
          'media',
          'favorite',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-4.png',
          'Yesterday',
          'Harness The Power Of Words In Your Life',
          'When the equation, first to ability the forwards, the a but travelling, outlines sentinels bad expand to goodness....',
          true,
          'gradient-warning',
        )
      );
      this.emailList.push(
        new Email(
          5,
          'media mail-read',
          'favorite',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-5.png',
          '24 Feb',
          'Helen Keller A Teller And A Seller',
          'Thanks for your feedback ! Here`s a new layout for a new Modern Admin theme.',
          true,
          'gradient-warning',
        )
      );
      this.emailList.push(
        new Email(
          6,
          'media mail-read',
          'favorite warning',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-6.png',
          '15 March',
          'Use Your Reset Button To Change Your Vibration 🎉',
          'Hey John, bah kivu decrete epanorthotic unnotched Argyroneta nonius veratrine preimaginary',
          false,
          'gradient-info',
        )
      );
      this.emailList.push(
        new Email(
          7,
          'media',
          'favorite',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-7.png',
          '12-07-2019',
          'Will connect you',
          'Hi Kelly!',
          false,
          'gradient-mint',
        )
      );
      this.emailList.push(
        new Email(
          8,
          'media mail-read',
          'favorite',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-8.png',
          '03-29-2019',
          'Harness The Power Of Words In Your Life',
          'Hope your like it, or feel free to comment, feedback or rebound !',
          false,
          'gradient-danger'
        )
      );
      this.emailList.push(
        new Email(
          9,
          'media ',
          'favorite warning',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-9.png',
          '19 Jun',
          'Hypnosis 12 Steps To Acquire Mind Power',
          'Monstrous with geared from far and these, morals, phase rome; Class. Called get amidst of geared from next...',
          false,
          'gradient-info'
        )
      );
      this.emailList.push(
        new Email(
          10,
          'media ',
          'favorite warning',
          'ficon feather ft-star',
          '../../../assets/images/portrait/small/avatar-s-10.png',
          '21 Mar',
          ' Know Yourself Your Inner Power ',
          ' Hope your like it, or feel free to comment, feedback or rebound.',
          false,
          'gradient-warning'
        )
      );

    });
    this.form
      .controls
      .editor
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
      });

  }

  /**
 * Search email
 *
 * @param event     Convert value uppercase to lowercase;
 */
  updateFilter(event) {
    const value = event.target.value.toLowerCase();
    this.emailList = [...this.temp2]; // and here you have to initialize it with your data
    this.temp = [...this.emailList];
    // filter our data
    const temp = this.emailList.filter(function (d) {
      return d.name.toLowerCase().indexOf(value) !== -1 || !value;
    });
    // update the rows
    this.emailList = temp;
    // Whenever the filter changes, always go back to the first page
  }
  /**
   * Overlay add/remove fuction in responsive
   *
   * @param event     Overlay click event
   */
  contentOverlay(event) {
    const toggleIcon = document.getElementById('email-app-menu');
    const toggle = document.getElementById('content-overlay');
    if (event.currentTarget.className === 'content-overlay show') {
      this.renderer.removeClass(toggleIcon, 'show');
      this.renderer.removeClass(toggle, 'show');
    }
  }

  /**
   * Add overlay when open sidebar
   *
   * @param event     Content overlay
   */
  contentRightSidebar(event) {
    const toggle = document.getElementById('content-right');
    if (event.currentTarget.className === 'media _media border-0 ng-star-inserted active') {
      this.renderer.addClass(toggle, 'show');
    }
  }

  /**
   * Remove overlay when close sidebar
   *
   * @param event     Content overlay
   */
  contentRight(event) {
    const toggle = document.getElementById('content-right');
    if (event.currentTarget.className === 'btn btn-primary go-back') {
      this.renderer.removeClass(toggle, 'show');
    }
  }
  /**
   * Open Media-body
   *
   * @param event   Mail Read
   */
  showEmail(event) {
    const toggleIcon = document.getElementById('app-details');
    if (event.currentTarget.className === 'media-body') {
      this.renderer.addClass(toggleIcon, 'show');
    } else if (event.currentTarget.className === 'ficon feather ft-chevron-left font-medium-4 align-middle') {
      this.renderer.removeClass(toggleIcon, 'show');
    }
  }
  /**
   *
   * @'param' event
   * @'param' emailId
   */
  showMassage(event, emailId) {
    for (let i = 1; i <= this.emailDisplayList.length; i++) {
      if (emailId === i) {
        const toggleIcon = document.getElementById('headingCollapse5' + emailId);
        const toggle = document.getElementById('collapse5' + emailId);
        const toggleHeader = document.getElementById('emailThread' + emailId);
        if (event.currentTarget.className === 'card collapse-header ng-star-inserted') {
          this.renderer.addClass(toggle, 'show');
          this.renderer.addClass(toggleHeader, 'open');
          this.renderer.removeClass(toggleIcon, 'collapsed');
          this.emailDisplayList[i - 1].isCollapsed = true;
        } else if (event.currentTarget.className === 'card collapse-header ng-star-inserted open') {
          this.renderer.removeClass(toggle, 'show');
          this.renderer.removeClass(toggleHeader, 'open');
          this.renderer.addClass(toggleIcon, 'collapsed');
          this.emailDisplayList[i - 1].isCollapsed = false;
        }
      }
    }
  }
  /**
  * Add overlay when open sidebar
  *
  * @param event    Content overlay
  */
  showComposeSidebar(event) {
    const toggleIcon = document.getElementById('compose-sidebar');
    const toggleSidebar = document.getElementById('sidebar-left');
    const toggleOverlay = document.getElementById('app-content-overlay');
    if (event.currentTarget.className === 'btn btn-danger btn-glow btn-block my-2 compose-btn') {
      this.renderer.addClass(toggleIcon, 'show');
      this.renderer.removeClass(toggleSidebar, 'show');
      this.renderer.addClass(toggleOverlay, 'show');
    } else if (event.currentTarget.className === 'btn btn-danger btn-glow btn-block my-2 compose-btn show') {
      this.renderer.removeClass(toggleIcon, 'show');
    }
  }
  /**
  * Remove overlay when open sidebar
  *
  * @param event    Content overlay
  */
  showCompose(event) {
    const toggleIcon = document.getElementById('compose-sidebar');
    const toggleOverlay = document.getElementById('app-content-overlay');
    if (event.currentTarget.className === 'close close-icon' || 'app-content-overlay') {
      this.renderer.removeClass(toggleIcon, 'show');
      this.renderer.removeClass(toggleOverlay, 'show');
    }
  }
  /**
 * Add overlay when open sidebar
 *
 * @param event     Content overlay
 */
  showSidebar(event) {
    const toggleIcon = document.getElementById('sidebar-left');
    const toggle = document.getElementById('app-content-overlay');
    if (event.currentTarget.className === 'sidebar-toggle d-block d-lg-none') {
      this.renderer.addClass(toggleIcon, 'show');
      this.renderer.addClass(toggle, 'show');
    } else if (event.currentTarget.className === 'sidebar-close-icon' || 'app-content-overlay') {
      this.renderer.removeClass(toggleIcon, 'show');
      this.renderer.removeClass(toggle, 'show');
    }
  }
  /**
   * Filter Email
   *
   * @param term    search term
   */
  search(term) {
    const searchTerm = term.currentTarget.value;
    if (searchTerm !== '') {
      this.emailList = this.emailList.filter(result => {
        if (result && searchTerm) {
          if (result.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
            result.message.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    } else {
      this.emailList = this.temp2;
    }
  }

  selectAllEmails() {
    for (let i = 0; i < this.emailList.length; i++) {
      if (this.selectAll) {
        this.emailList[i].isSelected = false;
      } else {
        this.emailList[i].isSelected = true;
      }
    }
  }

  deleteCheckedRow() {
    let index = 0;
    const removedIndex = [];
    const temp = [...this.emailList];
    for (const row of temp) {
      if (row.isSelected === true) {
        removedIndex.push(index);
      }
      index++;
    }
    for (let i = removedIndex.length - 1; i >= 0; i--) {
      temp.splice(removedIndex[i], 1);
    }
    this.emailList = temp;
    this.selectAll = false;
  }
  showEmailMenu(Id, emailMenu) {
    for (let j = 0; j < emailMenu.length; j++) {
      for (let i = 0; i < this.emailMenuList.length; i++) {
        for (let k = 0; k < this.emailLable.length; k++) {
          if (emailMenu[j].name === this.emailMenuList[i].name) {
            if (Id !== this.emailMenuList[i].Id) {
              this.emailMenuList[i].isSelected = false;
            }
            if (Id === this.emailMenuList[i].Id) {
              this.emailMenuList[i].isSelected = true;
              this.emailLable[k].isSelected = false;
            }
          } else if (emailMenu[j].name === this.emailLable[k].name) {
            if (Id !== this.emailLable[k].Id) {
              this.emailLable[k].isSelected = false;
            }
            if (Id === this.emailLable[k].Id) {
              this.emailLable[k].isSelected = true;
              this.emailMenuList[i].isSelected = false;
            }
          }
        }
      }
    }

    for (const friend of this.emailMenuList) {
      if (friend.Id === Id) {
        break;
      }
    }
  }
  focus() {
    this.focused = true;
    this.blured = false;
  }

  blur() {
    this.focused = false;
    this.blured = true;
  }

  setControl() {
    this.form.setControl('editor', new FormControl('test - new Control'));
  }
  /**
  * Filter Email
  *
  * @ param event   warning Class
  * @ param emailId
  */
  emailFavorite(event, emailId) {
    for (let i = 1; i <= this.emailDisplayList.length; i++) {
      if (emailId === i) {
        const emailIcon = document.getElementById('email-icon' + emailId);
        const emailstarIcon = document.getElementById('emailstar-icon' + emailId);
        if (event.currentTarget.className === 'favorite') {
          this.renderer.addClass(emailIcon, 'warning');
          this.renderer.addClass(emailstarIcon, 'warning');
        } else if (event.currentTarget.className === 'favorite warning') {
          this.renderer.removeClass(emailIcon, 'warning');
          this.renderer.removeClass(emailstarIcon, 'warning');
        }
      }
    }
  }
}
