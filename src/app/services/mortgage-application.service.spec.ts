import { TestBed } from '@angular/core/testing';

import { MortgageApplicationService } from './mortgage-application.service';

describe('MortgageApplicationService', () => {
  let service: MortgageApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
