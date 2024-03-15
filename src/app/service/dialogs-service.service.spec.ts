import { TestBed } from '@angular/core/testing';

import { DialogsServiceService } from './dialogs-service.service';

describe('DialogsServiceService', () => {
  let service: DialogsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
