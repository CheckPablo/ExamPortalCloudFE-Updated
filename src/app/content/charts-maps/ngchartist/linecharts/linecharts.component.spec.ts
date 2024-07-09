import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinechartsComponent } from './linecharts.component';

describe('LinechartsComponent', () => {
  let component: LinechartsComponent;
  let fixture: ComponentFixture<LinechartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LinechartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
