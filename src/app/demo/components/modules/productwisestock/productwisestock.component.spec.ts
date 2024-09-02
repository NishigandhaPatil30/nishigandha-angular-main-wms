import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductwisestockComponent } from './productwisestock.component';

describe('ProductwisestockComponent', () => {
  let component: ProductwisestockComponent;
  let fixture: ComponentFixture<ProductwisestockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductwisestockComponent]
    });
    fixture = TestBed.createComponent(ProductwisestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
