import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllApplications } from 'src/app/interfaces/all-applications-list';
import { UpdateApplicationStatusService } from 'src/app/services/update-application-status.service';

@Component({
  selector: 'app-single-application-pop-up',
  templateUrl: './single-application-pop-up.component.html',
  styleUrls: ['./single-application-pop-up.component.css']
})
export class SingleApplicationPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<SingleApplicationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AllApplications,
    private updateApplicationStatusService: UpdateApplicationStatusService
  ) { }

  markInProgress(){
    this.updateStatus("In progress");
  }

  markAsDone(){
    this.updateStatus("Approved");
  }

  reject(){
    this.updateStatus("Rejected");
  }

  private updateStatus(newStatus: string) {
    this.updateApplicationStatusService.updateStatus(this.data.id, newStatus).subscribe(response => {
      this.data.status = newStatus;
    });
  }
}