import { Component,EventEmitter, Output } from '@angular/core';
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
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/^\+370\d{8}$/)]),
      personalNumber: new FormControl('',[Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });

    this.serviceSubscription = this.personalInformationForm.statusChanges.subscribe(() => {
      if (this.personalInformationForm.valid) {
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
