import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HiddentableComponent } from './hiddentable.component';

describe('HiddentableComponent', () => {
  let component: HiddentableComponent;
  let fixture: ComponentFixture<HiddentableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddentableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddentableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
