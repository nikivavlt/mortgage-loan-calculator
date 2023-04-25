import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.css']
})
export class LoanInformationComponent {
  loanInformationForm: FormGroup;
  sliderValue: number = 1;

  @Output() formChanged = new EventEmitter<boolean>();
  private serviceSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.loanInformationForm = this.fb.nonNullable.group({
      loanAmount: new FormControl('', Validators.required),
      loanPurpose: new FormControl('', Validators.required),
      termOfLoan: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(30)],),
      propertyType: new FormControl('', Validators.required),
      propertyPrice: new FormControl('', Validators.required),
      evaluatedPropertyPrice: new FormControl('', Validators.required),
    });


    this.serviceSubscription = this.loanInformationForm.statusChanges.subscribe(() => {
      if (this.loanInformationForm.valid) {
        this.formChanged.emit(true);
      } else {
        this.formChanged.emit(false);
      }
    });
  }
  onSliderInput(event: Event) {
    // const sliderValue = (event.target as HTMLInputElement).value;
    // this.sliderValue = this.loanInformationForm.get('termOfLoan')?.value
    this.termOfLoanControl?.patchValue((event.target as HTMLInputElement).value);
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.termOfLoanControl?.patchValue(inputValue);
  }

  get loanAmountControl() {
    return this.loanInformationForm.get('loanAmount');
  }
  get loanPurposeControl() {
    return this.loanInformationForm.get('loanPurpose');
  }
  get propertyTypeControl() {
    return this.loanInformationForm.get('propertyType');
  }
  get propertyPriceControl() {
    return this.loanInformationForm.get('propertyPrice');
  }
  get evaluatedPropertyPriceControl() {
    return this.loanInformationForm.get('evaluatedPropertyPrice');
  }
  get termOfLoanControl() {
    return this.loanInformationForm.get('termOfLoan');
  }


  get loanAmountRequiredError() {
    return this.loanAmountControl?.errors?.['required'] && this.loanAmountControl!.touched;
  }
  get loanPurposeRequiredError() {
    return this.loanPurposeControl?.errors?.['required'] && this.loanPurposeControl!.touched;
  }
  get propertyTypeRequiredError() {
    return this.propertyTypeControl?.errors?.['required'] && this.propertyTypeControl!.touched;
  }
  get propertyPriceRequiredError() {
    return this.propertyPriceControl?.errors?.['required'] && this.propertyPriceControl!.touched;
  }
  get evaluatedPropertyPriceRequiredError() {
    return this.evaluatedPropertyPriceControl?.errors?.['required'] && this.evaluatedPropertyPriceControl!.touched;
  }
  get termOfLoanRequiredError() {
    return this.termOfLoanControl?.errors?.['required'] && this.termOfLoanControl!.touched;
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe(); //TODO USE
  }
}
