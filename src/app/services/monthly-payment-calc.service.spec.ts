import { TestBed } from '@angular/core/testing';

import { MonthlyPaymentCalcService } from './monthly-payment-calc.service';

describe('MonthlyPaymentCalcService', () => {
  let service: MonthlyPaymentCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyPaymentCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
