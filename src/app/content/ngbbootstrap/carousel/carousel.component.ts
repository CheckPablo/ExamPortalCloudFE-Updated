import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public breadcrumb: any;
  pauseOnHover = true;

  basicArray = ['../../../assets/images/carousel/02.jpg',
    '../../../assets/images/carousel/03.jpg',
    '../../../assets/images/carousel/01.jpg'
  ];

  optionalArray = ['../../../assets/images/carousel/06.jpg',
    '../../../assets/images/carousel/08.jpg',
    '../../../assets/images/carousel/05.jpg'
  ];

  intervalOptionalArray = ['../../../assets/images/carousel/10.jpg',
    '../../../assets/images/carousel/15.jpg',
    '../../../assets/images/carousel/14.jpg'
  ];

  pauseOptionArray = ['../../../assets/images/carousel/03.jpg',
    '../../../assets/images/carousel/09.jpg',
    '../../../assets/images/carousel/07.jpg'
  ];

  wrapOptionArray = ['../../../assets/images/carousel/02.jpg',
    '../../../assets/images/carousel/04.jpg',
    '../../../assets/images/carousel/08.jpg'
  ];

  keyboardoptionArray = ['../../../assets/images/carousel/11.jpg',
    '../../../assets/images/carousel/06.jpg',
    '../../../assets/images/carousel/01.jpg'
  ];

  constructor(config: NgbCarouselConfig) {

  }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Carousel',
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
          'name': 'Carousel',
          'isLink': false
        }
      ]
    };
  }
}
