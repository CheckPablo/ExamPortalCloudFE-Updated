import { Component, Renderer2, OnInit, AfterViewInit } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { QuillInitializeServiceService } from "../../../../_services/quill-initialize-service.service";
import "quill-mention";
declare var require: any;
const data = require("../../../../../assets/data/application/kanban.json");

@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"],
})
export class KanbanComponent implements OnInit, AfterViewInit {
  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  selectKanbanClass: any;
  kanbanList: any[] = [];
  kanbanValue: any;
  selectKanbanArray: any[] = [];
  kanban: FormGroup;
  showImage: boolean;
  showNewItem: boolean;
  selectedLabel: any;
  addTitle: string;
  header: string;
  blured = false;
  focused = false;
  atValues = [
    { id: 1, value: "Fredrik Sundqvist", link: "https://google.com" },
    { id: 2, value: "Patrik Sjölin" },
  ];
  hashValues = [
    { id: 3, value: "Fredrik Sundqvist 2" },
    { id: 4, value: "Patrik Sjölin 2" },
  ];
  list = [
    { id: 1, name: 'item1', children: [] },
    { id: 2, name: 'item2', children: [] },
    { id: 3, name: 'item3', children: [] },
  ];

  kanbanquillConfig = {
    toolbar: ".kanbantoolbar",
    autoLink: true,

    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range, context) => {
            
            return true;
          },
        },
      },
    },
  };

  constructor(
    private _renderer: Renderer2,
    private formBuilder: FormBuilder,
    private QuillInitializeServiceServicec: QuillInitializeServiceService
  ) { }

  ngOnInit(): void {
    this.showNewItem = false;
    this.selectKanbanClass = "bg-primary";
    this.kanban = this.formBuilder.group({
      title: new FormControl(['']),
      date: new FormControl(['']),
      selectedLabel: new FormControl(['']),
      description: new FormControl([''])
    });
    this.kanbanList = JSON.parse(localStorage.getItem("kanban"));
    if (this.kanbanList == null || this.kanbanList.length == 0) {
      this.kanbanList = data;
    } else { }
    localStorage.setItem("kanban", JSON.stringify(this.kanbanList));
  }
  ngAfterViewInit(): void {
    const items = localStorage.getItem("kanban");
    if (items) {
      this.kanbanList = JSON.parse(items);
    }
  }

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  onDragStart(event: DragEvent) {

    );
  }

  onDragEnd(event: DragEvent) {

    );
  }

  onDraggableCopied(event: DragEvent) {

    );
  }

  onDraggableLinked(event: DragEvent) {

    );
  }

  onDraggableMoved(event: DragEvent) {

    );
  }

  onDragCanceled(event: DragEvent) {

    );
  }

  onDragover(event: DragEvent) {

    );
  }


  showSidebar(event) {
    const toggleIcon = document.getElementById("kanban_sidebar");
    const toggle = document.getElementById("content-overlay");
    if (event.currentTarget.className === "kanban-item") {
      this._renderer.addClass(toggleIcon, "show");
      this._renderer.addClass(toggle, "show");
    } else if (
      event.currentTarget.className === "ficon feather ft-x" ||
      "kanban-overlay"
    ) {
      this._renderer.removeClass(toggleIcon, "show");
      this._renderer.removeClass(toggle, "show");
    }
  }
  editItem(value, kanban) {
    const date1 = value.date;
    const split = date1.split('/');
    let dateObj = {
      "year": Number(split[2]),
      "month": Number([split[0]]),
      "day": Number(split[1])
    }
    this.kanban.setValue({
      title: value.name,
      date: dateObj,
      selectedLabel: value.selectedLabel,
      description: value.description,
    })
    this.kanbanValue = value
    this.selectKanbanArray = kanban
    if (value.selectedLabel == 'Primary') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-sucess');
      this._renderer.removeClass(toggleIcon, 'bg-danger');
      this._renderer.removeClass(toggleIcon, 'bg-info');
      this._renderer.removeClass(toggleIcon, 'bg-warning');
      this._renderer.removeClass(toggleIcon, 'bg-secondary');
      this._renderer.addClass(toggleIcon, 'bg-primary');
    } else if (value.selectedLabel == 'Danger') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-primary');
      this._renderer.removeClass(toggleIcon, 'bg-sucess');
      this._renderer.removeClass(toggleIcon, 'bg-info');
      this._renderer.removeClass(toggleIcon, 'bg-warning');
      this._renderer.removeClass(toggleIcon, 'bg-secondary');
      this._renderer.addClass(toggleIcon, 'bg-danger');
    }
    else if (value.selectedLabel == 'Success') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-primary');
      this._renderer.removeClass(toggleIcon, 'bg-danger');
      this._renderer.removeClass(toggleIcon, 'bg-info');
      this._renderer.removeClass(toggleIcon, 'bg-warning');
      this._renderer.removeClass(toggleIcon, 'bg-secondary');
      this._renderer.addClass(toggleIcon, 'bg-success');
    }
    else if (value.selectedLabel == 'Info') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-primary');
      this._renderer.removeClass(toggleIcon, 'bg-danger');
      this._renderer.removeClass(toggleIcon, 'bg-success');
      this._renderer.removeClass(toggleIcon, 'bg-warning');
      this._renderer.removeClass(toggleIcon, 'bg-secondary');
      this._renderer.addClass(toggleIcon, 'bg-info');
    }
    else if (value.selectedLabel == 'Warning') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-primary');
      this._renderer.removeClass(toggleIcon, 'bg-danger');
      this._renderer.removeClass(toggleIcon, 'bg-success');
      this._renderer.removeClass(toggleIcon, 'bg-info');
      this._renderer.removeClass(toggleIcon, 'bg-secondary');
      this._renderer.addClass(toggleIcon, 'bg-warning');
    }
    else if (value.selectedLabel == 'Secondary') {
      const toggleIcon = document.getElementById('selectLable');
      this._renderer.removeClass(toggleIcon, 'bg-primary');
      this._renderer.removeClass(toggleIcon, 'bg-danger');
      this._renderer.removeClass(toggleIcon, 'bg-success');
      this._renderer.removeClass(toggleIcon, 'bg-warning');
      this._renderer.removeClass(toggleIcon, 'bg-info');
      this._renderer.addClass(toggleIcon, 'bg-secondary');
    }
  }
  deleteKanban(event) {
    this.kanbanValue;
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (this.selectKanbanArray.length == this.kanbanList[i].tickets.length) {
        for (var j = 0; j < this.selectKanbanArray.length; j++)
          if (JSON.stringify(this.selectKanbanArray) === JSON.stringify(this.kanbanList[i].tickets)) {
            for (var k = 0; k < this.kanbanList[i].tickets.length; k++) {
              if (this.kanbanValue.name == this.kanbanList[i].tickets[k].name) {
                this.kanbanList[i].tickets.splice(k, 1);
              }
            }
          }
      }
    }
    const toggleIcon = document.getElementById("kanban_sidebar");
    const toggle = document.getElementById("content-overlay");
    if (
      event.currentTarget.className === "btn btn-danger delete-kanban-item mr-1"
    ) {
      this._renderer.removeClass(toggleIcon, "show");
      this._renderer.removeClass(toggle, "show");
    }
  }
  addKanbanBoard() {
    let defaultobject = {
      name: "Default Title",
      tickets: [],
      type: "",
      kanbanId: this.kanbanList.length + 1,
      showNewItem: false
    };
    this.kanbanList.push(defaultobject);
  }
  public kanbanArray: any;
  submitItem(kanbanArray) {
    let dateObj = new Date();
    var date = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();
    let object = {
      'name': this.addTitle,
      'date': date,
      'selectedLabel': "Primary",
      'description': this.addTitle
    }
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (kanbanArray.kanbanId == this.kanbanList[i].kanbanId && kanbanArray.tickets.length == this.kanbanList[i].tickets.length && JSON.stringify(kanbanArray.tickets) === JSON.stringify(this.kanbanList[i].tickets)) {
        this.kanbanList[i].tickets.push(object),
          this.kanbanList[i].showNewItem = false;
      }
    }
    this.addTitle = null;
  }

  addKanbanItem(kanabanArray) {
    this.addTitle = null;
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (kanabanArray.kanbanId == this.kanbanList[i].kanbanId) {
        this.kanbanList[i].showNewItem = true;
      }
    }
  }
  updateKanbanItem(event) {
    let dateObj = this.kanban.value.date;
    var date = dateObj.month + '/' + dateObj.day + '/' + dateObj.year
    this.kanbanValue;
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (this.selectKanbanArray.length == this.kanbanList[i].tickets.length) {
        for (
          var j = 0;
          j < this.selectKanbanArray.length;
          j++ // assert each element equal
        )
          JSON.stringify(this.selectKanbanArray) === JSON.stringify(this.kanbanList[i].kanabanArray);
        for (var k = 0; k < this.kanbanList[i].tickets.length; k++) {
          if (this.kanbanValue.name == this.kanbanList[i].tickets[k].name) {

            (this.kanbanList[i].tickets[k].name = this.kanban.value.title),
              (this.kanbanList[i].tickets[k].date = date),
              (this.kanbanList[i].tickets[k].selectedLabel = this.kanban.value.selectedLabel),
              (this.kanbanList[i].tickets[k].description = this.kanban.value.description);
          }
        }
        this.kanbanList[i].tickets;
      }
    }
    const toggleIcon = document.getElementById("kanban_sidebar");
    const toggle = document.getElementById("content-overlay");
    if (
      event.currentTarget.className ===
      "btn btn-primary glow update-kanban-item"
    ) {
      this._renderer.removeClass(toggleIcon, "show");
      this._renderer.removeClass(toggle, "show");
    }
  }
  public removeItem(kanban: any, kanbanList): void {
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (kanbanList.kanbanId == this.kanbanList[i].kanbanId) {
        for (var k = 0; k < this.kanbanList[i].tickets.length; k++) {
          if (kanban.name == this.kanbanList[i].tickets[k].name) {
            kanbanList.tickets.splice(kanbanList.tickets.indexOf(kanban), 1);
            this.kanbanList[i].tickets == kanbanList.tickets;
            break;
          }
        }
      }
    }
  }
 
  cancleKanban(kanbanList) {
    kanbanList.showNewItem = false;
  }
  
  deleteKanbanList(kanbanList) {
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (JSON.stringify(kanbanList) === JSON.stringify(this.kanbanList[i])) {
        this.kanbanList.splice(i, 1);
      }
    }
  }
  updateHeader(kanbanList) {
    for (let i = 0; i < this.kanbanList.length; i++) {
      if (JSON.stringify(kanbanList) === JSON.stringify(this.kanbanList[i])) {
        this.kanbanList[i].name = this.header
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
  validateProfile(content, kanbanList) {
    this.header = content;
    
    setTimeout(() => {
      this.updateHeader(kanbanList);
    }, 2500);
  }
  getSelectedKanbanText(event: Event) {
    let temp = event.target['options'][event.target['options'].selectedIndex].className;
    const toggleIcon = document.getElementById('selectLable');
    this._renderer.removeClass(toggleIcon, this.selectKanbanClass);
    this._renderer.addClass(toggleIcon, temp);
    this.selectKanbanClass = temp;
    temp = null;
  }
}
