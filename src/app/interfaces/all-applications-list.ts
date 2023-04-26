import { MortgageFormObject } from "./application-form-interfaces";

export interface AllApplications extends MortgageFormObject {
  date: Date;
  id: number;
  coBorrower: boolean;
  coBorrowerName: string;
  status: string;
}

export interface FilterData {
  date: Date;
  status: string;
} 
