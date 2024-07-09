import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoappComponent } from './todoapp.component';

describe('TodoappComponent', () => {
  let component: TodoappComponent;
  let fixture: ComponentFixture<TodoappComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
