import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmastereditComponent } from './locationmasteredit.component';

describe('LocationmastereditComponent', () => {
  let component: LocationmastereditComponent;
  let fixture: ComponentFixture<LocationmastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationmastereditComponent]
    });
    fixture = TestBed.createComponent(LocationmastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
