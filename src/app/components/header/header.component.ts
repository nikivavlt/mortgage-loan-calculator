import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectToHomepageService } from 'src/app/services/redirect-to-homepage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userSerivce: UserService,
    private router: Router, private redirectToHomepageService: RedirectToHomepageService) {
  }

  resetTab() {
    this.redirectToHomepageService.selectedTabIndexSource.next(0);
  }

  isUser() {
    return this.userSerivce.isUserLoggedIn() ? true : false;
  }

  logOut() {
    this.userSerivce.logOut();
    this.router.navigate(['/']);
  }
}
