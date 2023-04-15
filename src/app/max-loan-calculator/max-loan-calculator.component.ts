import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

const negativeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const netIncome = control.value;
  return netIncome && netIncome < 0 ? { negativeNetIncome: true } : null;
}

const applicantNetIncomeCheck: ValidatorFn = (formControl) => {
  if (formControl.value < 600) {
    return { applicantNetIncomeCheck: true }
  } return null
}

const applicantWithDependentsCheck: ValidatorFn = (control) => {
  const netIncome = control.get('netIncome')?.value;
  const dependents = control.get('dependent')?.value;

  if (dependents >= 2 && netIncome < 1000) {
    return { applicantWithMoreThanTwoDependentsError: true };
  } else if (dependents === 1 && netIncome < 650) {
    return { applicantWithOneDependentError: true };
  } else {
    return null
  }
}

@Component({
  selector: 'app-max-loan-calculator',
  templateUrl: './max-loan-calculator.component.html',
  styleUrls: ['./max-loan-calculator.component.css']
})

export class MaxLoanCalculatorComponent {
  loanForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      netIncome: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator, applicantNetIncomeCheck]),
      obligations: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      dependent: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator])
    },
      { validators: [applicantWithDependentsCheck] }
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
}

