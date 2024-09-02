import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmasterviewComponent } from './locationmasterview.component';

describe('LocationmasterviewComponent', () => {
  let component: LocationmasterviewComponent;
  let fixture: ComponentFixture<LocationmasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationmasterviewComponent]
    });
    fixture = TestBed.createComponent(LocationmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
