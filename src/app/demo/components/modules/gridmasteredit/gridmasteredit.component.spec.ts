import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridmastereditComponent } from './gridmasteredit.component';

describe('GridmastereditComponent', () => {
  let component: GridmastereditComponent;
  let fixture: ComponentFixture<GridmastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridmastereditComponent]
    });
    fixture = TestBed.createComponent(GridmastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
