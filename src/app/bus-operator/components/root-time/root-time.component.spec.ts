import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTimeComponent } from './root-time.component';

describe('RootTimeComponent', () => {
  let component: RootTimeComponent;
  let fixture: ComponentFixture<RootTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootTimeComponent]
    });
    fixture = TestBed.createComponent(RootTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
