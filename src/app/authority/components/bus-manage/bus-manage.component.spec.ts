import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusManageComponent } from './bus-manage.component';

describe('BusManageComponent', () => {
  let component: BusManageComponent;
  let fixture: ComponentFixture<BusManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusManageComponent]
    });
    fixture = TestBed.createComponent(BusManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
