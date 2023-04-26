import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Observable, debounceTime, filter, of, switchMap, tap, distinctUntilChanged, catchError } from 'rxjs';
import { Chart } from 'chart.js';
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
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any;

  monthlyCalculatorForm: FormGroup;

  constructor(private monthlyPaymentCalcService: MonthlyPaymentCalcService) {
    this.monthlyCalculatorForm = formBuilder.group({
      homePrice: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(5000)]],
      mortgageAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPayment: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      downPaymentPercent: ['', [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$"), Validators.min(15), Validators.max(99)]],
      interestRate: ['', [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$")]],
      mortgageTerm: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(30)]],
    }, { validators: [downPaymentValidator, mortgageAmountValidator] })
  }

  ngOnInit(): void {
    this.monthlyCalculatorForm.controls?.['homePrice']
      .valueChanges
      .subscribe(() => {
        if (this.monthlyCalculatorForm.controls?.['homePrice'].valid) {
          this.onHomePriceChanged();
        }
      });

    this.monthlyCalculatorForm.controls?.['mortgageAmount']
      .valueChanges
      .subscribe(() => {
        this.onMortgageAmountChanged();
      });

    this.monthlyCalculatorForm.controls?.['downPayment']
      .valueChanges
      .subscribe(() => {
        this.onDownPaymentChanged();
      });

    this.monthlyCalculatorForm.controls?.['downPaymentPercent']
      .valueChanges
      .subscribe(() => {
        this.onDownPaymentPercentChanged();
      });

    this.calculations$ = this.monthlyCalculatorForm.valueChanges.pipe(
      debounceTime(1000),
      filter(() => this.monthlyCalculatorForm.valid),
      switchMap(() => {
        this.loading = true;
        return this.monthlyPaymentCalcService.sendCalculatorData(this.monthlyCalculatorForm.value).pipe(
          catchError((error) => {
            return of(0);
          }),
          tap(() => {
            this.loading = false;
          }),
        );
      }),
    );

    this.calculations$.subscribe((response) => {
      this.doughnutChartMethod(this.mortgageAmount.value, this.downPayment.value, response.interestCost);
    });
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

  doughnutChartMethod(mortgageAmount: string, downPayment: string, interestCost: string) {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Mortgage amount', 'Down payment', 'Interest cost'],
        datasets: [
          {
            label: 'Euros',
            data: [Number(mortgageAmount), Number(downPayment), Number(interestCost)],
            backgroundColor: [
              '#6C9BCF', // Color for 'Monthly payment'
              '#AAC4FF', // Color for 'Total payable amount'
              '#D2DAFF'  // Color for 'Interest cost'
            ],
            hoverBackgroundColor: [
              '#5A86B7', // Hover color for 'Monthly payment'
              '#8DA9E6', // Hover color for 'Total payable amount'
              '#B7C5F3'  // Hover color for 'Interest cost'
            ],
          },
        ],
      },
    });
  }

  private onHomePriceChanged(): void {
    if (this.monthlyCalculatorForm.controls?.['mortgageAmount'].valid &&
      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].valid) {

      const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;
      const downPaymentPercent = this.monthlyCalculatorForm.controls?.['downPaymentPercent'].value;

      const newDownPayment = downPaymentPercent * homePrice / 100;
      const newMortgageAmount = homePrice - newDownPayment;

      this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), { emitEvent: false });
    }

    if (this.monthlyCalculatorForm.controls?.['mortgageAmount'].valid) {

      const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;
      const mortgageAmount = this.monthlyCalculatorForm.controls?.['mortgageAmount'].value;

      const newDownPayment = homePrice - mortgageAmount;
      const newDownPaymentPercent = this.monthlyCalculatorForm.controls?.['downPayment'].value * 100 / homePrice;

      this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), { emitEvent: false });

    }

    if (this.monthlyCalculatorForm.controls?.['downPayment'].valid) {
      const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;
      const downPayment = this.monthlyCalculatorForm.controls?.['downPayment'].value;

      const newMortgageAmount = homePrice - downPayment;
      const newDownPaymentPercent = downPayment * 100 / homePrice;

      this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), { emitEvent: false });
    }

    else {
      this.monthlyCalculatorForm.controls?.['mortgageAmount'].reset();
      this.monthlyCalculatorForm.controls?.['downPayment'].reset();
      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].reset();
      this.monthlyCalculatorForm.controls?.['interestRate'].reset();
      this.monthlyCalculatorForm.controls?.['mortgageTerm'].reset();
    }
  }

  private onDownPaymentChanged(): void {
    const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

    if (this.monthlyCalculatorForm.controls?.['downPayment'].valid &&
      this.monthlyCalculatorForm.controls?.['homePrice'].valid &&
      this.monthlyCalculatorForm.controls?.['downPayment'].value >= 0.15 * homePrice &&
      this.monthlyCalculatorForm.controls?.['downPayment'].value <= 0.99 * homePrice) {

      const newDownPaymentPercent = (this.monthlyCalculatorForm.controls?.['downPayment'].value * 100 / homePrice);
      const newMortgageAmount = (homePrice - this.monthlyCalculatorForm.controls?.['downPayment'].value);

      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), { emitEvent: false });
    }
  }

  private onDownPaymentPercentChanged(): void {
    if (this.monthlyCalculatorForm.controls?.['downPaymentPercent'].valid &&
      this.monthlyCalculatorForm.controls?.['homePrice'].valid) {

      const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

      const newDownPayment = (this.monthlyCalculatorForm.controls?.['downPaymentPercent'].value * homePrice / 100);
      const newMortgageAmount = (homePrice - newDownPayment);

      this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['mortgageAmount'].patchValue(newMortgageAmount.toFixed(0), { emitEvent: false });
    }
  }

  private onMortgageAmountChanged(): void {
    const homePrice = this.monthlyCalculatorForm.controls?.['homePrice'].value;

    if (this.monthlyCalculatorForm.controls?.['mortgageAmount'].valid &&
      this.monthlyCalculatorForm.controls?.['homePrice'].valid &&
      this.monthlyCalculatorForm.controls?.['mortgageAmount'].value < homePrice) {

      const newDownPayment = homePrice - this.monthlyCalculatorForm.controls?.['mortgageAmount'].value;
      const newDownPaymentPercent = newDownPayment * 100 / homePrice;

      this.monthlyCalculatorForm.controls?.['downPayment'].patchValue(newDownPayment.toFixed(0), { emitEvent: false });
      this.monthlyCalculatorForm.controls?.['downPaymentPercent'].patchValue(newDownPaymentPercent.toFixed(2), { emitEvent: false });
    }
  }
}
