import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterComponent } from './productmaster.component';

describe('ProductmasterComponent', () => {
  let component: ProductmasterComponent;
  let fixture: ComponentFixture<ProductmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductmasterComponent]
    });
    fixture = TestBed.createComponent(ProductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
