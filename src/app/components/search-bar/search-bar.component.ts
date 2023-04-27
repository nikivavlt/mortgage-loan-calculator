import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import { AllApplications } from '../../interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from '../single-application-pop-up/single-application-pop-up.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  applications$!: Observable<AllApplications[]>;
  private searchTerms = new Subject<string>();

  constructor(private getAllApplications: GetAllApplicationsService,
    private dialog: MatDialog) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  onLinkClick(row: AllApplications) {
    this.dialog.open(SingleApplicationPopUpComponent, {
      data: row
    });
  }

  ngOnInit(): void {

    this.applications$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.getAllApplications.searchApplications(term)),
    );
  }
}
