import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuwardstockComponent } from './ouwardstock.component';

describe('OuwardstockComponent', () => {
  let component: OuwardstockComponent;
  let fixture: ComponentFixture<OuwardstockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuwardstockComponent]
    });
    fixture = TestBed.createComponent(OuwardstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
