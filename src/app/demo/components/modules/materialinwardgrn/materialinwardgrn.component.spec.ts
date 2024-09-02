import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialinwardgrnComponent } from './materialinwardgrn.component';

describe('MaterialinwardgrnComponent', () => {
  let component: MaterialinwardgrnComponent;
  let fixture: ComponentFixture<MaterialinwardgrnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialinwardgrnComponent]
    });
    fixture = TestBed.createComponent(MaterialinwardgrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
