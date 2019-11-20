import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchmovieComponent } from './watchmovie.component';

describe('WatchmovieComponent', () => {
  let component: WatchmovieComponent;
  let fixture: ComponentFixture<WatchmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchmovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
