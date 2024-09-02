import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialoutwardComponent } from './materialoutward.component';

describe('MaterialoutwardComponent', () => {
  let component: MaterialoutwardComponent;
  let fixture: ComponentFixture<MaterialoutwardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialoutwardComponent]
    });
    fixture = TestBed.createComponent(MaterialoutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
