import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Error400WithNavbarComponent } from './error400-with-navbar.component';

describe('Error400WithNavbarComponent', () => {
  let component: Error400WithNavbarComponent;
  let fixture: ComponentFixture<Error400WithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error400WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error400WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
