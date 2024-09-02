import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilitystoragemappingviewComponent } from './compatibilitystoragemappingview.component';

describe('CompatibilitystoragemappingviewComponent', () => {
  let component: CompatibilitystoragemappingviewComponent;
  let fixture: ComponentFixture<CompatibilitystoragemappingviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompatibilitystoragemappingviewComponent]
    });
    fixture = TestBed.createComponent(CompatibilitystoragemappingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
