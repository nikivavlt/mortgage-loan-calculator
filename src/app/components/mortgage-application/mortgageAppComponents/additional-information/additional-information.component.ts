import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApplicationFormValidators } from 'src/app/validators/application-form-validators';

@Component({
  selector: 'app-additional-information',
  templateUrl: './additional-information.component.html',
  styleUrls: ['./additional-information.component.css']
})
export class AdditionalInformationComponent {
  @Output() formChanged = new EventEmitter<boolean>();
  @Output() formSubmitted = new EventEmitter<void>();

  additionalInformationForm!: FormGroup;
  private serviceSubscription: Subscription;




  constructor(private fb: FormBuilder) {
    this.additionalInformationForm = this.fb.group({
      coBorrower: new FormControl(false,),
      coBorrowerName: new FormControl('', ApplicationFormValidators.coBorrowerValidator),
      coBorrowerlName: new FormControl('', ApplicationFormValidators.coBorrowerValidator),
      coBorrowerPersonalNumber: new FormControl('', ApplicationFormValidators.coBorrowerValidator),
      certification: new FormControl(false, Validators.required)
    })

    this.serviceSubscription = this.additionalInformationForm.statusChanges.subscribe(() => {
      if (this.additionalInformationForm.valid) {
        this.formChanged.emit(true);
      } else {
        this.formChanged.emit(false);
      }
    });
  }

  ngOnInit() {
    this.additionalInformationForm.get('coBorrower')!.valueChanges.subscribe((value) => {
      if (value) {
        this.additionalInformationForm.get('coBorrowerName')!.setValidators(Validators.required);
        this.additionalInformationForm.get('coBorrowerPersonalNumber')!.setValidators(Validators.required);
      } else {
        this.additionalInformationForm.get('coBorrowerName')!.clearValidators();
        this.additionalInformationForm.get('coBorrowerPersonalNumber')!.clearValidators();
      }

      this.additionalInformationForm.get('coBorrowerName')!.updateValueAndValidity();
      this.additionalInformationForm.get('coBorrowerPersonalNumber')!.updateValueAndValidity();
    });
  }
  get coBorrowerStateControl() {
    return this.additionalInformationForm.get('coBorrower');
  }
  get coBorrowerNameControl() {
    return this.additionalInformationForm.get('coBorrowerName');
  }
  get coBorrowerlNameControl() {
    return this.additionalInformationForm.get('coBorrowerlName');
  }
  get coBorrowerPersonalNumber() {
    return this.additionalInformationForm.get('coBorrowerPersonalNumber');
  }
  get coBorrowerNameRequiredError() {
    return this.coBorrowerNameControl?.errors?.['required'] && this.coBorrowerNameControl!.touched;
  }
  get coBorrowerlNameRequiredError() {
    return this.coBorrowerlNameControl?.errors?.['required'] && this.coBorrowerlNameControl!.touched;
  }
  get coBorrowerPersonalNumberError() {
    return this.coBorrowerPersonalNumber!.hasError('required') && this.coBorrowerPersonalNumber!.touched;
  }

  submitForm() {
    this.formSubmitted.emit();
  }
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}

