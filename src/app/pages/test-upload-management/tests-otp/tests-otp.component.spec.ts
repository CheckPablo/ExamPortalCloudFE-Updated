import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsOtpComponent } from './tests-otp.component';

describe('TestsOtpComponent', () => {
  let component: TestsOtpComponent;
  let fixture: ComponentFixture<TestsOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsOtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
