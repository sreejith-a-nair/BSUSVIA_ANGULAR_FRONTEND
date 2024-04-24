import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatManageComponent } from './chat-manage.component';

describe('ChatManageComponent', () => {
  let component: ChatManageComponent;
  let fixture: ComponentFixture<ChatManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatManageComponent]
    });
    fixture = TestBed.createComponent(ChatManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
