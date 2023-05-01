import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';
import { AllApplications, FilterData } from 'src/app/interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from '../single-application-pop-up/single-application-pop-up.component';
import { UpdateApplicationStatusService } from 'src/app/services/update-application-status.service';
import { MatSort } from '@angular/material/sort';




@Component({
  selector: 'app-list-of-applications',
  templateUrl: './list-of-applications.component.html',
  styleUrls: ['./list-of-applications.component.css']
})

export class ListOfApplicationsComponent {
  displayedColumns: string[] = ['date', 'id', 'firstName', 'lastName', 'status'];

  data: Observable<MatTableDataSource<AllApplications>> = of()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() selectedDate?: Date;
  @Input() selectedStatus?: string;

  applications: AllApplications[] = [];

  constructor(private getAllApplicationsService: GetAllApplicationsService, private dialog: MatDialog, private updateApplicationsStatusService: UpdateApplicationStatusService) {
}

  ngOnInit() {
    this.getApplicationData(false);
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

  onFilterApplied(filter: FilterData) {
    this.getApplicationData(true,filter)

  }

  getApplicationData(bool: boolean, filter?: FilterData){
    if (!bool){
      this.data = this.getAllApplicationsService.getAllApplications()
      .pipe(
        map((applications: AllApplications[]) => {
          applications.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          });
          const dataSource = new MatTableDataSource(applications)
          dataSource.paginator = this.paginator
          dataSource.sort = this.sort
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
        }),

      )
    }
    else{
      this.data = this.getAllApplicationsService.getAllApplications()
      .pipe(
        map((applications: AllApplications[]) => {
          applications.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });

          const filteredApplications = applications.filter(application => {
            // Filter by date
            if (filter?.date && !this.isDatesEqual(new Date(application.date), new Date(filter.date))) {
              return false;
            }
            // Filter by status
            if (filter?.status && !filter.status.includes(application.status)) {
              return false;
            }

            return true;
          });

          const dataSource = new MatTableDataSource(filteredApplications);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        }),
        tap((dataSource) => {
          setTimeout(() => {
            dataSource.paginator = this.paginator;
          });
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return of();
        })
      );
    }
  }
  isDatesEqual(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  resetForm(){
    this.getApplicationData(false);
  }
}

