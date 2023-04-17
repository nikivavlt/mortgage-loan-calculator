import { Injectable } from '@angular/core';
import { ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormValidators{
  static coBorrowerValidator: ValidatorFn = (form) => {
    const coBorrower = form.get('coBorrower')?.value || '';
    if (coBorrower) {
      return Validators.required(form);
    }
    return null;
  }
}
