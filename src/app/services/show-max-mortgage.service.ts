import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface MaxMortgageResponse {
  maxLoan: number;
  maxMonthlyLoanPayment: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShowMaxMortgageService {
  private baseUrl = 'https://backend-spring-app.onrender.com';

  constructor(private http: HttpClient) { }

  calculateMaxMortgageAmount(isSingleApplicant: boolean, netIncome: number, familyMembers: number, monthlyObligationAmount: number): Observable<MaxMortgageResponse> {
    const url = `${this.baseUrl}/calculator/maxLoan`;
    const request = {
      isSingleApplicant,
      netIncome,
      familyMembers,
      monthlyObligationAmount
    };
    return this.http.post<MaxMortgageResponse>(url, request);
  }


}
