import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DropDownItem } from 'src/app/interfaces/application-form-drop-down-item';

@Component({
  selector: 'app-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.css']
})
export class LoanInformationComponent {
  loanInformationForm: FormGroup;
  loanTermValues: DropDownItem [] = [];

  @Output() formChanged = new EventEmitter<boolean>();
  private serviceSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    for (let i = 1; i <= 30; i++) {
      this.loanTermValues.push({ value: i.toString(), viewValue: i.toString() });
    }

    this.loanInformationForm = this.fb.group({
      loanAmount: new FormControl('',Validators.required),
      loanPurpose: new FormControl('',Validators.required),
      termOfLoan: new FormControl('',Validators.required),
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
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
