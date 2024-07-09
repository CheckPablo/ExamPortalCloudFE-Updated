import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginSimpleComponent } from './login-simple.component';

describe('LoginSimpleComponent', () => {
  let component: LoginSimpleComponent;
  let fixture: ComponentFixture<LoginSimpleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
