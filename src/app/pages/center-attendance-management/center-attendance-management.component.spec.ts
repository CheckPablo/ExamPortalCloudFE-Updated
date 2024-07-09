import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAttendanceManagementComponent } from './center-attendance-management.component';

describe('CenterAttendanceManagementComponent', () => {
  let component: CenterAttendanceManagementComponent;
  let fixture: ComponentFixture<CenterAttendanceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterAttendanceManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterAttendanceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
