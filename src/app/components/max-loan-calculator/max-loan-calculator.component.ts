import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShowMaxMortgageService } from '../../services/show-max-mortgage.service';
import { negativeValidator, applicantNetIncomeCheck, applicantWithDependentsCheck } from './manual-validators';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-max-loan-calculator',
  templateUrl: './max-loan-calculator.component.html',
  styleUrls: ['./max-loan-calculator.component.css']
})

export class MaxLoanCalculatorComponent {
  loanForm: FormGroup;
  maxMortgageAmount: Observable<number> = of();

  private readonly destroy$ = new Subject<void>();

  constructor(private showMaxMortgageService: ShowMaxMortgageService, private formBuilder: FormBuilder,) {
    this.loanForm = this.formBuilder.group({

      netIncome: [0, [Validators.required]],
      dependent: ['', Validators.pattern(/^[0-9]+$/)],
      obligations: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)], negativeValidator],
      borrower: [('personal'), [Validators.required]]
    },
      // { validators: [applicantNetIncomeCheck, applicantWithDependentsCheck] }
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

  handleEmptyValue(controlName: string) {
    const control = this.loanForm.get(controlName);
    if (control && (control.value === '' || control.value === null)) {
      control.setValue(0);
    }
  }

  handleFocus(controlName: string) {
    const control = this.loanForm.get(controlName);
    if (control && control.value === 0) {
      control.setValue('');
    }
  }

  ngOnInit(): void {
    this.loanForm.valueChanges.pipe(tap(() => { console.log(this.loanForm) })).subscribe()
    this.maxMortgageAmount =
      this.loanForm.valueChanges
        .pipe(tap(() => {
          console.log('yes');
        }), takeUntil(this.destroy$),
          debounceTime(500),
          // distinctUntilChanged(),
          filter(() => this.loanForm.valid),
          switchMap(() => {
            const isSingleApplicant = this.loanForm.get('borrower')?.value === 'personal';
            const netIncome = this.loanForm.get('netIncome')?.value;
            const familyMembers = this.loanForm.get('dependent')?.value;
            const monthlyObligation = this.loanForm.get('obligations')?.value;

            return this.showMaxMortgageService.calculateMaxMortgageAmount(
              isSingleApplicant,
              netIncome,
              familyMembers,
              monthlyObligation
            );
          }),
          catchError(() => of())
        )
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
