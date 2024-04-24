import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineViewSeatComponent } from './offline-view-seat.component';

describe('OfflineViewSeatComponent', () => {
  let component: OfflineViewSeatComponent;
  let fixture: ComponentFixture<OfflineViewSeatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineViewSeatComponent]
    });
    fixture = TestBed.createComponent(OfflineViewSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
