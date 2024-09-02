import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigincreationComponent } from './origincreation.component';

describe('OrigincreationComponent', () => {
  let component: OrigincreationComponent;
  let fixture: ComponentFixture<OrigincreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrigincreationComponent]
    });
    fixture = TestBed.createComponent(OrigincreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
