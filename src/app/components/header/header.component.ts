import { ViewportScroller } from '@angular/common';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userSerivce: UserService,
    private router: Router) {}

  isUser() {
    return this.userSerivce.isUserLoggedIn() ? true : false;
  }

  logIn() {
    this.router.navigate(['/top-secret']);
  }

  logOut() {
    this.userSerivce.logOut();
    this.router.navigate(['/']);
  }
}
