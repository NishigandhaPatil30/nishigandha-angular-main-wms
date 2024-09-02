import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrnogeneratedforexcelComponent } from './lrnogeneratedforexcel.component';

describe('LrnogeneratedforexcelComponent', () => {
  let component: LrnogeneratedforexcelComponent;
  let fixture: ComponentFixture<LrnogeneratedforexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LrnogeneratedforexcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LrnogeneratedforexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
