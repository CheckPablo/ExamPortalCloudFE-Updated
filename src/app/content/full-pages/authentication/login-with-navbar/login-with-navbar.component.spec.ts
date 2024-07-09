import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginWithNavbarComponent } from './login-with-navbar.component';

describe('LoginWithNavbarComponent', () => {
  let component: LoginWithNavbarComponent;
  let fixture: ComponentFixture<LoginWithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
