import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Html5dataexportComponent } from './html5dataexport.component';

describe('Html5dataexportComponent', () => {
  let component: Html5dataexportComponent;
  let fixture: ComponentFixture<Html5dataexportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Html5dataexportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Html5dataexportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
