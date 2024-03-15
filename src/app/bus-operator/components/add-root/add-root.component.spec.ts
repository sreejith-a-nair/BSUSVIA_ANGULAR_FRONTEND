import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRootComponent } from './add-root.component';

describe('AddRootComponent', () => {
  let component: AddRootComponent;
  let fixture: ComponentFixture<AddRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRootComponent]
    });
    fixture = TestBed.createComponent(AddRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
