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
    this.loanInformationForm = this.fb.group({
      loanAmount: new FormControl('',Validators.required),
      loanPurpose: new FormControl('',Validators.required),
      termOfLoan: new FormControl('1',Validators.required),
      propertyType: new FormControl('',Validators.required),
      propertyPrice: new FormControl('',Validators.required),
      evaluatedPropertyPrice: new FormControl('',Validators.required),
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
    const sliderValue = (event.target as HTMLInputElement).value;
    this.sliderValue = Number(sliderValue);
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe(); //TODO USE
  }
}
