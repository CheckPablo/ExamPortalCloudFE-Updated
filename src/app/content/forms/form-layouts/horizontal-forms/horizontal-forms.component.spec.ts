import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HorizontalFormsComponent } from './horizontal-forms.component';

describe('HorizontalFormsComponent', () => {
  let component: HorizontalFormsComponent;
  let fixture: ComponentFixture<HorizontalFormsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
