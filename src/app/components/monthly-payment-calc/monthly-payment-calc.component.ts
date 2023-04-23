import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, debounceTime, filter, of, switchMap, tap } from 'rxjs';

import { downPaymentValidator, mortgageAmountValidator } from './manual-validators';
import { MonthlyPaymentCalcResponse } from '../../interfaces/monthly-payment-calc-response';
import { MonthlyPaymentCalcService } from 'src/app/services/monthly-payment-calc.service';


const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-monthly-payment-calc',
  templateUrl: './monthly-payment-calc.component.html',
  styleUrls: ['./monthly-payment-calc.component.css']
})

export class MonthlyPaymentCalc implements OnInit {
  loading: boolean = false;

  calculations$: Observable<MonthlyPaymentCalcResponse> = of();

  monthlyCalculatorForm: FormGroup;

  constructor(private monthlyPaymentCalcService: MonthlyPaymentCalcService) {

    this.monthlyCalculatorForm = formBuilder.group({
      homePrice: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(5000)]],
      mortgageAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPayment: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPaymentPercent: ['', [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$"), Validators.min(15), Validators.max(99)]],
      interestRate: ['', [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$")]],
      mortgageTerm: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(30)]],
    }, { validators: [downPaymentValidator, mortgageAmountValidator] } )

  }

  ngOnInit(): void {

    this.monthlyCalculatorForm.controls?.['homePrice']
      .valueChanges
      .subscribe(price => {
        this.monthlyCalculatorForm.controls?.['downPayment'].reset();
        this.monthlyCalculatorForm.controls?.['downPaymentPercent'].reset();
        this.monthlyCalculatorForm.controls?.['mortgageAmount'].reset();
      });

    this.monthlyCalculatorForm.controls?.['downPayment']
      .valueChanges
      .subscribe(downPayment => {

        const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

        if (this.monthlyCalculatorForm.controls?.['downPayment'].valid &&
            this.monthlyCalculatorForm.controls?.['homePrice'].valid &&
            this.monthlyCalculatorForm.controls?.['downPayment'].value >= 0.15 * homePrice &&
            this.monthlyCalculatorForm.controls?.['downPayment'].value <= 0.99 * homePrice) {

        const newDownPaymentPercent = (downPayment * 100 / homePrice);
        const newMortgageAmount = (homePrice - downPayment);

        this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), {emitEvent: false});
        this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), {emitEvent: false});
        }
      });

    this.monthlyCalculatorForm.controls?.['downPaymentPercent']
    .valueChanges
    .subscribe(downPaymentPercent => {
      if (this.monthlyCalculatorForm.controls?.['downPaymentPercent'].valid &&
          this.monthlyCalculatorForm.controls?.['homePrice'].valid) {

        const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

        const newDownPayment = (downPaymentPercent * homePrice / 100);
        const newMortgageAmount = (homePrice - newDownPayment);

        this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), {emitEvent: false});
        this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), {emitEvent: false});
      }
    });

    this.monthlyCalculatorForm.controls?.['mortgageAmount']
      .valueChanges
      .subscribe(mortgageAmount => {

        const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

        if (this.monthlyCalculatorForm.controls?.['mortgageAmount'].valid &&
            this.monthlyCalculatorForm.controls?.['homePrice'].valid &&
            this.monthlyCalculatorForm.controls?.['mortgageAmount'].value < homePrice) {

          const newDownPayment = homePrice - mortgageAmount;
          const newDownPaymentPercent = newDownPayment * 100 / homePrice;

          this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), {emitEvent: false});
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), {emitEvent: false});
        }

      });

    this.calculations$ = this.monthlyCalculatorForm.valueChanges.pipe(
      filter((val) => this.monthlyCalculatorForm.valid),
      tap(() => this.loading = true),
      debounceTime(1000),
      switchMap(() => this.monthlyPaymentCalcService.sendCalculatorData(this.monthlyCalculatorForm.value)));
  }

  addSpacer(price: any) {
    return String(price)
      .replace(
        /(?!^)(?=(?:\d{3})+$)/g,
        ' ')
  };

  get homePrice() {
    return this.monthlyCalculatorForm.get('homePrice') as FormControl<string>;
  }

  get mortgageAmount() {
    return this.monthlyCalculatorForm.get('mortgageAmount') as FormControl<string>;
  }

  get downPayment() {
    return this.monthlyCalculatorForm.get('downPayment') as FormControl<string>;
  }

  get downPaymentPercent() {
    return this.monthlyCalculatorForm.get('downPaymentPercent') as FormControl<string>;
  }

  get interestRate() {
    return this.monthlyCalculatorForm.get('interestRate') as FormControl<string>;
  }

  get mortgageTerm() {
    return this.monthlyCalculatorForm.get('mortgageTerm') as FormControl<string>;
  }
}
