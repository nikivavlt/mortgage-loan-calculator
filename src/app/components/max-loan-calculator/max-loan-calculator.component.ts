import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShowMaxMortgageService } from '../../services/show-max-mortgage.service';
import { negativeValidator, applicantNetIncomeCheck, applicantWithDependentsCheck } from './manual-validators';

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
}
