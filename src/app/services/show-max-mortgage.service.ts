import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowMaxMortgageService {
  private baseUrl = 'https://localhost:8080';

  constructor(private http: HttpClient) { }

  calculateMaxMortgageAmount(isJustMe: boolean, netIncome: number, familyMembers: number, monthlyObligation: number): Observable<number> {
    const url = `${this.baseUrl}/calculate/first_form`;
    const request = {
      isJustMe,
      netIncome,
      familyMembers,
      monthlyObligation
    };
    return this.http.post<number>(url, request);
  }
}
