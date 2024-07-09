import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelinesLeftComponent } from './timelines-left.component';

describe('TimelinesLeftComponent', () => {
  let component: TimelinesLeftComponent;
  let fixture: ComponentFixture<TimelinesLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinesLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
