import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MargincreationComponent } from './margincreation.component';

describe('MargincreationComponent', () => {
  let component: MargincreationComponent;
  let fixture: ComponentFixture<MargincreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MargincreationComponent]
    });
    fixture = TestBed.createComponent(MargincreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
