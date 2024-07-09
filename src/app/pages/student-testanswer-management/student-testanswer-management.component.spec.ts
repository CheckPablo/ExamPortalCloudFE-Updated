import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTestanswerManagementComponent } from './student-testanswer-management.component';

describe('StudentTestanswerManagementComponent', () => {
  let component: StudentTestanswerManagementComponent;
  let fixture: ComponentFixture<StudentTestanswerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTestanswerManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTestanswerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
