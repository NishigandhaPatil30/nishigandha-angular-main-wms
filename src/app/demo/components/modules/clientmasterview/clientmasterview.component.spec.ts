import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientmasterviewComponent } from './clientmasterview.component';

describe('ClientmasterviewComponent', () => {
  let component: ClientmasterviewComponent;
  let fixture: ComponentFixture<ClientmasterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientmasterviewComponent]
    });
    fixture = TestBed.createComponent(ClientmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
