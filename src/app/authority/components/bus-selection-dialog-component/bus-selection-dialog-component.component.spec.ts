import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSelectionDialogComponentComponent } from './bus-selection-dialog-component.component';

describe('BusSelectionDialogComponentComponent', () => {
  let component: BusSelectionDialogComponentComponent;
  let fixture: ComponentFixture<BusSelectionDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusSelectionDialogComponentComponent]
    });
    fixture = TestBed.createComponent(BusSelectionDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
