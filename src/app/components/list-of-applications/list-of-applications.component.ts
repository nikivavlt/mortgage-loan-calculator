import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { AllApplications } from 'src/app/interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-of-applications',
  templateUrl: './list-of-applications.component.html',
  styleUrls: ['./list-of-applications.component.css']
})
export class ListOfApplicationsComponent {
  displayedColumns: string[] = ['date', 'id', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<AllApplications>;
  private readonly destroy$ = new Subject<void>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialog: any;
  
  constructor(private getAllApplicationsService: GetAllApplicationsService) {}


  ngOnInit() {
    this.getAllApplicationsService.getAllApplications()
      .pipe(
        takeUntil(this.destroy$),
        map((applications: AllApplications[]) => {
          this.dataSource.data = applications;
        }),
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return of(null);
        }
        )
      )
      .subscribe()
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  } 
    
  onCellClick(row: AllApplications) {
    console.log(row)
    // const dialogRef = this.dialog.open(, {
    //   data: row 
    // });
}
}

