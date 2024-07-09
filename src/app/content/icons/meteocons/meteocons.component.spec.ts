import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeteoconsComponent } from './meteocons.component';

describe('MeteoconsComponent', () => {
  let component: MeteoconsComponent;
  let fixture: ComponentFixture<MeteoconsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
