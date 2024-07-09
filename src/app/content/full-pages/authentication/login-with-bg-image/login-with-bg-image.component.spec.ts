import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginWithBgImageComponent } from './login-with-bg-image.component';

describe('LoginWithBgImageComponent', () => {
  let component: LoginWithBgImageComponent;
  let fixture: ComponentFixture<LoginWithBgImageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithBgImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithBgImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
