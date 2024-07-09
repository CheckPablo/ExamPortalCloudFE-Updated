import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginWithBgComponent } from './login-with-bg.component';

describe('LoginWithBgComponent', () => {
  let component: LoginWithBgComponent;
  let fixture: ComponentFixture<LoginWithBgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
