import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputGridComponent } from './input-grid.component';

describe('InputGridComponent', () => {
  let component: InputGridComponent;
  let fixture: ComponentFixture<InputGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
