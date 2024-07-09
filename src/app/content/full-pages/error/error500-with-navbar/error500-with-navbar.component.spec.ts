import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Error500WithNavbarComponent } from './error500-with-navbar.component';

describe('Error500WithNavbarComponent', () => {
  let component: Error500WithNavbarComponent;
  let fixture: ComponentFixture<Error500WithNavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Error500WithNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error500WithNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
