import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpickingslipComponent } from './viewpickingslip.component';

describe('ViewpickingslipComponent', () => {
  let component: ViewpickingslipComponent;
  let fixture: ComponentFixture<ViewpickingslipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpickingslipComponent]
    });
    fixture = TestBed.createComponent(ViewpickingslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
