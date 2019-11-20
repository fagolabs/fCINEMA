import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatMovieComponent } from './creat-movie.component';

describe('CreatMovieComponent', () => {
  let component: CreatMovieComponent;
  let fixture: ComponentFixture<CreatMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
