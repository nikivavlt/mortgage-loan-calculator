import { ValidatorFn } from "@angular/forms";

const mortgageAmountValidator: ValidatorFn = (input) => {
  const homePrice = input.get('homePrice')?.value;
  const mortgageAmount = input.get('mortgageAmount')?.value;
  if (homePrice && mortgageAmount && homePrice < mortgageAmount) {
    input.get('mortgageAmount')?.setErrors({ mortgageAmountValidator: true });
    return { mortgageAmountValidator: true };
  } else {
    input.get('mortgageAmount')?.setErrors(null);

    return null;
  }
};

// return (input.get('homePrice')?.value < input.get('mortgageAmount')?.value) ? { mortgageAmountValidator: true } : null;
// }

const downPaymentValidator: ValidatorFn = (input) => {
  const homePrice = input.get('homePrice')?.value;
  const downPayment = input.get('downPayment')?.value;
  const minValue = homePrice * 0.15 > downPayment;
  const maxValue = homePrice * 0.99 < downPayment;

  if (minValue) {
    input.get('downPayment')?.setErrors({ downPaymentMinValidator: true });
    return { downPaymentMinValidator: true };
  } else if (maxValue) {
    input.get('downPayment')?.setErrors({ downPaymentMaxValidator: true });
    return { downPaymentMaxValidator: true };
  } else {
    input.get('downPayment')?.setErrors(null);
    return null;
  }
};

export {
  mortgageAmountValidator,
  downPaymentValidator,
};


// const minValue = input.get('homePrice')?.value * 0.15 > input.get('downPayment')?.value;
// const maxValue = input.get('homePrice')?.value * 0.99 < input.get('downPayment')?.value;

//   return (minValue || maxValue) ? { downPaymentValidator: true } : null;
// }
