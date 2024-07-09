import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormInputsComponent } from './form-inputs.component';

describe('FormInputsComponent', () => {
  let component: FormInputsComponent;
  let fixture: ComponentFixture<FormInputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
