import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChildCount } from 'src/app/enums/child-count';
import { DropDownItem } from 'src/app/interfaces/application-form-interfaces';

@Component({
  selector: 'app-income-and-financial-liabilities',
  templateUrl: './income-and-financial-liabilities.component.html',
  styleUrls: ['./income-and-financial-liabilities.component.css']
})
export class IncomeAndFinancialLiabilitiesComponent {
  @Output() formChanged = new EventEmitter<boolean>();
  incomeAndFinancialLiabilitiesForm: FormGroup;
  private serviceSubscription: Subscription;
  childCountEnum = ChildCount;

  educationValues: DropDownItem [] = [
    {value: 'primary', viewValue: 'Primary'},
    {value: 'Secondary', viewValue: 'Secondary'},
    {value: 'Vocational', viewValue: 'Vocational'},
    {value: 'College', viewValue: 'College'},
    {value: 'Higher', viewValue: 'Higher'},
  ];
  timeEmployedValues: DropDownItem [] = [
    {value: 'trial', viewValue: 'Trial period'},
    {value: '1year', viewValue: 'Up to 1 year'},
    {value: '1to3', viewValue: '1-3 years'},
    {value: '3to5', viewValue: '3-5 years'},
    {value: '5years', viewValue: 'More than 5 years'},
  ];
  contractTypeValues: DropDownItem [] = [
    {value: 'openEnded', viewValue: 'Open-end'},
    {value: 'fixedTerm', viewValue: 'Fixed term'},
    {value: 'other', viewValue: 'Other'},
  ];

  constructor(private fb: FormBuilder) {
    this.incomeAndFinancialLiabilitiesForm = this.fb.group({
      netIncome: new FormControl('',Validators.required),
      childrenAmount: new FormControl('',Validators.required),
      education: new FormControl('',Validators.required),
      employer: new FormControl('',Validators.required),
      position: new FormControl('',Validators.required),
      timeEmployed: new FormControl('',Validators.required),
      contractType: new FormControl('',Validators.required),
      financialObligations: new FormControl('',Validators.required),
      monthlyObligations: new FormControl('',Validators.required),
    });

    this.serviceSubscription = this.incomeAndFinancialLiabilitiesForm.statusChanges.subscribe(() => {
      if (this.incomeAndFinancialLiabilitiesForm.valid) {
        this.formChanged.emit(true);
      } else {
        this.formChanged.emit(false);
      }
    });
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
