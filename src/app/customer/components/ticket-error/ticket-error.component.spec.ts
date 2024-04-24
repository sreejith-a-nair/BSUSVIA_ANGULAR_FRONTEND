import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketErrorComponent } from './ticket-error.component';

describe('TicketErrorComponent', () => {
  let component: TicketErrorComponent;
  let fixture: ComponentFixture<TicketErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketErrorComponent]
    });
    fixture = TestBed.createComponent(TicketErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
