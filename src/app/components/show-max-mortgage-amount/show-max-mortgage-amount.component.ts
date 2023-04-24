import { Component, Input } from '@angular/core';

interface MortgageFormData {
  maxMortgageAmount?: number;
  isSingleApplicant: boolean;
  netIncome: number;
  familyMember: number;
  monthlyObligationAmount: number;
}

@Component({
  selector: 'app-show-max-mortgage-amount',
  templateUrl: './show-max-mortgage-amount.component.html',
  styleUrls: ['./show-max-mortgage-amount.component.css']
})
export class ShowMaxMortgageAmountComponent {
  @Input() maxMortgageAmount: number = 0;

  constructor() { }
}
