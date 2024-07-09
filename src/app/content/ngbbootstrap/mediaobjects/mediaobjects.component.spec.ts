import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediaobjectsComponent } from './mediaobjects.component';

describe('MediaobjectsComponent', () => {
  let component: MediaobjectsComponent;
  let fixture: ComponentFixture<MediaobjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaobjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaobjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
