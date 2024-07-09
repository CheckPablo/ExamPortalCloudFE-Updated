import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GalleryGridDescComponent } from './gallery-grid-desc.component';

describe('GalleryGridDescComponent', () => {
  let component: GalleryGridDescComponent;
  let fixture: ComponentFixture<GalleryGridDescComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryGridDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryGridDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
