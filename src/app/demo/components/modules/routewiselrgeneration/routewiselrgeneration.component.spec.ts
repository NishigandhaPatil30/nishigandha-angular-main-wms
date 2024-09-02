import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutewiselrgenerationComponent } from './routewiselrgeneration.component';

describe('RoutewiselrgenerationComponent', () => {
  let component: RoutewiselrgenerationComponent;
  let fixture: ComponentFixture<RoutewiselrgenerationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutewiselrgenerationComponent]
    });
    fixture = TestBed.createComponent(RoutewiselrgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
