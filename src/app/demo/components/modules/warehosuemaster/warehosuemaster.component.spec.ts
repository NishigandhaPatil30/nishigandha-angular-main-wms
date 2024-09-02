import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehosuemasterComponent } from './warehosuemaster.component';

describe('WarehosuemasterComponent', () => {
  let component: WarehosuemasterComponent;
  let fixture: ComponentFixture<WarehosuemasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehosuemasterComponent]
    });
    fixture = TestBed.createComponent(WarehosuemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
