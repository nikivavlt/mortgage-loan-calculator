import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RedirectToHomepageService } from 'src/app/services/redirect-to-homepage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  private readonly destroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver, private redirectToHomepageService: RedirectToHomepageService ) {
  }

  selectedTabIndex$ = this.redirectToHomepageService.selectedTabIndexSource;

  selectedTabIndex = 0;
  isSmallScreen = false;

  onTabChanged(event: MatTabChangeEvent) {
    this.redirectToHomepageService.selectedTabIndexSource.next(event.index);
  }


  selectTab(index: number) {
    this.redirectToHomepageService.selectedTabIndexSource.next(index);
  }


  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
