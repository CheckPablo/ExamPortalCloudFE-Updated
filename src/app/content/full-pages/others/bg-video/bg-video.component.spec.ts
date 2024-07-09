import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BgVideoComponent } from './bg-video.component';

describe('BgVideoComponent', () => {
  let component: BgVideoComponent;
  let fixture: ComponentFixture<BgVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BgVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
