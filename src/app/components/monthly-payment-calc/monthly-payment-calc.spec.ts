import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPaymentCalc } from './monthly-payment-calc.component';

describe('SecondTabComponent', () => {
  let component: MonthlyPaymentCalc;
  let fixture: ComponentFixture<MonthlyPaymentCalc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyPaymentCalc ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyPaymentCalc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
