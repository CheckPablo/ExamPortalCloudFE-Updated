import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-hover-effect',
  templateUrl: './hover-effect.component.html',
  styleUrls: ['./hover-effect.component.css']
})
export class HoverEffectComponent implements OnInit {
  options = {
    close: true,
    expand: false,
    minimize: false,
    reload: true
  };
  imageoptions = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  public breadcrumb: any;

  @BlockUI('hoverEffects') blockUIHoverEffects: NgBlockUI;

  constructor() { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Gallery Hover Effects',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Gallery',
          'isLink': true,
          'link': ''
        },
        {
          'name': 'Gallery Hover Effects',
          'isLink': false
        }
      ]
    };
  }

  reloadHoverEffects() {
    this.blockUIHoverEffects.start('Loading..');

    setTimeout(() => {
      this.blockUIHoverEffects.stop();
    }, 2500);
  }

}
