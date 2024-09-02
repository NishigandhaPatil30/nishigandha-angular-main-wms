import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehosuemastereditComponent } from './warehosuemasteredit.component';

describe('WarehosuemastereditComponent', () => {
  let component: WarehosuemastereditComponent;
  let fixture: ComponentFixture<WarehosuemastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehosuemastereditComponent]
    });
    fixture = TestBed.createComponent(WarehosuemastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
