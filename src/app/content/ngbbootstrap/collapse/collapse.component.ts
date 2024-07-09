import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {

  public breadcrumb: any;

  public basicAccordation1 = false;
  public basicAccordation2 = false;
  public basicAccordation3 = false;
  public basicAccordation4 = false;

  public rightAlignAccordation1 = false;
  public rightAlignAccordation2 = false;
  public rightAlignAccordation3 = false;
  public rightAlignAccordation4 = false;

  public rightIconAccordation1 = false;
  public rightIconAccordation2 = false;
  public rightIconAccordation3 = false;
  public rightIconAccordation4 = false;

  public leftIconAccordation1 = false;
  public leftIconAccordation2 = false;
  public leftIconAccordation3 = false;
  public leftIconAccordation4 = false;

  public basicColorAccordation1 = false;
  public basicColorAccordation2 = false;
  public basicColorAccordation3 = false;
  public basicColorAccordation4 = false;

  public basicColorBorderAccordation1 = false;
  public basicColorBorderAccordation2 = false;
  public basicColorBorderAccordation3 = false;
  public basicColorBorderAccordation4 = false;

  public basicBorderColorAccordation1 = false;
  public basicBorderColorAccordation2 = false;
  public basicBorderColorAccordation3 = false;
  public basicBorderColorAccordation4 = false;

  public basicSectionBorderColorAccordation1 = false;
  public basicSectionBorderColorAccordation2 = false;
  public basicSectionBorderColorAccordation3 = false;
  public basicSectionBorderColorAccordation4 = false;

  public basicCollapse1 = false;
  public basicCollapse2 = false;
  public basicCollapse3 = false;
  public basicCollapse4 = false;

  public rightAlignCollapse1 = false;
  public rightAlignCollapse2 = false;
  public rightAlignCollapse3 = false;
  public rightAlignCollapse4 = false;

  public rightIconCollapse1 = false;
  public rightIconCollapse2 = false;
  public rightIconCollapse3 = false;
  public rightIconCollapse4 = false;

  public leftIconCollapse1 = false;
  public leftIconCollapse2 = false;
  public leftIconCollapse3 = false;
  public leftIconCollapse4 = false;

  public basicColorCollapse1 = false;
  public basicColorCollapse2 = false;
  public basicColorCollapse3 = false;
  public basicColorCollapse4 = false;

  public basicColorBorderCollapse1 = false;
  public basicColorBorderCollapse2 = false;
  public basicColorBorderCollapse3 = false;
  public basicColorBorderCollapse4 = false;

  public basicBorderColorCollapse1 = false;
  public basicBorderColorCollapse2 = false;
  public basicBorderColorCollapse3 = false;
  public basicBorderColorCollapse4 = false;

  public basicSectionBorderColorCollapse1 = false;
  public basicSectionBorderColorCollapse2 = false;
  public basicSectionBorderColorCollapse3 = false;
  public basicSectionBorderColorCollapse4 = false;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Collapse',
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
          'name': 'Collapse',
          'isLink': false
        }
      ]
    };
  }

}
