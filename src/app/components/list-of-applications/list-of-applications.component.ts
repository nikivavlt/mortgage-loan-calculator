import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { AllApplications } from 'src/app/interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from '../single-application-pop-up/single-application-pop-up.component';

@Component({
  selector: 'app-list-of-applications',
  templateUrl: './list-of-applications.component.html',
  styleUrls: ['./list-of-applications.component.css']
})
export class ListOfApplicationsComponent {
  displayedColumns: string[] = ['date', 'id', 'firstName', 'lastName'];

  data: Observable<MatTableDataSource<AllApplications>> = of()
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private getAllApplicationsService: GetAllApplicationsService,
    private dialog: MatDialog) { }

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
}

