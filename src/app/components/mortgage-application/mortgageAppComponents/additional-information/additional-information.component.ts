import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
      coBorrower: new FormControl(),
      coBorrowerFirstName: new FormControl(''),
      coBorrowerLastName: new FormControl(''),
      coBorrowerPersonalNumber: new FormControl(''),
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
        this.coBorrowerNameControl?.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]);
        this.coBorrowerlNameControl?.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]);
        this.coBorrowerPersonalNumber?.setValidators([Validators.required,Validators.minLength(10), Validators.maxLength(15)]);
      } else {
        this.coBorrowerNameControl?.clearValidators();
        this.coBorrowerlNameControl?.clearValidators();
        this.coBorrowerPersonalNumber?.clearValidators();

        this.coBorrowerNameControl?.setValue("");
        this.coBorrowerlNameControl?.setValue("");
        this.coBorrowerPersonalNumber?.setValue("");
      }

      this.coBorrowerNameControl?.updateValueAndValidity();
      this.coBorrowerlNameControl?.updateValueAndValidity();
      this.coBorrowerPersonalNumber?.updateValueAndValidity();

    });
  }
  get coBorrowerStateControl() {
    return this.additionalInformationForm.get('coBorrower');
  }
  get coBorrowerNameControl() {
    return this.additionalInformationForm.get('coBorrowerFirstName');
  }
  get coBorrowerlNameControl() {
    return this.additionalInformationForm.get('coBorrowerLastName');
  }
  get coBorrowerPersonalNumber() {
    return this.additionalInformationForm.get('coBorrowerPersonalNumber');
  }
  get certificationControl() {
    return this.additionalInformationForm.get('certification');
  }
  get coBorrowerNameRequiredError() {
    return this.coBorrowerNameControl?.errors?.['required'] && this.coBorrowerNameControl!.touched;
  }
  get coBorrowerlNameRequiredError() {
    return this.coBorrowerlNameControl?.errors?.['required'] && this.coBorrowerlNameControl!.touched;
  }
  get coBorrowerPersonalNumberError() {
    return this.coBorrowerPersonalNumber?.errors?.['required'] && this.coBorrowerPersonalNumber!.touched;
  }
  get coBorrowerNamepatternError() {
    return this.coBorrowerNameControl?.errors?.['pattern'] && this.coBorrowerNameControl!.touched;
  }
  get coBorrowerlNamepatternError() {
    return this.coBorrowerlNameControl?.errors?.['pattern'] && this.coBorrowerlNameControl!.touched;
  }
  get coBorrowerPersonalLenghtError() {
    return this.coBorrowerPersonalNumber?.errors?.['minlength'] && this.coBorrowerPersonalNumber!.touched;
  }

  submitForm() {
    this.formSubmitted.emit();
  }
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}

