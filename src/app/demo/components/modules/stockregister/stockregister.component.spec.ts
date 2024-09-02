import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockregisterComponent } from './stockregister.component';

describe('StockregisterComponent', () => {
  let component: StockregisterComponent;
  let fixture: ComponentFixture<StockregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockregisterComponent]
    });
    fixture = TestBed.createComponent(StockregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
