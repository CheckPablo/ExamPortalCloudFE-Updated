import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTestUploadComponent } from './pop-uptestupload.component';

describe('PopUpTestUploadComponent', () => {
  let component: PopUpTestUploadComponent;
  let fixture: ComponentFixture<PopUpTestUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTestUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpTestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
