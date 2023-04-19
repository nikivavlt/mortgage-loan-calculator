import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';


  constructor(private userService: UserService){
  }

  ngOnInit() {
    this.userService.getBackendMockData().subscribe({
      next: (response) => {
        console.log('Response from server: ', response);
      },
      error: (error) => {
        console.error('Error occured:', error);
      }
    })
  }


  }

