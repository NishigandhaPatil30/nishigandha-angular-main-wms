import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsequipementComponent } from './hsequipement.component';

describe('HsequipementComponent', () => {
  let component: HsequipementComponent;
  let fixture: ComponentFixture<HsequipementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HsequipementComponent]
    });
    fixture = TestBed.createComponent(HsequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
