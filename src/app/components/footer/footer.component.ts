import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private userSerivce: UserService, private router: Router){}
  
  isUser() {
    return this.userSerivce.isUserLoggedIn() ? true : false;
  }

  logIn() {
    this.router.navigate(['/top-secret']);
  }
}
