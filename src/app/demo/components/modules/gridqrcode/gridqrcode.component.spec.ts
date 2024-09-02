import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridqrcodeComponent } from './gridqrcode.component';

describe('GridqrcodeComponent', () => {
  let component: GridqrcodeComponent;
  let fixture: ComponentFixture<GridqrcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridqrcodeComponent]
    });
    fixture = TestBed.createComponent(GridqrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
