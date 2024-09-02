import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmastereditComponent } from './productmasteredit.component';

describe('ProductmastereditComponent', () => {
  let component: ProductmastereditComponent;
  let fixture: ComponentFixture<ProductmastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductmastereditComponent]
    });
    fixture = TestBed.createComponent(ProductmastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
