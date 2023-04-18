import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-thank-you-pop-up',
  templateUrl: './thank-you-pop-up.component.html',
  styleUrls: ['./thank-you-pop-up.component.css']
})
export class ThankYouPopUpComponent {
  constructor(public dialogRef: MatDialogRef<ThankYouPopUpComponent>, @Inject(Router) private router: Router) { }

  closeDialogAndNavigate() {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}

