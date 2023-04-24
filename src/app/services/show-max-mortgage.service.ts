import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowMaxMortgageService {
  private baseUrl = 'https://backend-spring-app.onrender.com';

  constructor(private http: HttpClient) { }

  calculateMaxMortgageAmount(isSingleApplicant: boolean, netIncome: number, familyMember: number, monthlyObligationAmount: number): Observable<number> {
    const url = `${this.baseUrl}/calculator/maxLoan`;
    const request = {
      isSingleApplicant,
      netIncome,
      familyMember,
      monthlyObligationAmount
    };
    return this.http.post<number>(url, request);
  }


}
