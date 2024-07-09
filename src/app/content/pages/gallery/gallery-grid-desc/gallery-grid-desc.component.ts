import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

declare const require: any;
@Component({
  selector: 'app-gallery-grid-desc',
  templateUrl: './gallery-grid-desc.component.html',
  styleUrls: ['./gallery-grid-desc.component.css']
})
export class GalleryGridDescComponent implements OnInit {

  image1 = [
    {
      img: '../../../../../assets/images/gallery/1.jpg',
      thumb: '../../../../../assets/images/gallery/1.jpg',
      description: 'Image 1'
    }]
  image2 = [{
    img: '../../../../../assets/images/gallery/2.jpg',
    thumb: '../../../../../assets/images/gallery/2.jpg',
    description: 'Image 2'
  }]
  image3 = [{
    img: '../../../../../assets/images/gallery/3.jpg',
    thumb: '../../../../../assets/images/gallery/3.jpg',
    description: 'Image 3'
  }]
  image4 = [{
    img: '../../../../../assets/images/gallery/4.jpg',
    thumb: '../../../../../assets/images/gallery/4.jpg',
    description: 'Image 4'
  }]
  image5 = [{
    img: '../../../../../assets/images/gallery/5.jpg',
    thumb: '../../../../../assets/images/gallery/5.jpg',
    description: 'Image 5'
  }
  ]
  image6 = [
    {
      img: '../../../../../assets/images/gallery/6.jpg',
      thumb: '../../../../../assets/images/gallery/6.jpg',
      description: 'Image 6'
    }
  ]
  image7 = [
    {
      img: '../../../../../assets/images/gallery/7.jpg',
      thumb: '../../../../../assets/images/gallery/7.jpg',
      description: 'Image 7'
    }
  ]
  image8 = [
    {
      img: '../../../../../assets/images/gallery/8.jpg',
      thumb: '../../../../../assets/images/gallery/8.jpg',
      description: 'Image 8'
    }
  ]
  image9 = [
    {
      img: '../../../../../assets/images/gallery/9.jpg',
      thumb: '../../../../../assets/images/gallery/9.jpg',
      description: 'Image 9'
    }
  ]
  image10 = [
    {
      img: '../../../../../assets/images/gallery/10.jpg',
      thumb: '../../../../../assets/images/gallery/10.jpg',
      description: 'Image 10'
    }
  ]
  image11 =
    [
      {
        img: '../../../../../assets/images/gallery/11.jpg',
        thumb: '../../../../../assets/images/gallery/11.jpg',
        description: 'Image 11'
      }
  ];
  image12 =
    [
      {
        img: '../../../../../assets/images/gallery/12.jpg',
        thumb: '../../../../../assets/images/gallery/12.jpg',
        description: 'Image 12'
      }
  ];

  options = {
    close: true,
    expand: false,
    minimize: false,
    reload: true
  };
  imageOptions = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  public breadcrumb: any;

  @BlockUI('imageGallery') blockUIImageGallery: NgBlockUI;

  constructor() { }

  ngOnInit() {
    
    this.breadcrumb = {
      'mainlabel': 'Gallery Media Grid With Description',
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
          'name': 'Gallery Media Grid With Description',
          'isLink': false
        }
      ]
    };
  }

  reloadImageGallery() {
    this.blockUIImageGallery.start('Loading..');

    setTimeout(() => {
      this.blockUIImageGallery.stop();
    }, 2500);
  }
}
