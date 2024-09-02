import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilitystoragemappingComponent } from './compatibilitystoragemapping.component';

describe('CompatibilitystoragemappingComponent', () => {
  let component: CompatibilitystoragemappingComponent;
  let fixture: ComponentFixture<CompatibilitystoragemappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompatibilitystoragemappingComponent]
    });
    fixture = TestBed.createComponent(CompatibilitystoragemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
