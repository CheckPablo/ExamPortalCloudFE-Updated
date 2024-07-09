import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelinesHorizontalComponent } from './timelines-horizontal.component';

describe('TimelinesHorizontalComponent', () => {
  let component: TimelinesHorizontalComponent;
  let fixture: ComponentFixture<TimelinesHorizontalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelinesHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinesHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
