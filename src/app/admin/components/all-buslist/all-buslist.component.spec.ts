import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBuslistComponent } from './all-buslist.component';

describe('AllBuslistComponent', () => {
  let component: AllBuslistComponent;
  let fixture: ComponentFixture<AllBuslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBuslistComponent]
    });
    fixture = TestBed.createComponent(AllBuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
