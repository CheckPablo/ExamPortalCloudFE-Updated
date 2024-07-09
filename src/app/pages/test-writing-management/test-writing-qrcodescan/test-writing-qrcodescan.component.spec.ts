import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWritingQrcodescanComponent } from './test-writing-qrcodescan.component';

describe('TestWritingQrcodescanComponent', () => {
  let component: TestWritingQrcodescanComponent;
  let fixture: ComponentFixture<TestWritingQrcodescanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWritingQrcodescanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWritingQrcodescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
