import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityMoreDetailsComponent } from './authority-more-details.component';

describe('AuthorityMoreDetailsComponent', () => {
  let component: AuthorityMoreDetailsComponent;
  let fixture: ComponentFixture<AuthorityMoreDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorityMoreDetailsComponent]
    });
    fixture = TestBed.createComponent(AuthorityMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
