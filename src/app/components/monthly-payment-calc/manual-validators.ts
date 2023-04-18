import { ValidatorFn } from "@angular/forms";

const minimumHomePrice: ValidatorFn = (input) => input.value < 5000 ? { minimumHomePrice: true } : null;

const downPaymentValidator: ValidatorFn = (input) => {
  const minValue = input.get('homePrice')?.value  *  0.15 > input.get('downPayment')?.value;
  const maxValue = input.get('homePrice')?.value  *  0.99 < input.get('downPayment')?.value;

  return (minValue || maxValue) ? { downPaymentValidator: true } : null;
}

const minimumMortgageTerm: ValidatorFn = (input) => input.value < 1 ? { minimumMortgageTerm: true } : null;

const maximumMortgageTerm: ValidatorFn = (input) => input.value > 30 ? { maximumMortgageTerm: true } : null;


export {
  minimumHomePrice,
  downPaymentValidator,
  minimumMortgageTerm,
  maximumMortgageTerm,
};
