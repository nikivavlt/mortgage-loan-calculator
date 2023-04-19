export interface DropDownItem  {
  value: string;
  viewValue: string;
}

export interface MortgageFormObject{
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  personalNumber: string,
  netIncome: number,
  childrenAmount: number,
  education: string,
  employer: string,
  position: string,
  timeEmployed: string,
  contractType: string,
  financialObligations: boolean,
  monthlyObligations: number,
  loanAmount: number,
  loanPurpose: string,
  termOfLoan: string,
  propertyType: string,
  propertyPrice: number,
  evaluatedPropertyPrice: number,
  coBorrower: true,
  coBorrowerName: string,
  coBorrowerLastName: string,
  coBorrowerPersonalNumber: string,
  certification: boolean
}
