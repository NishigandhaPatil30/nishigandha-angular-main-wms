import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchwisereportComponent } from './batchwisereport.component';

describe('BatchwisereportComponent', () => {
  let component: BatchwisereportComponent;
  let fixture: ComponentFixture<BatchwisereportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchwisereportComponent]
    });
    fixture = TestBed.createComponent(BatchwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
