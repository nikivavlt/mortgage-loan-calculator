import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllApplications } from '../interfaces/all-applications-list';

@Injectable({
  providedIn: 'root'
})
export class GetAllApplicationsService {

  private baseUrl = 'https://backend-spring-app.onrender.com'

  constructor(private http: HttpClient) { }

  getAllApplications() {
    const url = `${this.baseUrl}/applications`
    return this.http.get<AllApplications[]>(url)
  }

}
