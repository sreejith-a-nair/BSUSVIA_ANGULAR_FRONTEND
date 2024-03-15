import { TestBed } from '@angular/core/testing';

import { AuthorityServiceService } from './authority-service.service';

describe('AuthorityServiceService', () => {
  let service: AuthorityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
