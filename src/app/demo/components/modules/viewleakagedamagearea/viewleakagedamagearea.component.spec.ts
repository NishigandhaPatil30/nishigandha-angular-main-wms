import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleakagedamageareaComponent } from './viewleakagedamagearea.component';

describe('ViewleakagedamageareaComponent', () => {
  let component: ViewleakagedamageareaComponent;
  let fixture: ComponentFixture<ViewleakagedamageareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewleakagedamageareaComponent]
    });
    fixture = TestBed.createComponent(ViewleakagedamageareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
