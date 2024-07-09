import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtendedinputsComponent } from './extendedinputs.component';

describe('ExtendedinputsComponent', () => {
  let component: ExtendedinputsComponent;
  let fixture: ComponentFixture<ExtendedinputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedinputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
