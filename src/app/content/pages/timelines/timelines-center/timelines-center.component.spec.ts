import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelinesCenterComponent } from './timelines-center.component';

describe('TimelinesCenterComponent', () => {
  let component: TimelinesCenterComponent;
  let fixture: ComponentFixture<TimelinesCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinesCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
