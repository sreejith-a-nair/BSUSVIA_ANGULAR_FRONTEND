import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserErrorpageComponent } from './user-errorpage.component';

describe('UserErrorpageComponent', () => {
  let component: UserErrorpageComponent;
  let fixture: ComponentFixture<UserErrorpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserErrorpageComponent]
    });
    fixture = TestBed.createComponent(UserErrorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
