import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

const negativeValidator: ValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
  const netIncome = control.value;
  return of(netIncome && netIncome < 0 ? { negativeNetIncome: true } : null).pipe(
    delay(500)
  );
}

const applicantNetIncomeCheck: ValidatorFn = (control) => {
  const dependents = control.get('dependent')?.value;
  const applicants = control.get('borrower')?.value;
  const netIncome = control.value.netIncome;

  if (applicants==='personal' && (!dependents || dependents === 0) && netIncome < 600) {
    return { applicantNetIncomeCheck: true }
  } else if(applicants==='co-borrower' && netIncome < 1000){
    return {applicantWithCoBorrowerError: true}
  }
  return null
}

const applicantWithDependentsCheck: ValidatorFn = (control) => {
  const netIncome = control.get('netIncome')?.value;
  const dependents = control.get('dependent')?.value;
  const applicants = control.get('borrower')?.value;

  if (applicants==='personal' && dependents >= 2 && netIncome < 1000) {
    return { applicantWithMoreThanTwoDependentsError: true };
  } else if (applicants==='personal' && dependents === 1 && netIncome < 650) {
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
