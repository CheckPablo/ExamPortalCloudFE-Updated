import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtendedButtonsComponent } from './extended-buttons.component';

describe('ExtendedButtonsComponent', () => {
  let component: ExtendedButtonsComponent;
  let fixture: ComponentFixture<ExtendedButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
