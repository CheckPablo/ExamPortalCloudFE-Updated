import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectDataService, City } from '../../../../_services/ng-select-data.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

declare var require: any;
const selectData = require('../../../../../assets/data/forms/form-elements/select.json');

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @ViewChild('ng-select') ngSelect;
  @BlockUI('singleSelect') blockUISingleSelect: NgBlockUI;
  @BlockUI('multipleSelect') blockUIMultipleSelect: NgBlockUI;

  public breadcrumb: any;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  singlebasicSelected: any;
  singleDisableMode: any;
  singleHideSearch: any;

  multipleMultiSelect: any;
  multipleDisableMode: any;
  multipleWithlabel: any;

  singleEvent: any;
  multipleEvent: any;

  programmaticSingle: any;
  programmaticMultiple: any;

  loadData: any;

  template: any;

  singleSelectBackgroundColor: any;
  singleSelectMenuBackgroundColor: any;

  selectedTag: number[];

  matchedResultArray: City[] = [];
  cityLoading = false;

 public singleSelectArray = selectData.singleSelectArray;
 public multipleSelectArray = selectData.multipleSelectArray;
 public eventArray = selectData.eventArray;
 public programmaticArray = selectData.programmaticArray;
 public loadArray = selectData.loadArray;
 public templatingArray = selectData.templatingArray;
 public singleSelect = selectData.singleSelect;
 public taggingSupportArray = selectData.taggingSupportArray;


  constructor(private dataService: NgSelectDataService) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Select',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Form',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Select',
          'isLink': false
        }
      ]
    };

    this.singlebasicSelected = this.singleSelectArray[0].item_text;
    this.singleDisableMode = this.singleSelectArray[0].item_text;
    this.singleHideSearch = this.singleSelectArray[0].item_text;

    this.multipleMultiSelect = [{ item_id: 1, item_text: 'Alaska' }, { item_id: 2, item_text: 'California' }];
    this.multipleDisableMode = [{ item_id: 1, item_text: 'Alaska' }, { item_id: 2, item_text: 'California' }];
    this.multipleWithlabel = [];

    this.singleEvent = this.eventArray[0].item_text;
    this.multipleEvent = [];

    this.programmaticSingle = this.programmaticArray[0].item_text;
    this.programmaticMultiple = [];

    this.loadData = this.loadArray[2].item_text;

    this.template = this.templatingArray[0].item_text;

    this.singleSelectBackgroundColor = this.singleSelect[0].item_text;
    this.singleSelectMenuBackgroundColor = this.singleSelect[0].item_text;

    this.loadCity();
  }

  openSingleEvent() {
      }
  closeSingleEvent() {
      }
  onChange() {
      }

  setCalifornia() {
    this.programmaticSingle = this.programmaticArray[1].item_text;
  }

  setCaliforniaAlabama() {
    this.programmaticMultiple = [{ item_id: 2, item_text: 'California' }, { item_id: 5, item_text: 'Alabama' }];
  }
  programmaticMultipleClear() {
    this.programmaticMultiple = [];
  }

  customSearchFn(term: string, item: City) {
    term = term.toLocaleLowerCase();
    return item.item_text.toLocaleLowerCase().indexOf(term) > -1;
  }

  loadCity() {
    this.cityLoading = true;
    this.dataService.getPeople().subscribe(x => {
      this.matchedResultArray = x;
      this.cityLoading = false;
    });
  }

  reloadSingleSelect() {
    this.blockUISingleSelect.start('Loading..');

    setTimeout(() => {
      this.blockUISingleSelect.stop();
    }, 2500);
  }

  reloadMultipleSelect() {
    this.blockUIMultipleSelect.start('Loading..');

    setTimeout(() => {
      this.blockUIMultipleSelect.stop();
    }, 2500);
  }

}
