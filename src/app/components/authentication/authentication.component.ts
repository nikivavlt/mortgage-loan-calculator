import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

const formBuilder = new FormBuilder().nonNullable;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {

  errorMessage: boolean = false;

  authorizationForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router) {

    this.authorizationForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  onSubmit(){
    this.userService.sendAuthenticationData(this.authorizationForm.value)
      .subscribe((data) => {
        if (data === null) {
          this.errorMessage = true;
        }
        else {
          this.userService.logIn(data.username);
          this.router.navigate(['/admin/applications']);
        }
      });
  }

}
