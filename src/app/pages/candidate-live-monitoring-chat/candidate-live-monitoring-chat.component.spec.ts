import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLiveMonitoringChatComponent } from './candidate-live-monitoring-chat.component';

describe('CandidateLiveMonitoringChatComponent', () => {
  let component: CandidateLiveMonitoringChatComponent;
  let fixture: ComponentFixture<CandidateLiveMonitoringChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateLiveMonitoringChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateLiveMonitoringChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
