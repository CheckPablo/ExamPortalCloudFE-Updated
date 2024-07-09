import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StripedLabelsComponent } from './striped-labels.component';

describe('StripedLabelsComponent', () => {
  let component: StripedLabelsComponent;
  let fixture: ComponentFixture<StripedLabelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StripedLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripedLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
