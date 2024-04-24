import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRootComponent } from './edit-root.component';

describe('EditRootComponent', () => {
  let component: EditRootComponent;
  let fixture: ComponentFixture<EditRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRootComponent]
    });
    fixture = TestBed.createComponent(EditRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
