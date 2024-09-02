import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageinwardreportComponent } from './storageinwardreport.component';

describe('StorageinwardreportComponent', () => {
  let component: StorageinwardreportComponent;
  let fixture: ComponentFixture<StorageinwardreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageinwardreportComponent]
    });
    fixture = TestBed.createComponent(StorageinwardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
