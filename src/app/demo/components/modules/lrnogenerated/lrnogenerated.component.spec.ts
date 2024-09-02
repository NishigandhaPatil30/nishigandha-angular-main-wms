import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrnogeneratedComponent } from './lrnogenerated.component';

describe('LrnogeneratedComponent', () => {
  let component: LrnogeneratedComponent;
  let fixture: ComponentFixture<LrnogeneratedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LrnogeneratedComponent]
    });
    fixture = TestBed.createComponent(LrnogeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
