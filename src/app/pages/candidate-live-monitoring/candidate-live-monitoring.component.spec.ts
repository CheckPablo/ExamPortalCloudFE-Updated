import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLiveMonitoringComponent } from './candidate-live-monitoring.component';

describe('CandidateLiveMonitoringComponent', () => {
  let component: CandidateLiveMonitoringComponent;
  let fixture: ComponentFixture<CandidateLiveMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateLiveMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateLiveMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
