import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FlatComponent } from './flat.component';

describe('FlatComponent', () => {
  let component: FlatComponent;
  let fixture: ComponentFixture<FlatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
