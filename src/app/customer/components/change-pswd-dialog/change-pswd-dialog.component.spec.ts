import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePswdDialogComponent } from './change-pswd-dialog.component';

describe('ChangePswdDialogComponent', () => {
  let component: ChangePswdDialogComponent;
  let fixture: ComponentFixture<ChangePswdDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePswdDialogComponent]
    });
    fixture = TestBed.createComponent(ChangePswdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
