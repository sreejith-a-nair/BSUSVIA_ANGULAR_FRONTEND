import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRootComponent } from './view-root.component';

describe('ViewRootComponent', () => {
  let component: ViewRootComponent;
  let fixture: ComponentFixture<ViewRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRootComponent]
    });
    fixture = TestBed.createComponent(ViewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
