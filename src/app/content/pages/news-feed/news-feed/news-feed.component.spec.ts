import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsFeedComponent } from './news-feed.component';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
