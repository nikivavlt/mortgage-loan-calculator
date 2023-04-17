import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { ShowMaxMortgageService } from '../services/show-max-mortgage.service';


const negativeValidator: ValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const netIncome = control.value;
  return of(netIncome && netIncome < 0 ? { negativeNetIncome: true } : null).pipe(
    delay(500)
  );
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
      borrower: ['personal'],
      netIncome: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)], negativeValidator],
      dependent: ['', Validators.required],
      obligations: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)], negativeValidator],
    });
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

