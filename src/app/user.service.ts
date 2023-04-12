import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private htttpClient: HttpClient) {}

  getBackendData(){
    return this.htttpClient.get<String>("http://localhost:8080/");
  }

}
