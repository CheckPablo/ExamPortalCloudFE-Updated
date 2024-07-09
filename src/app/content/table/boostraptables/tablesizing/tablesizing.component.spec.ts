import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TablesizingComponent } from './tablesizing.component';

describe('TablesizingComponent', () => {
  let component: TablesizingComponent;
  let fixture: ComponentFixture<TablesizingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesizingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
