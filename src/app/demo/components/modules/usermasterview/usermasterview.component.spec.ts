import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermasterviewComponent } from './usermasterview.component';

describe('UsermasterviewComponent', () => {
  let component: UsermasterviewComponent;
  let fixture: ComponentFixture<UsermasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermasterviewComponent]
    });
    fixture = TestBed.createComponent(UsermasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
