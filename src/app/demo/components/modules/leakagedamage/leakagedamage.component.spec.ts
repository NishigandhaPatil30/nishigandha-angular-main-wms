import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakagedamageComponent } from './leakagedamage.component';

describe('LeakagedamageComponent', () => {
  let component: LeakagedamageComponent;
  let fixture: ComponentFixture<LeakagedamageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeakagedamageComponent]
    });
    fixture = TestBed.createComponent(LeakagedamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
