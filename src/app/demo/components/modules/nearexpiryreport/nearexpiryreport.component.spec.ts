import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearexpiryreportComponent } from './nearexpiryreport.component';

describe('NearexpiryreportComponent', () => {
  let component: NearexpiryreportComponent;
  let fixture: ComponentFixture<NearexpiryreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearexpiryreportComponent]
    });
    fixture = TestBed.createComponent(NearexpiryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
