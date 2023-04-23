import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthlyPaymentCalcService {

  private backendUrl = 'https://backend-spring-app.onrender.com'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private htttpClient: HttpClient) {}

  sendCalculatorData(data: any){
    return this.htttpClient.post<any>(`${this.backendUrl}/calculator/monthlyPayment`, data, this.httpOptions);
  }
}
