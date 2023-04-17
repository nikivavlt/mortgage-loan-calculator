import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { minimumHomePrice, downPaymentValidator, minimumMortgageTerm, maximumMortgageTerm } from './manual-validators';
import { UserService } from '../user.service';
import { Observable, debounceTime, filter, from, map, of, switchMap } from 'rxjs';
import { MonthlyPaymentCalcResponse } from '../interfaces/monthly-payment-calc-response';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-monthly-payment-calc',
  templateUrl: './monthly-payment-calc.component.html',
  styleUrls: ['./monthly-payment-calc.component.css']
})

export class MonthlyPaymentCalc implements OnInit {

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
        this.monthlyCalculatorForm.controls?.['downPayment'].updateValueAndValidity();
      });

    this.monthlyCalculatorForm.controls?.['downPayment']
      .valueChanges
      .subscribe(downPayment => {

        const newPercent = downPayment * 100 / this.currentHomePrice;

        if (newPercent === Infinity || Number.isNaN(newPercent)) {
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(0);
        }
        else {
          this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newPercent);
        }
      });

    this.calculations$ = this.monthlyCalculatorForm.valueChanges.pipe(
      filter((val) => this.monthlyCalculatorForm.valid),
      map(() => ({ monthlyPayment: "Calculating..", totalPayableAmount: "Calculating..", interestCost: "Calculating.." }) ),
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
