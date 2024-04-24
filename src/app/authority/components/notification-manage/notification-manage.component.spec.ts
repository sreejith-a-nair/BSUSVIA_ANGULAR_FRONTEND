import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationManageComponent } from './notification-manage.component';

describe('NotificationManageComponent', () => {
  let component: NotificationManageComponent;
  let fixture: ComponentFixture<NotificationManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationManageComponent]
    });
    fixture = TestBed.createComponent(NotificationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
