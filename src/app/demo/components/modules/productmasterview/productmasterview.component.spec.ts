import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterviewComponent } from './productmasterview.component';

describe('ProductmasterviewComponent', () => {
  let component: ProductmasterviewComponent;
  let fixture: ComponentFixture<ProductmasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductmasterviewComponent]
    });
    fixture = TestBed.createComponent(ProductmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
