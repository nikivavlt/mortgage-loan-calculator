import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent {
  @Output() formChanged = new EventEmitter<boolean>();
  personalInformationForm: FormGroup;
  private serviceSubscription: Subscription;

  constructor(private fb: FormBuilder) {
    this.personalInformationForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$')]),
      personalNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(15)])
    });

    this.serviceSubscription = this.personalInformationForm.statusChanges.subscribe(() => {
      if (this.personalInformationForm.valid) {
        this.formChanged.emit(true);
      } else {
        this.formChanged.emit(false);
      }
    });
  }

  get nameControl() {
    return this.personalInformationForm.get('firstName');
  }
  get lnameControl() {
    return this.personalInformationForm.get('lastName');
  }
  get personalNumberControl() {
    return this.personalInformationForm.get('personalNumber');
  }
  get phoneNumberControl() {
    return this.personalInformationForm.get('phoneNumber');
  }
  get emailControl() {
    return this.personalInformationForm.get('email');
  }

  get nameControlRequiredError() {
    return this.nameControl?.errors?.['required'] && this.nameControl!.touched;
  }
  get lnameControlRequiredError() {
    return this.lnameControl?.errors?.['required'] && this.lnameControl!.touched;
  }
  get nameControlNumberError() {
    return this.nameControl?.errors?.['pattern'] && this.nameControl!.touched;
  }
  get lnameControlNumberError() {
    return this.lnameControl?.errors?.['pattern'] && this.lnameControl!.touched;
  }
  get personalNumberControlRequiredError() {
    return this.personalNumberControl?.errors?.['required'] && this.personalNumberControl!.touched;
  }
  get personalNumberControlMinimumLenght() {
    return this.personalNumberControl?.errors?.['minlength'] && this.personalNumberControl!.touched;
  }
  get phoneNumberControlRequiredError() {
    return this.phoneNumberControl?.errors?.['required'] && this.phoneNumberControl!.touched;
  }
  get phoneNumberControlPatternError() {
    return this.phoneNumberControl?.errors?.['pattern'] && this.phoneNumberControl!.touched;
  }
  get emailControlRequiredError() {
    return this.emailControl?.errors?.['required'] && this.emailControl!.touched;
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();//TODO change unsub
  }


}
