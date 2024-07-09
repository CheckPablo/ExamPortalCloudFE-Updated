import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Error404WithNavbarComponent } from './error404-with-navbar.component';

describe('Error404WithNavbarComponent', () => {
  let component: Error404WithNavbarComponent;
  let fixture: ComponentFixture<Error404WithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error404WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
