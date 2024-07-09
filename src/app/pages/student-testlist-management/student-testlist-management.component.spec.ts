import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTestlistManagementComponent } from './student-testlist-management.component';

describe('StudentTestlistManagementComponent', () => {
  let component: StudentTestlistManagementComponent;
  let fixture: ComponentFixture<StudentTestlistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentTestlistManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTestlistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
