import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShowMaxMortgageService } from '../../services/show-max-mortgage.service';
import { negativeValidator, applicantNetIncomeCheck, applicantWithDependentsCheck } from './manual-validators';
import { catchError, debounceTime, distinctUntilChanged, filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable, of } from 'rxjs';
import { formatNumber } from '@angular/common';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-max-loan-calculator',
  templateUrl: './max-loan-calculator.component.html',
  styleUrls: ['./max-loan-calculator.component.css'],
  providers: [DecimalPipe],

})


export class MaxLoanCalculatorComponent {
  loanForm: FormGroup;
  maxMortgageAmount: Observable<number> = of(0);
  maxMortgageAmountValue: number = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(private showMaxMortgageService: ShowMaxMortgageService, private formBuilder: FormBuilder, private decimalPipe: DecimalPipe) {
    this.loanForm = this.formBuilder.group({

      netIncome: ['', [Validators.required]],
      dependent: ['0', [Validators.pattern(/^[0-9]+$/)]],
      obligations: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), negativeValidator]],
      borrower: [('personal'), [Validators.required]]
    },
      { validators: [applicantNetIncomeCheck, applicantWithDependentsCheck] }
    );
  }

  get netIncome() {
    return this.loanForm.get('netIncome');
  }
  get obligations() {
    return this.loanForm.get('obligations');
  }
  get dependent() {
    return this.loanForm.get('dependent');
  }

  ngOnInit(): void {
    this.maxMortgageAmount = this.loanForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(() => {
        console.log(this.loanForm);

        if (this.loanForm.valid) {
          const isSingleApplicant = this.loanForm.get('borrower')?.value === 'personal';
          const netIncome = this.loanForm.get('netIncome')?.value;
          const familyMembers = this.loanForm.get('dependent')?.value;
          const monthlyObligationAmount = this.loanForm.get('obligations')?.value;

          return this.showMaxMortgageService.calculateMaxMortgageAmount(
            isSingleApplicant,
            netIncome,
            familyMembers,
            monthlyObligationAmount
          ).pipe(catchError(() => {
            return of(0)
          }));
        } else {
          return of(0);
        }
      }),
    );

    this.maxMortgageAmount.subscribe(amount => {
      this.maxMortgageAmountValue = amount;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeZeros(controlName: string) {
    const control = this.loanForm.get(controlName);
    if (control) {
      const value = control.value;
      const newValue = parseInt(value, 10);
      control.setValue(newValue);
    }
  }

}
