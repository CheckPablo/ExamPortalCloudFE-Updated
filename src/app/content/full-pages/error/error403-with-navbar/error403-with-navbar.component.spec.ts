import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Error403WithNavbarComponent } from './error403-with-navbar.component';

describe('Error403WithNavbarComponent', () => {
  let component: Error403WithNavbarComponent;
  let fixture: ComponentFixture<Error403WithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error403WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error403WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
