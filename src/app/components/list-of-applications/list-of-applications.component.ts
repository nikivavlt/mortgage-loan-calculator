import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AllApplications } from 'src/app/interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';

@Component({
  selector: 'app-list-of-applications',
  templateUrl: './list-of-applications.component.html',
  styleUrls: ['./list-of-applications.component.css']
})
export class ListOfApplicationsComponent {
  displayedColumns: string[] = ['date', 'id', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<AllApplications>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private getAllApplicationsService: GetAllApplicationsService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchAllApplications();
  }
  fetchAllApplications() {
    this.getAllApplicationsService.getAllApplications().subscribe(
      (applications: AllApplications[]) => {
        this.dataSource.data = applications;
      },
      (error: any) => {
        console.error('Error fetching applications:', error);
      }
    );
  }

  onCellClick(row: AllApplications) {
    console.log('Row clicked:', row);
   
  
}
}

