import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelinesRightComponent } from './timelines-right.component';

describe('TimelinesRightComponent', () => {
  let component: TimelinesRightComponent;
  let fixture: ComponentFixture<TimelinesRightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinesRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
