import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = 'https://backend-spring-app.onrender.com'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private htttpClient: HttpClient) {}

  sendCalculatorData(data: any){
    return this.htttpClient.post<any>(`${this.backendUrl}/calculator/monthlyPayment`, data, this.httpOptions);
  }

  sendAuthorizationData(data: any) {
    return this.htttpClient.post<any>(`${this.backendUrl}/user/login`, data, this.httpOptions);
  }
}
