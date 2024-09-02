import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehosuemasterviewComponent } from './warehosuemasterview.component';

describe('WarehosuemasterviewComponent', () => {
  let component: WarehosuemasterviewComponent;
  let fixture: ComponentFixture<WarehosuemasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehosuemasterviewComponent]
    });
    fixture = TestBed.createComponent(WarehosuemasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
