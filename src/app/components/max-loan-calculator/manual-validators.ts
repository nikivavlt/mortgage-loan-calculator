import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

const negativeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const netIncome = control.value;
  return netIncome && netIncome < 0 ? { negativeNetIncome: true } : null;
}

const applicantNetIncomeCheck: ValidatorFn = (control) => {
  const dependents = Number(control.get('dependent')?.value);
  const applicants = control.get('borrower')?.value;
  const netIncome = control.get('netIncome')?.value
  const obligations = control.get('obligations')?.value;

  if (applicants === 'personal' && (!dependents || dependents === 0) && (netIncome - obligations) < 600) {
    control.get('netIncome')?.setErrors({ applicantNetIncomeCheck: true })
    return { applicantNetIncomeCheck: true }
  } else if (applicants === 'co-borrower' && (netIncome - obligations) < 1000) {
    control.get('netIncome')?.setErrors({ applicantWithCoBorrowerError: true })
    return { applicantWithCoBorrowerError: true }
  }
  return null
}

const applicantWithDependentsCheck: ValidatorFn = (control) => {
  const netIncome = control.get('netIncome')?.value;
  const dependents = Number(control.get('dependent')?.value);
  const applicants = control.get('borrower')?.value;
  const obligations = control.get('obligations')?.value;

  if (applicants === 'personal' && dependents >= 2 && (netIncome - obligations) < 1000) {
    control.get('dependent')?.setErrors({ applicantWithMoreThanTwoDependentsError: true })
    return { applicantWithMoreThanTwoDependentsError: true };
  } else if (applicants === 'personal' && dependents === 1 && (netIncome - obligations) < 650) {
    control.get('dependent')?.setErrors({ applicantWithOneDependentError: true })
    return { applicantWithOneDependentError: true };
  } else {
    return null
  }
}

export {
  negativeValidator,
  applicantNetIncomeCheck,
  applicantWithDependentsCheck
}
