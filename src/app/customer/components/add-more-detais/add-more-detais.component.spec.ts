import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreDetaisComponent } from './add-more-detais.component';

describe('AddMoreDetaisComponent', () => {
  let component: AddMoreDetaisComponent;
  let fixture: ComponentFixture<AddMoreDetaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoreDetaisComponent]
    });
    fixture = TestBed.createComponent(AddMoreDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
