import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htttpClient: HttpClient) {}

  getBackendMockData(){
    return this.htttpClient.get<Observable<String>>("https://backend-spring-app.onrender.com");
  }

}
