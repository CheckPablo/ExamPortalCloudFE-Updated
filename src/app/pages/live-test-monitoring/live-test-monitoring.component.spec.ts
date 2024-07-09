import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTestMonitoringComponent } from './live-test-monitoring.component';

describe('LiveTestMonitoringComponent', () => {
  let component: LiveTestMonitoringComponent;
  let fixture: ComponentFixture<LiveTestMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTestMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTestMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
