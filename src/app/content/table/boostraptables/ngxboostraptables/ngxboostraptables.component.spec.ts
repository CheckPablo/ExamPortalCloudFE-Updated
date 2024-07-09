import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxboostraptablesComponent } from './ngxboostraptables.component';

describe('NgxboostraptablesComponent', () => {
  let component: NgxboostraptablesComponent;
  let fixture: ComponentFixture<NgxboostraptablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxboostraptablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxboostraptablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
