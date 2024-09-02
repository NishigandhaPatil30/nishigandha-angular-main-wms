import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrngrnviewComponent } from './srngrnview.component';

describe('SrngrnviewComponent', () => {
  let component: SrngrnviewComponent;
  let fixture: ComponentFixture<SrngrnviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SrngrnviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SrngrnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
