import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ApplicantData {
  creationDate: string;
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  personalId: string;
  email: string;
  phoneNumber: string;
  coBorrowerName: string;
  coBorrowerPersonalNumber: string;
  loanAmount: string;
  loanPurpose: string;
  netIncome: string;
  childrenAmount: string;
  education: string;
  employer: string;
  timeEmployed: string;
  contractType: string;
  position: string;
  financialObligations: string;
  termOfLoan: string;
  propertyType: string;
  propertyPrice: string;
  evaluatedPropertyPrice: string;
}


@Component({
  selector: 'app-single-application-pop-up',
  templateUrl: './single-application-pop-up.component.html',
  styleUrls: ['./single-application-pop-up.component.css']
})
export class SingleApplicationPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<SingleApplicationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicantData
  ) { }
}

