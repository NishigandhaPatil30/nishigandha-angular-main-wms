import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialinwardsrnComponent } from './materialinwardsrn.component';

describe('MaterialinwardsrnComponent', () => {
  let component: MaterialinwardsrnComponent;
  let fixture: ComponentFixture<MaterialinwardsrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialinwardsrnComponent]
    });
    fixture = TestBed.createComponent(MaterialinwardsrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
