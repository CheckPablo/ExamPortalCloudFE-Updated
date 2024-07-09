import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWritingAnswertemplateComponent } from './test-writing-answertemplate.component';

describe('TestWritingAnswertemplateComponent', () => {
  let component: TestWritingAnswertemplateComponent;
  let fixture: ComponentFixture<TestWritingAnswertemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWritingAnswertemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWritingAnswertemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
