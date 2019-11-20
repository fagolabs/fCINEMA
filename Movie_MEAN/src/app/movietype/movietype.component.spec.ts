import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovietypeComponent } from './movietype.component';

describe('MovietypeComponent', () => {
  let component: MovietypeComponent;
  let fixture: ComponentFixture<MovietypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovietypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovietypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
