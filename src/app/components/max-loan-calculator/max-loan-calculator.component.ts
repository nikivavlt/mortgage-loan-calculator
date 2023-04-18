import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { ShowMaxMortgageService } from '../../services/show-max-mortgage.service';


const negativeValidator: ValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const netIncome = control.value;
  return of(netIncome && netIncome < 0 ? { negativeNetIncome: true } : null).pipe(
    delay(500)
  );
}

const applicantNetIncomeCheck: ValidatorFn = (control) => {
  const dependents = control.get('dependent')?.value;
  const applicants = control.get('borrower')?.value;
  const netIncome = control.value.netIncome;

  if (applicants==='personal' && (!dependents || dependents === 0) && netIncome < 600) {
    return { applicantNetIncomeCheck: true }
  } else if(applicants==='co-borrower' && netIncome < 1000){
    return {applicantWithCoBorrowerError: true}
  }
  return null
}

const applicantWithDependentsCheck: ValidatorFn = (control) => {
  const netIncome = control.get('netIncome')?.value;
  const dependents = control.get('dependent')?.value;
  const applicants = control.get('borrower')?.value;

  if (applicants==='personal' && dependents >= 2 && netIncome < 1000) {
    return { applicantWithMoreThanTwoDependentsError: true };
  } else if (applicants==='personal' && dependents === 1 && netIncome < 650) {
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
  @Input() maxMortgageAmount: number | undefined;


  constructor(private showMaxMortgageService: ShowMaxMortgageService, private formBuilder: FormBuilder) {
    this.loanForm = this.formBuilder.group({

      netIncome: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)], negativeValidator],
      dependent: ['', Validators.required],
      obligations: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)], negativeValidator],
      borrower: [('personal'), [Validators.required, Validators.pattern(/^\d+$/), negativeValidator]],
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
