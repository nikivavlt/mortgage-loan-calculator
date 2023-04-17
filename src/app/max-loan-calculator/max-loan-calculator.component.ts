import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

const negativeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const netIncome = control.value;
  return netIncome && netIncome < 0 ? { negativeNetIncome: true } : null;
}

const applicantNetIncomeCheck: ValidatorFn = (control) => {
  const applicants = control.get('applicant')?.value;
  const netIncome = control.value.netIncome;
console.log( netIncome)
  if (applicants==='personal' && netIncome < 600) {
    return { applicantNetIncomeCheck: true }
  } else if(applicants==='co-borrower' && netIncome < 1000){
    return {applicantWithCoBorrowerError: true} 
  }
  return null
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
      netIncome: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator]), 
      obligations: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      dependent: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator]),
      applicant: new FormControl('personal', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator]),
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

}



// const applicantWithCoBorrowerCheck: ValidatorFn = (formControl) => {
//   if (formControl.value < 1000) {
//     return { applicantWithCoBorrowerCheck: true }
//   } return null
// }
