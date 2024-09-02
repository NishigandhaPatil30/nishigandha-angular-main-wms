import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpickingforexcelComponent } from './viewpickingforexcel.component';

describe('ViewpickingforexcelComponent', () => {
  let component: ViewpickingforexcelComponent;
  let fixture: ComponentFixture<ViewpickingforexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpickingforexcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewpickingforexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
