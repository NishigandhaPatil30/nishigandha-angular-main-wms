import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpickingslipnumberComponent } from './viewpickingslipnumber.component';

describe('ViewpickingslipnumberComponent', () => {
  let component: ViewpickingslipnumberComponent;
  let fixture: ComponentFixture<ViewpickingslipnumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpickingslipnumberComponent]
    });
    fixture = TestBed.createComponent(ViewpickingslipnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
