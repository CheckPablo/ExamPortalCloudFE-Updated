import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchVideosComponent } from './search-videos.component';

describe('SearchVideosComponent', () => {
  let component: SearchVideosComponent;
  let fixture: ComponentFixture<SearchVideosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
