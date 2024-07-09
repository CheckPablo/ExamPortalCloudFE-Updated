import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @BlockUI('defaultPagination') blockUIDefaultPagination: NgBlockUI;
  @BlockUI('paginationRoundStyle') blockUIPaginationRoundStyle: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Pagination',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Component',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Pagination',
          'isLink': false
        }
      ]
    };
  }

  reloadDefaultPagination() {
    this.blockUIDefaultPagination.start('Loading..');

    setTimeout(() => {
      this.blockUIDefaultPagination.stop();
    }, 2500);
  }

  reloadPaginationRoundStyle() {
    this.blockUIPaginationRoundStyle.start('Loading..');

    setTimeout(() => {
      this.blockUIPaginationRoundStyle.stop();
    }, 2500);
  }

}
