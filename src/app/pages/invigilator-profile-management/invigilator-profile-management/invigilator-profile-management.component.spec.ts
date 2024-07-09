import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvigilatorProfileManagementComponent } from './invigilator-profile-management.component';

describe('InvigilatorProfileManagementComponent', () => {
  let component: InvigilatorProfileManagementComponent;
  let fixture: ComponentFixture<InvigilatorProfileManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvigilatorProfileManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvigilatorProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
