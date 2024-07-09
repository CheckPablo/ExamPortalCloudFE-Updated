import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

declare var require: any;
const data: any = require('../../../../../assets/data/datatables/tablecomponent/tablecomponent.json');

@Component({
  selector: 'app-tablecomponents',
  templateUrl: './tablecomponents.component.html',
  styleUrls: ['./tablecomponents.component.css']
})
export class TablecomponentsComponent implements OnInit {

  @BlockUI('components') blockUIComponents: NgBlockUI;
  @BlockUI('alerts') blockUIAlerts: NgBlockUI;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  disabled = false;
  singleCities = [];
  basicSelectedItem = [];
  singleDropdownSettings: any = {};
  hideSearchBoxdropdownSettings: any = {};
  closeDropdownSelection = false;
  isPrimaryClosed1 = false;
  isPrimaryClosed2 = false;
  isPrimaryClosed3 = false;
  singleSelectedItem = [];
  responsiveSelectedItem = [];
  singlePlaceholderSelectedItem = [];
  disableSelectedItem = [];
  hideSearchBox = [];
  ShowFilter = false;
  limitSelection = false;
  multipleCities = [];
  multipleSelectedItems = [];
  multipleDropdownSettings: any = {};
  multipleLimitDropdownSettings: any = {};
  basicMultiSelect = [];
  singleProgrammaticCities = [];
  singleProgrammaticSelectedItem = [];
  singleProgrammaticDropdownSettings: any = {};

  multipleProgrammaticSelectedItem = [];
  multipleProgrammaticDropdownSettings: any = {};

  singleCitiesEvents = [];
  singleEventsSelectedItem = [];
  singleEventsDropdownSettings: any = {};

  multipleCitiesEvents = [];
  multipleEventsSelectedItem = [];
  multipleEventsDropdownSettings: any = {};

  loadingArray = [];
  loadingArraySelectedItem = [];
  loadingArrayDropdownSettings: any = {};

  public breadcrumb: any;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Table components',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Tables',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Table components',
          'isLink': false
        }
      ]
    };
    this.singleCities = data ['Cities'];
      this.singleDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.hideSearchBoxdropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
    this.multipleCities = data['Cities'];
    this.basicMultiSelect = data['Select'];
    this.multipleDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.multipleLimitDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      limitSelection: 2,
      allowSearchFilter: true
    };

    this.singleProgrammaticCities = data['Cities'];

    this.singleProgrammaticSelectedItem = [{ item_id: 1, item_text: 'Alaska' }];

    this.singleProgrammaticDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.multipleProgrammaticDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      clearSearchFilter: true
    };

    this.singleCitiesEvents = data['Cities'];

    this.singleEventsSelectedItem = [{ item_id: 2, item_text: 'California' }];

    this.singleEventsDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    this.multipleCitiesEvents = data['Cities'];
    this.multipleEventsSelectedItem = [{ item_id: 2, item_text: 'California' }, { item_id: 3, item_text: 'Colorado' }];

    this.multipleEventsDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

    this.loadingArray = data['Select'];
    this.loadingArraySelectedItem = this.loadingArray;

    this.loadingArrayDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onItemSelect(item: any) {
    
  }
  onSelectAll(items: any) {
    
  }
  onSingleEventsItemSelect(item: any) {
    
          }
  onSingleEventsItemsClose() {
    
      }
  onMultipleEventsItemsClose() {
    
      }

  reloadComponents() {
    this.blockUIComponents.start('Loading..');

    setTimeout(() => {
      this.blockUIComponents.stop();
    }, 2500);
  }

  reloadAlerts() {
    this.blockUIAlerts.start('Loading..');

    setTimeout(() => {
      this.blockUIAlerts.stop();
    }, 2500);
  }
}
