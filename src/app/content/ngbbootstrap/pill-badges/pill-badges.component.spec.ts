import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PillBadgesComponent } from './pill-badges.component';

describe('PillBadgesComponent', () => {
  let component: PillBadgesComponent;
  let fixture: ComponentFixture<PillBadgesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PillBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PillBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
