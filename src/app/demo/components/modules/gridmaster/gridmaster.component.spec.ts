import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridmasterComponent } from './gridmaster.component';

describe('GridmasterComponent', () => {
  let component: GridmasterComponent;
  let fixture: ComponentFixture<GridmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridmasterComponent]
    });
    fixture = TestBed.createComponent(GridmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
