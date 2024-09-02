import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalwarehosuestockreportComponent } from './totalwarehosuestockreport.component';

describe('TotalwarehosuestockreportComponent', () => {
  let component: TotalwarehosuestockreportComponent;
  let fixture: ComponentFixture<TotalwarehosuestockreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalwarehosuestockreportComponent]
    });
    fixture = TestBed.createComponent(TotalwarehosuestockreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
