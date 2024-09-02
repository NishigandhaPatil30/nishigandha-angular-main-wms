import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LrgenerationforexcelComponent } from './lrgenerationforexcel.component';

describe('LrgenerationforexcelComponent', () => {
  let component: LrgenerationforexcelComponent;
  let fixture: ComponentFixture<LrgenerationforexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LrgenerationforexcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LrgenerationforexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
