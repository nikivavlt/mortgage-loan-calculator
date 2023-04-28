import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

import { AllApplications } from '../../interfaces/all-applications-list';
import { GetAllApplicationsService } from 'src/app/services/get-all-applications.service';
import { MatDialog } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from '../single-application-pop-up/single-application-pop-up.component';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @ViewChild('searchBox') searchInput?: ElementRef;
  applications$!: Observable<AllApplications[]>;
  private searchTerms = new Subject<string>();
  searchForm: FormGroup;

  constructor(private getAllApplications: GetAllApplicationsService,
    private dialog: MatDialog, private fb: FormBuilder) {
      this.searchForm = this.fb.group({
        searchInput: new FormControl(''),
      });
    }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  onLinkClick(row: MatAutocompleteSelectedEvent) {
    this.dialog.open(SingleApplicationPopUpComponent, {
      data: row.option.value
    });

    this.searchForm.get('searchInput')?.reset();
  }
  ngOnInit(): void {
    this.applications$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.getAllApplications.searchApplications(term))
    );
  }
}
