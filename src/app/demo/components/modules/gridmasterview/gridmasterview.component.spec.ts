import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridmasterviewComponent } from './gridmasterview.component';

describe('GridmasterviewComponent', () => {
  let component: GridmasterviewComponent;
  let fixture: ComponentFixture<GridmasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridmasterviewComponent]
    });
    fixture = TestBed.createComponent(GridmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
