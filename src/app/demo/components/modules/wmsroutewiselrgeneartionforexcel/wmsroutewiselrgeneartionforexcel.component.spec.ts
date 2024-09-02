import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsroutewiselrgeneartionforexcelComponent } from './wmsroutewiselrgeneartionforexcel.component';

describe('WmsroutewiselrgeneartionforexcelComponent', () => {
  let component: WmsroutewiselrgeneartionforexcelComponent;
  let fixture: ComponentFixture<WmsroutewiselrgeneartionforexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WmsroutewiselrgeneartionforexcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WmsroutewiselrgeneartionforexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
