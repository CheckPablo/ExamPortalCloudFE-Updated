import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWritingManagementComponent } from './test-writing-management.component';

describe('TestWritingManagementComponent', () => {
  let component: TestWritingManagementComponent;
  let fixture: ComponentFixture<TestWritingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWritingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWritingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
