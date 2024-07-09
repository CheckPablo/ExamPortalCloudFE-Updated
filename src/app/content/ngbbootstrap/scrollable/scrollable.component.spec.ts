import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScrollableComponent } from './scrollable.component';

describe('ScrollableComponent', () => {
  let component: ScrollableComponent;
  let fixture: ComponentFixture<ScrollableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
