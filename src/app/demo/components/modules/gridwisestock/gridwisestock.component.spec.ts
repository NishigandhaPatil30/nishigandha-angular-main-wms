import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridwisestockComponent } from './gridwisestock.component';

describe('GridwisestockComponent', () => {
  let component: GridwisestockComponent;
  let fixture: ComponentFixture<GridwisestockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridwisestockComponent]
    });
    fixture = TestBed.createComponent(GridwisestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
