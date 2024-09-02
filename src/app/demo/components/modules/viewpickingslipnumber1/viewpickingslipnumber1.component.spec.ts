import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewpickingslipnumber1Component } from './viewpickingslipnumber1.component';

describe('Viewpickingslipnumber1Component', () => {
  let component: Viewpickingslipnumber1Component;
  let fixture: ComponentFixture<Viewpickingslipnumber1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewpickingslipnumber1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Viewpickingslipnumber1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
