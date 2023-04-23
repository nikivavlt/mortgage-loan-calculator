import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { AllApplications } from 'src/app/interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from '../single-application-pop-up/single-application-pop-up.component';
import { UpdateApplicationStatusService } from 'src/app/services/update-application-status.service';

@Component({
  selector: 'app-list-of-applications',
  templateUrl: './list-of-applications.component.html',
  styleUrls: ['./list-of-applications.component.css']
})
export class ListOfApplicationsComponent {
  displayedColumns: string[] = ['date', 'id', 'firstName', 'lastName', 'status'];

  data: Observable<MatTableDataSource<AllApplications>> = of()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  applications: AllApplications[] = [];

  constructor(private getAllApplicationsService: GetAllApplicationsService, private dialog: MatDialog, private updateApplicationsStatusService: UpdateApplicationStatusService) { }

  ngOnInit() {
    this.data = this.getAllApplicationsService.getAllApplications()
      .pipe(
        map((applications: AllApplications[]) => {
          applications.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          });
          const dataSource = new MatTableDataSource(applications)
          dataSource.paginator = this.paginator
          return dataSource
        }),
        tap((dataSource) => {
          setTimeout(() => {
            dataSource.paginator = this.paginator;
          });
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return of();
        }
        )
      )
  }

  onCellClick(row: AllApplications) {
    this.dialog.open(SingleApplicationPopUpComponent, {
      data: row
    });
  }

  updateStatus(applicationId: number, newStatus: string) {
    this.updateApplicationsStatusService.updateStatus(applicationId, newStatus).subscribe(response => {
      const updatedApplication = this.applications.find(app => app.id === applicationId);
      if (updatedApplication) {
        updatedApplication.status = newStatus;
      }
      this.data = of(new MatTableDataSource(this.applications));
    });
  }
}

