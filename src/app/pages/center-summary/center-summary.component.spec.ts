import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterSummaryComponent } from './center-summary.component';

describe('CenterSummaryComponent', () => {
  let component: CenterSummaryComponent;
  let fixture: ComponentFixture<CenterSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
