import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedUserListComponent } from './reserved-user-list.component';

describe('ReservedUserListComponent', () => {
  let component: ReservedUserListComponent;
  let fixture: ComponentFixture<ReservedUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedUserListComponent]
    });
    fixture = TestBed.createComponent(ReservedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
