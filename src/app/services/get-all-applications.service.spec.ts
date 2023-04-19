import { TestBed } from '@angular/core/testing';

import { GetAllApplicationsService } from './get-all-applications.service';

describe('GetAllApplicationsService', () => {
  let service: GetAllApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
