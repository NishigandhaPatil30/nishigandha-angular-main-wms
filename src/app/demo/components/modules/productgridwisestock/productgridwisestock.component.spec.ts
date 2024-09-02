import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductgridwisestockComponent } from './productgridwisestock.component';

describe('ProductgridwisestockComponent', () => {
  let component: ProductgridwisestockComponent;
  let fixture: ComponentFixture<ProductgridwisestockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductgridwisestockComponent]
    });
    fixture = TestBed.createComponent(ProductgridwisestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
