import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormwizardComponent } from './formwizard.component';

describe('FormwizardComponent', () => {
  let component: FormwizardComponent;
  let fixture: ComponentFixture<FormwizardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormwizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormwizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
