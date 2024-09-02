import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutemasterviewComponent } from './routemasterview.component';

describe('RoutemasterviewComponent', () => {
  let component: RoutemasterviewComponent;
  let fixture: ComponentFixture<RoutemasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutemasterviewComponent]
    });
    fixture = TestBed.createComponent(RoutemasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
