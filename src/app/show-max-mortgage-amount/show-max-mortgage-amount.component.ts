import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ShowMaxMortgageService } from '../services/show-max-mortgage.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

interface MortgageFormData {
  maxMortgageAmount?: number;
  isJustMe: boolean;
  netIncome: number;
  familyMembers: number;
  monthlyObligation: number;
}

@Component({
  selector: 'app-show-max-mortgage-amount',
  templateUrl: './show-max-mortgage-amount.component.html',
  styleUrls: ['./show-max-mortgage-amount.component.css']
})
export class ShowMaxMortgageAmountComponent implements OnInit {
  formData: MortgageFormData = {
    isJustMe: false,
    netIncome: 0,
    familyMembers: 0,
    monthlyObligation: 0,
  };

  @Input() loanForm!: FormGroup;
  @Input() maxMortgageAmount: number | undefined;


  @Output() maxMortgageAmountChange = new EventEmitter<number>();

  constructor(private showMaxMortgageService: ShowMaxMortgageService) { }

  ngOnInit(): void {
    this.loanForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => this.loanForm.valid),
        switchMap(() => {
          const isJustMe = this.loanForm.get('borrower')?.value === 'personal';
          const netIncome = this.loanForm.get('netIncome')?.value;
          const familyMembers = this.loanForm.get('dependent')?.value;
          const monthlyObligation = this.loanForm.get('obligations')?.value;

          console.log('borrower:', this.loanForm.get('borrower')?.value);
          console.log('isJustMe:', isJustMe);


          return this.showMaxMortgageService.calculateMaxMortgageAmount(
            isJustMe,
            netIncome,
            familyMembers,
            monthlyObligation
          );
        })
      )
      .subscribe({
        next: (amount: number) => {
          this.maxMortgageAmountChange.emit(amount);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
  }
}
