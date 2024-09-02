import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridauditComponent } from './gridaudit.component';

describe('GridauditComponent', () => {
  let component: GridauditComponent;
  let fixture: ComponentFixture<GridauditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridauditComponent]
    });
    fixture = TestBed.createComponent(GridauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
