import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, debounceTime, filter, of, switchMap, tap } from 'rxjs';

import { minimumHomePrice, downPaymentValidator, minimumMortgageTerm, maximumMortgageTerm } from './manual-validators';
import { UserService } from '../../services/user.service';
import { MonthlyPaymentCalcResponse } from '../../interfaces/monthly-payment-calc-response';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-monthly-payment-calc',
  templateUrl: './monthly-payment-calc.component.html',
  styleUrls: ['./monthly-payment-calc.component.css']
})

export class MonthlyPaymentCalc implements OnInit {

  loading: boolean = false;

  currentHomePrice: number = 0;

  calculations$: Observable<MonthlyPaymentCalcResponse> = of();

  monthlyCalculatorForm: FormGroup;

  constructor(private userService: UserService) {

    this.monthlyCalculatorForm = formBuilder.group({
      homePrice: ['', [Validators.required, Validators.pattern("^[0-9]*$"), minimumHomePrice]],
      mortgageAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPayment: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPaymentPercent: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      interestRate: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      mortgageTerm: ['', [Validators.required, Validators.pattern("^[0-9]*$"), minimumMortgageTerm, maximumMortgageTerm]],
    }, { validators: [downPaymentValidator] } )

  }

  ngOnInit(){

    this.monthlyCalculatorForm.controls?.['homePrice']
      .valueChanges
      .subscribe(price => {
        this.currentHomePrice = price;
        if (this.monthlyCalculatorForm.controls?.['downPayment'].dirty) {
          this.monthlyCalculatorForm.controls?.['downPayment'].updateValueAndValidity();
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].updateValueAndValidity();
        }
      });

    this.monthlyCalculatorForm.controls?.['downPayment']
      .valueChanges
      .subscribe(downPayment => {

        const newPercent = downPayment * 100 / this.currentHomePrice;

        if (newPercent === Infinity || Number.isNaN(newPercent)) {
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(0, {emitEvent: false});
        }
        else {
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newPercent, {emitEvent: false});
        }
      });

    this.monthlyCalculatorForm.controls?.['downPaymentPercent']
      .valueChanges
      .subscribe(downPaymentPercent => {

      const newDownPayment = downPaymentPercent * this.currentHomePrice / 100;

      this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment, {emitEvent: false});
    });

    this.calculations$ = this.monthlyCalculatorForm.valueChanges.pipe(
      filter((val) => this.monthlyCalculatorForm.valid),
      tap(() => this.loading = true),
      debounceTime(1000),
      switchMap(() => this.userService.sendCalculatorData(this.monthlyCalculatorForm.value)))


  }

  get homePrice() {
    return this.monthlyCalculatorForm.get('homePrice') as FormControl<string>;
  }

  get mortgageAmount() {
    return this.monthlyCalculatorForm.get('mortgageAmount') as FormControl<string>;
  }

  get downPayment() {
    return this.monthlyCalculatorForm.get('downPayment') as FormControl<string>;
  }

  get interestRate() {
    return this.monthlyCalculatorForm.get('interestRate') as FormControl<string>;
  }

  get mortgageTerm() {
    return this.monthlyCalculatorForm.get('mortgageTerm') as FormControl<string>;
  }
}
