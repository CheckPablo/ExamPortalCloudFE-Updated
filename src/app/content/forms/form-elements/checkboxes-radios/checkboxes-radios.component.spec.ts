import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxesRadiosComponent } from './checkboxes-radios.component';

describe('CheckboxesRadiosComponent', () => {
  let component: CheckboxesRadiosComponent;
  let fixture: ComponentFixture<CheckboxesRadiosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxesRadiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesRadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
