import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManageComponent } from './ticket-manage.component';

describe('TicketManageComponent', () => {
  let component: TicketManageComponent;
  let fixture: ComponentFixture<TicketManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketManageComponent]
    });
    fixture = TestBed.createComponent(TicketManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
