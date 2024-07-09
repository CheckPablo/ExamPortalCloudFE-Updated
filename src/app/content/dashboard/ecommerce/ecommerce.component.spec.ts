import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EcommerceComponent } from './ecommerce.component';

describe('EcommerceComponent', () => {
  let component: EcommerceComponent;
  let fixture: ComponentFixture<EcommerceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
