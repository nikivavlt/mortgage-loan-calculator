import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MortgageFormObject } from '../interfaces/application-form-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MortgageApplicationService {

  private baseUrl = 'https://backend-spring-app.onrender.com';

  constructor(private http: HttpClient) { }

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
    crossSiteAccessControl: false // set this to false
  };

  saveForm(mortgageForm: MortgageFormObject): Observable<MortgageFormObject> {
    const url = `${this.baseUrl}/application/submit`;
    const request = mortgageForm;
    return this.http.post<MortgageFormObject>(url, request, this.options);
  }
}
