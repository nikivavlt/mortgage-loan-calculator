import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChildCount } from 'src/app/enums/child-count';
import { DropDownItem } from 'src/app/interfaces/application-form-interfaces';
import { ApplicationFormValidators } from 'src/app/validators/application-form-validators';

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
      monthlyObligations: new FormControl(''),
    });

    this.serviceSubscription = this.incomeAndFinancialLiabilitiesForm.statusChanges.subscribe(() => {
      if (this.incomeAndFinancialLiabilitiesForm.valid) {
        this.formChanged.emit(true);
      } else {
        this.formChanged.emit(false);
      }
    });

    this.incomeAndFinancialLiabilitiesForm.get('financialObligations')!.valueChanges.subscribe((value) => {
      if (value) {
        this.monthlyObligationsControl!.setValidators(Validators.required);
      } else {
        this.monthlyObligationsControl!.clearValidators();
        this.monthlyObligationsControl?.setValue("");
      }

      this.monthlyObligationsControl!.updateValueAndValidity();
    });
  }

  get netIncomeControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('netIncome');
  }
  get childrenAmountControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('childrenAmount');
  }
  get educationControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('education');
  }
  get employerControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('employer');
  }
  get positionControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('position');
  }
  get timeEmployedControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('timeEmployed');
  }
  get contractTypeControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('contractType');
  }
  get financialObligationsControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('financialObligations');
  }
  get monthlyObligationsControl() {
    return this.incomeAndFinancialLiabilitiesForm.get('monthlyObligations');
  }


  get netIncomeControlRequiredError() {
    return this.netIncomeControl?.errors?.['required'] && this.netIncomeControl!.touched;
  }
  get childrenAmountControlRequiredError() {
    return this.childrenAmountControl?.errors?.['required'] && this.childrenAmountControl!.touched;
  }
  get educationControlRequiredError() {
    return this.educationControl?.errors?.['required'] && this.educationControl!.touched;
  }
  get employerControlRequiredError() {
    return this.employerControl?.errors?.['required'] && this.employerControl!.touched;
  }
  get positionControlRequiredError() {
    return this.positionControl?.errors?.['required'] && this.positionControl!.touched;
  }
  get timeEmployedControlRequiredError() {
    return this.timeEmployedControl?.errors?.['required'] && this.timeEmployedControl!.touched;
  }
  get contractTypeControlRequiredError() {
    return this.contractTypeControl?.errors?.['required'] && this.contractTypeControl!.touched;
  }
  get financialObligationsControlRequiredError() {
    return this.financialObligationsControl?.errors?.['required'] && this.financialObligationsControl!.touched;
  }
  get monthlyObligationsControlRequiredError() {
    return this.monthlyObligationsControl?.errors?.['required'] && this.monthlyObligationsControl!.touched;
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
