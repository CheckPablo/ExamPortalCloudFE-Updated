import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportStudentAnswersComponent } from './export-student-answers.component';

describe('ExportStudentAnswersComponent', () => {
  let component: ExportStudentAnswersComponent;
  let fixture: ComponentFixture<ExportStudentAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportStudentAnswersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportStudentAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
