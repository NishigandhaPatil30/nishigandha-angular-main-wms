import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnviewComponent } from './grnview.component';

describe('GrnviewComponent', () => {
  let component: GrnviewComponent;
  let fixture: ComponentFixture<GrnviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrnviewComponent]
    });
    fixture = TestBed.createComponent(GrnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
