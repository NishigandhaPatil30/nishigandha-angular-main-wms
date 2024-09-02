import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsrnreportComponent } from './materialsrnreport.component';

describe('MaterialsrnreportComponent', () => {
  let component: MaterialsrnreportComponent;
  let fixture: ComponentFixture<MaterialsrnreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialsrnreportComponent]
    });
    fixture = TestBed.createComponent(MaterialsrnreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
