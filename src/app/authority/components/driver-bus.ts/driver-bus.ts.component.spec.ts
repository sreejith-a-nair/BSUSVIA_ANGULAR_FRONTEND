import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBusTsComponent } from './driver-bus.ts.component';

describe('DriverBusTsComponent', () => {
  let component: DriverBusTsComponent;
  let fixture: ComponentFixture<DriverBusTsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverBusTsComponent]
    });
    fixture = TestBed.createComponent(DriverBusTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
