import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TablestylingComponent } from './tablestyling.component';

describe('TablestylingComponent', () => {
  let component: TablestylingComponent;
  let fixture: ComponentFixture<TablestylingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TablestylingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablestylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
