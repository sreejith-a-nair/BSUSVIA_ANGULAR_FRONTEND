import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommontableComponent } from './commontable.component';

describe('CommontableComponent', () => {
  let component: CommontableComponent;
  let fixture: ComponentFixture<CommontableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommontableComponent]
    });
    fixture = TestBed.createComponent(CommontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
