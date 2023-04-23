import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllApplications } from '../interfaces/all-applications-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateApplicationStatusService {
  private baseUrl = 'https://backend-spring-app.onrender.com';

  constructor(private http:HttpClient) { }

  updateStatus(applicationId: number, newStatus: string): Observable<string> {
    const url = `${this.baseUrl}/application/${applicationId}/setStatus`;
    const request = {
     newStatus
    };
    return this.http.patch<string>(url, newStatus);
  }
}
