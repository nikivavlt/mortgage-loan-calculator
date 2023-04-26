import { Component, Input } from '@angular/core';

interface MortgageFormData {
  maxMortgageAmount?: {
    maxLoan: number;
    maxMonthlyLoanPayment: number;
  };
  isSingleApplicant: boolean;
  netIncome: number;
  familyMembers: number;
  monthlyObligationAmount: number;
}
interface MaxMortgageData {
  maxLoan: number;
  maxMonthlyLoanPayment: number;
}


@Component({
  selector: 'app-show-max-mortgage-amount',
  templateUrl: './show-max-mortgage-amount.component.html',
  styleUrls: ['./show-max-mortgage-amount.component.css']
})
export class ShowMaxMortgageAmountComponent {
  @Input() maxMortgageAmount: MaxMortgageData | undefined;

  constructor() { }
}
