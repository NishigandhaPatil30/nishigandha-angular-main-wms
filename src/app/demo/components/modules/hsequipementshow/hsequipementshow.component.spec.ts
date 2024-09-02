import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsequipementshowComponent } from './hsequipementshow.component';

describe('HsequipementshowComponent', () => {
  let component: HsequipementshowComponent;
  let fixture: ComponentFixture<HsequipementshowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HsequipementshowComponent]
    });
    fixture = TestBed.createComponent(HsequipementshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
