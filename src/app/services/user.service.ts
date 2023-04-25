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

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  constructor(private htttpClient: HttpClient) { }

  sendAuthenticationData(data: any) {
    return this.htttpClient.post<any>(`${this.backendUrl}/users/login`, data, this.httpOptions);
  }

  logIn(username: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logOut() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);

    return (user === null) ? false : true;
  }
}
