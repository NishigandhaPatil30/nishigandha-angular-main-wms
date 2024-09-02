import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardshowreportComponent } from './inwardshowreport.component';

describe('InwardshowreportComponent', () => {
  let component: InwardshowreportComponent;
  let fixture: ComponentFixture<InwardshowreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InwardshowreportComponent]
    });
    fixture = TestBed.createComponent(InwardshowreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
