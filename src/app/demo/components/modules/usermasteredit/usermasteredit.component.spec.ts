import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermastereditComponent } from './usermasteredit.component';

describe('UsermastereditComponent', () => {
  let component: UsermastereditComponent;
  let fixture: ComponentFixture<UsermastereditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsermastereditComponent]
    });
    fixture = TestBed.createComponent(UsermastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
