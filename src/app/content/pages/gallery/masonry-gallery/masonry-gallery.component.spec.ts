import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasonryGalleryComponent } from './masonry-gallery.component';

describe('MasonryGalleryComponent', () => {
  let component: MasonryGalleryComponent;
  let fixture: ComponentFixture<MasonryGalleryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
