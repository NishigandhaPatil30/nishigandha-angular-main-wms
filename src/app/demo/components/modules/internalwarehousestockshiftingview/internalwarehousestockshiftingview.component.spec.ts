import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalwarehousestockshiftingviewComponent } from './internalwarehousestockshiftingview.component';

describe('InternalwarehousestockshiftingviewComponent', () => {
  let component: InternalwarehousestockshiftingviewComponent;
  let fixture: ComponentFixture<InternalwarehousestockshiftingviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalwarehousestockshiftingviewComponent]
    });
    fixture = TestBed.createComponent(InternalwarehousestockshiftingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
