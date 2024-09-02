import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardexcelreportComponent } from './outwardexcelreport.component';

describe('OutwardexcelreportComponent', () => {
  let component: OutwardexcelreportComponent;
  let fixture: ComponentFixture<OutwardexcelreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutwardexcelreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutwardexcelreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
