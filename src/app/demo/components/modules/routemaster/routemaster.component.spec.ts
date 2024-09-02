import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutemasterComponent } from './routemaster.component';

describe('RoutemasterComponent', () => {
  let component: RoutemasterComponent;
  let fixture: ComponentFixture<RoutemasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutemasterComponent]
    });
    fixture = TestBed.createComponent(RoutemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
