import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl, RequiredValidator } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ValidatorFn, AbstractControl } from '@angular/forms';


interface dropDownInterface {
  value: string;
  viewValue: string;
}
function coBorrowerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const coBorrower = control.get('coBorrower')?.value || '';
    const coBorrowerName = control.get('coBorrowerName')?.value || '';
    const coBorrowerPersonalNumber = control.get('coBorrowerPersonalNumber')?.value || '';

    if (coBorrower === 'yes') {
      const errors: { [key: string]: any } = {};

      if (!coBorrowerName) {
        errors['coBorrowerNameRequired'] = true;
      }

      if (!coBorrowerPersonalNumber) {
        errors['coBorrowerPersonalNumberRequired'] = true;
      }

      return Object.keys(errors).length ? errors : null;
    }

    return null;
  };
}

@Component({
  selector: 'app-third-tab',
  templateUrl: './third-tab.component.html',
  styleUrls: ['./third-tab.component.css']
})
export class ThirdTabComponent {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  stepFourForm: FormGroup;
  coBorrower: string = 'no';
  stepperType = 'vertical';

  educationValues: dropDownInterface[] = [
    {value: 'primary', viewValue: 'Primary'},
    {value: 'Secondary', viewValue: 'Secondary'},
    {value: 'Vocational', viewValue: 'Vocational'},
    {value: 'College', viewValue: 'College'},
    {value: 'Higher', viewValue: 'Higher'},
  ];
  timeEmployedValues: dropDownInterface[] = [
    {value: 'trial', viewValue: 'Trial period'},
    {value: '1year', viewValue: 'Up to 1 year'},
    {value: '1to3', viewValue: '1-3 years'},
    {value: '3to5', viewValue: '3-5 years'},
    {value: '5years', viewValue: 'More than 5 years'},
  ];
  contractTypeValues: dropDownInterface[] = [
    {value: 'openEnded', viewValue: 'Open-end'},
    {value: 'fixedTerm', viewValue: 'Fixed term'},
    {value: 'other', viewValue: 'Other'},
  ];
  loanTermValues: dropDownInterface[] = [];

  constructor(private fb: FormBuilder,private breakpointObserver: BreakpointObserver) {
    for (let i = 1; i <= 30; i++) {
      this.loanTermValues.push({ value: i.toString(), viewValue: i.toString() });
    }

    this.stepOneForm = this.fb.group({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('',Validators.required),
      pNum: new FormControl('',Validators.required)
    });
    this.stepTwoForm = this.fb.group({
      netIncome: new FormControl('',Validators.required),
      childnum: new FormControl('',Validators.required),
      education: new FormControl('',Validators.required),
      employer: new FormControl('',Validators.required),
      position: new FormControl('',Validators.required),
      timeEmployed: new FormControl('',Validators.required),
      contractType: new FormControl('',Validators.required),
      financialObl: new FormControl('',Validators.required),
      monthlyObligations: new FormControl('',Validators.required),

    });
    this.stepThreeForm = this.fb.group({
      loanAmmount: new FormControl('',Validators.required),
      loanPurpose: new FormControl('',Validators.required),
      termOfLoan: new FormControl('',Validators.required),
      propertyType: new FormControl('',Validators.required),
      propertyPrice: new FormControl('',Validators.required),
      evaluatedPropertyPrice: new FormControl('',Validators.required),
    });
    this.stepFourForm = this.fb.group({
      coBorrower: new FormControl('',),
      coBorrowerName: new FormControl('',),
      coBorrowerPersonalNumber: new FormControl('',),
      certification: new FormControl(false,Validators.required),
    }, { validators: [coBorrowerValidator()] });
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        if (result.matches) {
          this.stepperType = 'vertical';
        } else {
          this.stepperType = 'horizontal';
        }
      });
  }
  getOrientation(): StepperOrientation {
    return this.stepperType === 'vertical' ? 'vertical' : 'horizontal';
  }

  submitForm() {
    const data = {
      fullname: this.stepOneForm.get('fullname')?.value || '',
      email: this.stepOneForm.get('email')?.value || '',
      phoneNumber: this.stepOneForm.get('phoneNumber')?.value || '',
      pNum: this.stepOneForm.get('pNum')?.value || '',
      netIncome: this.stepTwoForm.get('netIncome')?.value || '',
      childnum: this.stepTwoForm.get('childnum')?.value || '',
      education: this.stepTwoForm.get('education')?.value || '',
      employer: this.stepTwoForm.get('employer')?.value || '',
      position: this.stepTwoForm.get('position')?.value || '',
      timeEmployed: this.stepTwoForm.get('timeEmployed')?.value || '',
      contractType: this.stepTwoForm.get('contractType')?.value || '',
      financialObl: this.stepTwoForm.get('financialObl')?.value || '',
      monthlyObligations: this.stepTwoForm.get('monthlyObligations')?.value || '',
      loanAmmount: this.stepThreeForm.get('loanAmmount')?.value || '',
      loanPurpose: this.stepThreeForm.get('loanPurpose')?.value || '',
      termOfLoan: this.stepThreeForm.get('termOfLoan')?.value || '',
      propertyType: this.stepThreeForm.get('propertyType')?.value || '',
      propertyPrice: this.stepThreeForm.get('propertyPrice')?.value || '',
      evaluatedPropertyPrice: this.stepThreeForm.get('evaluatedPropertyPrice')?.value || '',
      coBorrower: this.stepFourForm.get('coBorrower')?.value || '',
      coBorrowerName: this.stepFourForm.get('coBorrowerName')?.value || '',
      coBorrowerPersonalNumber: this.stepFourForm.get('coBorrowerPersonalNumber')?.value || '',
      certification: this.stepFourForm.get('certification')?.value || ''
    };

    // Make the POST request using the data object
  }
}


