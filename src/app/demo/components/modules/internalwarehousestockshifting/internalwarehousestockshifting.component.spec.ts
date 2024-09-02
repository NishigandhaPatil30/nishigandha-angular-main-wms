import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalwarehousestockshiftingComponent } from './internalwarehousestockshifting.component';

describe('InternalwarehousestockshiftingComponent', () => {
  let component: InternalwarehousestockshiftingComponent;
  let fixture: ComponentFixture<InternalwarehousestockshiftingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalwarehousestockshiftingComponent]
    });
    fixture = TestBed.createComponent(InternalwarehousestockshiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
