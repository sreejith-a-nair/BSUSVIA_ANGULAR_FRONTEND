import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBookComponent } from './pay-book.component';

describe('PayBookComponent', () => {
  let component: PayBookComponent;
  let fixture: ComponentFixture<PayBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayBookComponent]
    });
    fixture = TestBed.createComponent(PayBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
