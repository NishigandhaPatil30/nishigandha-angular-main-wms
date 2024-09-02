import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutewiseslipComponent } from './routewiseslip.component';

describe('RoutewiseslipComponent', () => {
  let component: RoutewiseslipComponent;
  let fixture: ComponentFixture<RoutewiseslipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutewiseslipComponent]
    });
    fixture = TestBed.createComponent(RoutewiseslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
