import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Error401WithNavbarComponent } from './error401-with-navbar.component';

describe('Error401WithNavbarComponent', () => {
  let component: Error401WithNavbarComponent;
  let fixture: ComponentFixture<Error401WithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error401WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error401WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
