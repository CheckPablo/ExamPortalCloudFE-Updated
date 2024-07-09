import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TablecomponentsComponent } from './tablecomponents.component';

describe('TablecomponentsComponent', () => {
  let component: TablecomponentsComponent;
  let fixture: ComponentFixture<TablecomponentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TablecomponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
