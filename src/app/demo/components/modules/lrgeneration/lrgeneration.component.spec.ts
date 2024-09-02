import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrgenerationComponent } from './lrgeneration.component';

describe('LrgenerationComponent', () => {
  let component: LrgenerationComponent;
  let fixture: ComponentFixture<LrgenerationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LrgenerationComponent]
    });
    fixture = TestBed.createComponent(LrgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
