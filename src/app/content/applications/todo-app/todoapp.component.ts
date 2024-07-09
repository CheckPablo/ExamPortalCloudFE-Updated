import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TodoService } from '../../../_api/todo/todo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { QuillEditorComponent } from 'ngx-quill';
import { UserService } from '../../../_api/user/user.service';
import { QuillInitializeServiceService } from '../../../_services/quill-initialize-service.service';
import 'quill-mention';
declare let require: any;

class TodoFilter {
  constructor(
    public Id: string,
    public lableName: string,
    public isSelected: boolean
  ) { }
}
class Comment {
  public userid: string;
  public comment: string;
  public created_at_date: number;
}
@Component({
  selector: 'app-todoapp',
  templateUrl: './todoapp.component.html',
  styleUrls: ['./todoapp.component.css']
})
export class TodoappComponent implements OnInit {

  initialData = require('../../../../assets/data/application/todo.json');
  LableData = require('../../../../assets/data/application/todo_lable.json');
  private demoUserEmail = 'john@pixinvent.com';
  todo: FormGroup;
  submitted = false;
  commentList: Comment[] = [];
  date: any;
  todoDisplayList: any[] = [];
  todoLableList: any[] = [];
  todoFilterList: TodoFilter[] = [];
  todoId: any;
  todoType: 'secondary';
  assignedTo: any;
  selectedUserId = '';
  selectedUserImage: any;
  selectedAssignee: any;
  assignDate: any;
  todoComments: any[] = [];
  todoCommentsField: string;
  selectedTodoTypeText = '';
  selectedTodoTypeValue = '';
  isShown = true;
  selectedItem: any;
  completedTodo = false;
  TodoId: any;
  id: any;
  temp: any;
  todosAssigned: any;
  loader = true;
  blured = false;
  focused = false;
  hide = false;
  hasFocus = false;
  d2: any;
  model: NgbDateStruct;
  createdDate: any;
  contact: any;
  commentArray: any[] = [];
  public isShowCropper = false;
  loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
  demoUserImage = '../../../assets/images/portrait/small/avatar-s-19.png';
  currentUserImage = this.loggedInUser.photoURL;
  currentUserName = this.loggedInUser.name;
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
  @ViewChild('editor', { static: true }) editor: QuillEditorComponent;
  todos: any;
  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ];
  newTodoquillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', 'image'],
      ]
    },
    autoLink: true,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }
        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++) {
            if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
              matches.push(values[i]);
              renderList(matches, searchTerm);
            }
          }
        }
      },
    },
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
  TodoquillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
      ]
    },
    autoLink: true,
    // mention: {
    //   allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    //   mentionDenotationChars: ['@', '#'],
    //   source: (searchTerm: string, renderList: (arg0: any[], arg1: any) => void, mentionChar: string) => {
    //     let values;

    //     if (mentionChar === '@') {
    //       values = this.atValues;
    //     } else {
    //       values = this.hashValues;
    //     }
    //     if (searchTerm.length === 0) {
    //       renderList(values, searchTerm);
    //     } else {
    //       const matches = [];
    //       for (let i = 0; i < values.length; i++) {
    //         if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
    //           matches.push(values[i]);
    //           renderList(matches, searchTerm);
    //         }
    //       }
    //     }
    //   },
    // },
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
  get TodoFormGroup() {
    return this.todo.get('todoComments') as FormArray;
  }
  /**
  * Constructor
  *
  * @param NgbModal              modal
  * @param FormBuilder           formBuilder
  * @param Renderer2             _renderer
  * @param TodoService           firebaseService
  * @param AngularFirestore      firestore
  * @param ToastrService         toastr
  */
  constructor(private modal: NgbModal,
    private formBuilder: FormBuilder,
    private _renderer: Renderer2,
    private firebaseService: TodoService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserService,
    private QuillInitializeServiceServicec: QuillInitializeServiceService) {
  }

  /**
   * OnInit
   */
  ngOnInit() {
    this.loader = true;
    this.resetForm();
    this.todos = [];
    this.currentUserImage = this.loggedInUser.photoURL;
    this.currentUserName = this.loggedInUser.displayName;
    this.todoLableList = this.LableData.todoLableList;
    this.todoFilterList = this.LableData.todoFilterList;
    this.userService.getUsers().subscribe(users => {
      let contactList = users.map(item => {
        return {
          ...item.payload.doc.data() as {},
          id: item.payload.doc['id']
        };
      });
      contactList = contactList.filter(element => {
        return this.loggedInUser.uid !== element['uid'] || this.loggedInUser.uid === element['uid'];
      });
      this.contact = contactList;
    });
    if (this.loggedInUser.email === this.demoUserEmail) {
      // To load default todo for demo account
      this.getDemoAccTodos().then(todos => {
        if (todos.length === 0) {
          this.addDemoAccountTodos().then(result => {
            if (result) {
              this.loadTodos();
            }
          });
        } else {
          this.loadTodos();
        }
      });
    } else {
      this.loadTodos();
    }

    this.todo = this.formBuilder.group({
      title: new FormControl(['', Validators.required]),
      type: new FormControl(''),
      description: new FormControl(''),
      createdDate: new FormControl(''),
      assignedTo: new FormControl(''),
      assignDate: new FormControl(['', Validators.nullValidator]),
      todoComments: this.formBuilder.array([
        this.formBuilder.group({
          comment: '',
          created_at_date: '',
          userid: ''
        })]),
    });
  }

  // Load TODO of user
  loadTodos() {
    this.firebaseService.getTODOS(this.loggedInUser.uid).subscribe(todos => {
      let todo = [];
      todo = todos.map(item => {
        return {
          ...item.payload.doc.data() as {},
          id: item.payload.doc['id']
        };
      });
      this.firebaseService.getAssignedTODOS(this.loggedInUser.uid).subscribe(assignedTodos => {
        let todoAssigned = [];
        todoAssigned = assignedTodos.map(item => {
          const toDoObj = item.payload.doc.data() as {};
          if (toDoObj && toDoObj['uid'] !== this.loggedInUser.uid) {
            return {
              ...item.payload.doc.data() as {},
              id: item.payload.doc['id']
            };
          }
        });
        todoAssigned = todoAssigned.filter(item => {
          return item && item['uid'];
        });
        this.todos = todo.concat(todoAssigned);
        this.temp = this.todos;
        this.loader = false;
      });
    });
  }
  /**
   * Get the add todo Form value
   */
  get add() {
    return this.todo.controls;
  }

  /**
   * Get the update todo Form value
   */
  get update() {
    return this.todo.controls;
  }

  /**
   * Reset form value
   *
   * @param form      Form fields with previous value
   */
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  addDemoAccountTodos() {
    const dataPromise = new Promise((resolve, reject) => {
      const promises = [];
      // Add default TODO for demo account
      for (let i = 0; i < this.initialData.length; i++) {
        const promise = this.firestore.collection('todo').add({
          title: this.initialData[i].title,
          description: this.initialData[i].description,
          badge: this.initialData[i].badge,
          type: this.initialData[i].type,
          completed: this.initialData[i].completed,
          isDeleted: this.initialData[i].isDeleted,
          createdDate: new Date(),
          uid: this.loggedInUser.uid,
          assignedTo: this.initialData[i].assignedTo,
          assignDate: this.initialData[i].assignDate,
          todoComments: this.initialData[i].todoComments
        });
        promises.push(promise);
      }
      forkJoin(promises).subscribe(results => {
        resolve(true);
      });
    });
    return dataPromise;
  }
  /**
   * Initial todo display
   */
  getDemoAccTodos(): Promise<any> {
    const dataPromise = new Promise((resolve, reject) => {
      this.firebaseService.getTODOS(this.loggedInUser.uid).subscribe(todos => {
        resolve(todos);
      });
    });
    return dataPromise;
  }

  /**
   * Add new todo
   *
   * Update todo
   *
   * @param value     Form field values
   * @param id        todo id
   */
  onSubmit(event) {
    this.submitted = true;
    let temp: any[] = [];
    this.todo.controls.assignDate.clearValidators();
    this.todo.get('assignDate').clearValidators();
    this.todo.get('assignDate').updateValueAndValidity();

    if (this.assignedTo) {
      this.selectedAssignee = this.assignedTo;
    }
    if (this.todoCommentsField == null) {
      temp = null;
    } else if (this.todoCommentsField !== null) {
      this.todoCommentsField = this.todoCommentsField.replace(/(<p>|<\/p>)/g, '');
      temp = [{
        comment: this.todoCommentsField,
        created_at_date: Date.now(),
        userid: this.currentUserImage
      }];
    }
    if (this.todo.invalid) {
      return;
    } else if (this.todo.valid) {
      this.todo.setValue({
        uid: this.loggedInUser.uid,
        title: this.todo.value.title,
        description: this.todo.value.description,
        type: this.selectedTodoTypeValue,
        completed: false,
        isDeleted: false,
        createdDate: new Date(),
        badge: this.selectedTodoTypeText,
        assignedTo: this.todo.value.assignedTo,
        assignDate: this.todo.value.assignDate,
        todoComments: temp,
      });
      this.firebaseService.createTodo(this.todo.value).subscribe(res => {
        this.toastr.success('Added', 'Todo Created Successfully.', { timeOut: 500, closeButton: true });
      }, (err) => {
        this.toastr.error('Error', 'Add Todo Error.', { timeOut: 500, closeButton: true });
      });
      const toggleIcon = document.getElementById('todo-new-task');
      const toggle = document.getElementById('content-overlay');
      if (event.currentTarget.className === 'mt-1 ng-dirty ng-valid ng-touched' || 'mt-1 ng-dirty ng-touched ng-valid') {
        this._renderer.removeClass(toggleIcon, 'show');
        this._renderer.removeClass(toggle, 'show');
      }
    }
  }
  /**
  * Submit Comment
  */
  submitComment(id, comments) {
    if (comments != null) {
      comments = comments.replace(/(<p>|<\/p>)/g, '');
    }
    if (!comments) {
      comments = null;
    }
    if (this.loggedInUser.email === this.demoUserEmail) {
      this.currentUserImage = this.demoUserImage;
    }
    if (!this.todoComments || this.todoComments.length === 0) {
      this.todoComments = [];
    }
    // TODO Add todo comment from parameters to todoComments first
    if (comments != null) {
      this.todoComments.push({
        comment: comments,
        created_at_date: Date.now(),
        userid: this.currentUserImage
      });
    }
    if (this.todoId !== null) {
      this.todo.setValue({
        uid: this.todo.value.uid,
        title: this.todo.value.title,
        description: this.todo.value.description,
        type: this.todo.value.type,
        completed: false,
        isDeleted: false,
        createdDate: this.todo.value.createdDate,
        badge: this.todo.value.badge,
        assignedTo: this.todo.value.assignedTo,
        assignDate: this.todo.value.assignDate,
        todoComments: this.todoComments,
      });

      this.todoCommentsField = null;
      comments = null;
      this.firebaseService.updateTODO(id, this.todo.value)
        .subscribe(res => {
          this.toastr.success('Update', 'Todo Comment Updated Successfully.', { timeOut: 500, closeButton: true });
        }, (err) => {
          this.toastr.error('Error', 'Todo Comment Updated Error', { timeOut: 500, closeButton: true });
        });
      
    }
  }

  /**
  * Update todo
  *
  * @param value     Form field values
  * @param id        todo id
  */
  onUpdate(id, value, event) {
    this.submitted = true;
    this.todo.controls.assignDate.clearValidators();
    this.todo.get('assignDate').clearValidators();
    this.todo.get('assignDate').updateValueAndValidity();
    if (this.todo.invalid) {
      return;
    } else if (this.todo.valid) {
      this.todo.setValue({
        uid: this.loggedInUser.uid,
        title: value.title,
        description: value.description,
        type: this.selectedTodoTypeValue,
        completed: value.completed,
        isDeleted: false,
        createdDate: this.selectedItem.createdDate,
        badge: this.selectedTodoTypeText,
        assignedTo: value.assignedTo,
        assignDate: value.assignDate,
        todoComments: this.todoComments
      });
      this.firebaseService.updateTODO(id, this.todo.value)
        .subscribe(res => {
          this.toastr.success('Update', 'Todo Updated Successfully.', { timeOut: 500, closeButton: true });
        }, (err) => {
          this.toastr.error('Error', 'Todo Update Error!', { timeOut: 500, closeButton: true });
        });
      const toggleIcon = document.getElementById('todo-new-task');
      const toggle = document.getElementById('content-overlay');
      if (event.currentTarget.className === 'btn btn-danger update-todo ng-star-inserted' || 'btn btn-danger update-todo') {
        this._renderer.removeClass(toggleIcon, 'show');
        this._renderer.removeClass(toggle, 'show');
      }
    }
  }
  /**
   * Delete todo
   *
   * @param id      todo id
   */
  onDelete(id: string) {

    this.firebaseService.deleteTodo(id)
      .then(res => {
        this.toastr.success('Deleted', 'Todo Deleted Successfully!', { timeOut: 500, closeButton: true });
      }, (err) => {
        this.toastr.error('Error', 'Todo Delete Error!', { timeOut: 500, closeButton: true });
      }
      );
  }

  /**
   * filter task
   */
  search(term) {
    const searchTerm = term.currentTarget.value;
    if (searchTerm !== '') {
      this.todos = this.todos.filter(result => {
        if (result && searchTerm) {
          if (result.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
            result.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    } else {
      this.todos = this.temp;
    }
  }
  /**
   * Open add todo modal
   *
   * @param content     Add todo modal id
   */
  open() {
    this.selectedItem = null;
    this.selectedTodoTypeValue = '';
    this.selectedTodoTypeText = '';
    this.todoComments = [];
    this.todoCommentsField = null;
    this.resetForm();
    this.selectedUserImage = '';
    this.todoId = null;
    this.todo = this.formBuilder.group({
      uid: this.loggedInUser.uid,
      title: '',
      description: '',
      type: '',
      completed: false,
      isDeleted: false,
      createdDate: new Date(),
      badge: '',
      assignedTo: '',
      assignDate: '',
      todoComments: '',
    });
  }

  /**
   * Open edit todo modal
   *
   * @param editContent    edit todo modal id
   * @param item           edit todo modal values
   */
  editModal(value, event) {
    this.selectedItem = value;
    if (this.contact.length > 0) {
      for (let index = 0; index < this.contact.length; index++) {
        const element = this.contact[index];
        if (element.uid === this.selectedItem.uid) {
          this.selectedItem['creator'] = element;
          break;
        }
      }
    }

    this.todoId = this.loggedInUser.uid;
    this.TodoId = this.loggedInUser.uid;
    this.todo = this.formBuilder.group({
      uid: this.loggedInUser.uid,
      title: this.selectedItem.title,
      description: this.selectedItem.description,
      type: this.selectedItem.type,
      completed: value.completed,
      isDeleted: false,
      badge: this.selectedItem.badge,
      createdDate: value.createdDate,
      assignDate: value.assignDate,
      assignedTo: value.assignedTo,
      todoComments: value.todoComments,
    });
    this.todoCommentsField = value.todoComments;
    if (value.assignedTo) {
      this.selectedAssignee = value.assignedTo;
    }
    // this.firebaseService.getTODOS(this.loggedInUser.uid).subscribe(todos => {
    //   this.todos = todos.map(item => {
    //     return {
    //       ...item.payload.doc.data() as {},
    //       id: item.payload.doc.id
    //     };
    //   });
    // });
    for (let i = 0; i < this.todos.length; i++) {
      if (value.id === this.todos[i].id) {
        this.todoComments = this.todos[i].todoComments;
      }
    }
    const toggleIcon = document.getElementById('todo-new-task');
    const toggle = document.getElementById('content-overlay');
    const userImage = document.getElementById('avatar-user');
    const contentImage = document.getElementById('avatar-content');
    if (event.currentTarget.className === 'todo-item ng-star-inserted') {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');
    } else if (this.todoId !== null) {
      this._renderer.addClass(contentImage, 'd-none');
      this._renderer.removeClass(userImage, 'd-none');
    }
  }

  /**
   * Get text and value
   *
   * @param event     Dropdown event
   */
  getSelectedTODOTypeText(event: Event) {
    this.selectedTodoTypeText = event.target['options'][event.target['options'].selectedIndex].text;
    this.selectedTodoTypeValue = event.target['options'][event.target['options'].selectedIndex].value;
  }
  getSelectedTODOTypeImage(event) {
    this.selectedUserId = event.id;
    this.selectImage();
  }
  selectImage() {
    this.contact.forEach(element => {
      if (this.selectedUserId === element.id) {
        this.selectedUserImage = element.image;
      }
    });
  }
  completeTODO(data) {
    if (data.completed) {
      data.completed = false;
    } else {
      data.completed = true;
    }
    this.todo = this.formBuilder.group({
      uid: this.loggedInUser.uid,
      title: data.title,
      description: data.description,
      type: data.type,
      completed: data.completed,
      isDeleted: data.isDeleted,
      createdDate: data.createdDate,
      badge: data.badge,
      assignDate: data.assignDate,
      assignedTo: data.assignedTo,
      // todoImage: data.todoImage,
      todoComments: data.todoComments,
    });

    this.firebaseService.updateTODO(data.id, this.todo.value)
      .subscribe(res => {
        if (this.todo.value.completed === true) {
          this.toastr.success('Success', 'Todo Completed.', { timeOut: 500, closeButton: true });
        } else {
          this.toastr.success('Success', 'Todo Updated.', { timeOut: 500, closeButton: true });
        }
      }, (err) => {
        this.toastr.error('Error', 'Something went wrong!', { timeOut: 500, closeButton: true });
      });
  }
  /**
  * Overlay add/remove fuction in responsive
  *
  * @param event     Overlay click event
  */
  sidebartask(event) {
    const toggleIcon = document.getElementById('todo-new-task');
    const toggle = document.getElementById('content-overlay');
    const toggleSidebarIcon = document.getElementById('sidebar-left');
    const userImage = document.getElementById('avatar-user');
    const contentImage = document.getElementById('avatar-content');
    if (event.currentTarget.className === 'btn btn-danger btn-glow add-task-btn btn-block my-1') {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');
      this._renderer.removeClass(toggleSidebarIcon, 'show');
    } else if (event.currentTarget.className.indexOf('todo-item') !== -1) {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');

    } else if (event.currentTarget.className === 'close close-icon' || 'app-content-overlay show') {
      this._renderer.removeClass(toggleIcon, 'show');
      this._renderer.removeClass(toggle, 'show');
      this._renderer.removeClass(toggleSidebarIcon, 'show');
    }
  }

  sidebartaskedit(event) {
    const toggleIcon = document.getElementById('todo-new-task');
    const toggle = document.getElementById('content-overlay');
    if (event.currentTarget.className === 'btn btn-danger btn-glow add-task-btn btn-block my-1') {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');
    }
  }
  showTodoMenu(Id, todo) {
    for (let j = 0; j < todo.length; j++) {
      for (let i = 0; i < this.todoLableList.length; i++) {
        for (let k = 0; k < this.todoFilterList.length; k++) {
          if (todo[j].lableName === this.todoLableList[i].lableName) {
            if (Id !== this.todoLableList[i].Id) {
              this.todoLableList[i].isSelected = false;
            }
            if (Id === this.todoLableList[i].Id) {
              this.todoLableList[i].isSelected = true;
              this.todoFilterList[k].isSelected = false;
            }
          } else if (todo[j].lableName === this.todoFilterList[k].lableName) {
            if (Id !== this.todoFilterList[k].Id) {
              this.todoFilterList[k].isSelected = false;
            }
            if (Id === this.todoFilterList[k].Id) {
              this.todoFilterList[k].isSelected = true;
              this.todoLableList[i].isSelected = false;
            }
          }
        }
      }
    }
  }
  sidebar(event) {
    const toggleIcon = document.getElementById('sidebar-left');
    const toggle = document.getElementById('content-overlay');
    if (event.currentTarget.className === 'sidebar-toggle d-block d-lg-none') {
      this._renderer.addClass(toggleIcon, 'show');
      this._renderer.addClass(toggle, 'show');
    } else if (event.currentTarget.className === 'sidebar-close-icon') {
      this._renderer.removeClass(toggleIcon, 'show');
      this._renderer.removeClass(toggle, 'show');
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
  todoFavorite(event, todoId) {
    const todoIcon = document.getElementById('todo-icon' + todoId);
    if (event.currentTarget.className === 'todo-item-favorite ml-75') {
      this._renderer.addClass(todoIcon, 'warning');
    } else if (event.currentTarget.className === 'todo-item-favorite ml-75 warning') {
      this._renderer.removeClass(todoIcon, 'warning');
    }
  }
}
