import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllApplications } from '../interfaces/all-applications-list';
import { of } from 'rxjs';

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

  searchApplications(term: string){

    if (term.trim() === '') {
      return of([]);
    }

    if(Number(term.trim())) {
      return this.http.get<AllApplications[]>( `https://backend-spring-app.onrender.com/applications?id=${term}`)
    }

    else {
      return this.http.get<AllApplications[]>(`https://backend-spring-app.onrender.com/applications?term=${term}`)
    }
  }

}
