import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';


const negativeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const netIncome = control.value;
  return netIncome && netIncome < 0 ? { negativeNetIncome: true } : null;
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
      dependent: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), negativeValidator])
    });
  }
  submitForm() {
    if (this.loanForm?.valid) {
    }
    const netIncome = this.loanForm?.value.netIncome;
    console.log(`Number entered: ${netIncome}`);
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

