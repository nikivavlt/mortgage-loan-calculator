import { ValidatorFn } from "@angular/forms";

const mortgageAmountValidator: ValidatorFn = (input) => {
  return (input.get('homePrice')?.value < input.get('mortgageAmount')?.value) ? { mortgageAmountValidator: true } : null;
}


const downPaymentValidator: ValidatorFn = (input) => {
  const minValue = input.get('homePrice')?.value  *  0.15 > input.get('downPayment')?.value;
  const maxValue = input.get('homePrice')?.value  *  0.99 < input.get('downPayment')?.value;

  return (minValue || maxValue) ? { downPaymentValidator: true } : null;
}

export {
  mortgageAmountValidator,
  downPaymentValidator,
};
