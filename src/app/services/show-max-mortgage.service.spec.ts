import { TestBed } from '@angular/core/testing';

import { ShowMaxMortgageService } from './show-max-mortgage.service';

describe('ShowMaxMortgageService', () => {
  let service: ShowMaxMortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowMaxMortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
