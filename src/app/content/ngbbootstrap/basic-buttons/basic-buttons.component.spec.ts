import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicButtonsComponent } from './basic-buttons.component';

describe('BasicButtonsComponent', () => {
  let component: BasicButtonsComponent;
  let fixture: ComponentFixture<BasicButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
