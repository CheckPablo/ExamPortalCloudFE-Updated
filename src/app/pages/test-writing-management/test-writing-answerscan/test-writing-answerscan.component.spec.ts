import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWritingAnswerscanComponent } from './test-writing-answerscan.component';

describe('TestWritingAnswerscanComponent', () => {
  let component: TestWritingAnswerscanComponent;
  let fixture: ComponentFixture<TestWritingAnswerscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWritingAnswerscanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWritingAnswerscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
