import { Component, ViewChild } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil, tap } from 'rxjs';
import { PersonalInformationComponent } from './mortgageAppComponents/personal-information/personal-information.component';
import { IncomeAndFinancialLiabilitiesComponent } from './mortgageAppComponents/income-and-financial-liabilities/income-and-financial-liabilities.component';
import { LoanInformationComponent } from './mortgageAppComponents/loan-information/loan-information.component';
import { AdditionalInformationComponent } from './mortgageAppComponents/additional-information/additional-information.component';
import { ThankYouPopUpComponent } from 'src/app/components/thank-you-pop-up/thank-you-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { MortgageApplicationService } from 'src/app/services/mortgage-application.service';


@Component({
  selector: 'app-mortgage-application',
  templateUrl: './mortgage-application.component.html',
  styleUrls: ['./mortgage-application.component.css']
})
export class MortgageApplicationComponent {
  isPersonalInfoCompleted = false;
  isIncomeAndFinancialCompleted = false;
  isLoanInfoCompleted = false;
  isAdditionalInfoCompleted = false;

  @ViewChild(PersonalInformationComponent) personalInfoComponent!: PersonalInformationComponent;
  @ViewChild(IncomeAndFinancialLiabilitiesComponent) incomeAndFinancialComponent!: IncomeAndFinancialLiabilitiesComponent;
  @ViewChild(LoanInformationComponent) loanInfoComponent!: LoanInformationComponent;
  @ViewChild(AdditionalInformationComponent) additionalInfoComponent!: AdditionalInformationComponent;

  stepperOrientation: StepperOrientation = 'horizontal';
  private readonly destroy$ = new Subject<void>();
  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
              private mortgageApplicationService: MortgageApplicationService) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if (result.matches) {
        this.stepperOrientation = 'vertical';
      } else {
        this.stepperOrientation = 'horizontal';
      }
    });
  }
  submitForm() {
    if(!this.isPersonalInfoCompleted||!this.isIncomeAndFinancialCompleted||!this.isLoanInfoCompleted||!this.isAdditionalInfoCompleted){
      console.log("Not all form fields are filled, please check if all fields are filled correctly");
      return
    }
    console.log("sent");

    const data = {
      ...this.personalInfoComponent.personalInformationForm.value,
      ...this.incomeAndFinancialComponent.incomeAndFinancialLiabilitiesForm.value,
      ...this.loanInfoComponent.loanInformationForm.value,
      ...this.additionalInfoComponent.additionalInformationForm.value
    };

    this.mortgageApplicationService.saveForm(data)
    .pipe(
      tap(response => {
        console.log(response);
      }),
      takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.openThankYouDialog();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onPersonalInformationFormChanged(bool: boolean) {
    this.isPersonalInfoCompleted = bool;
  }
  onIncomeAndFinancialChanged(bool: boolean) {
    this.isIncomeAndFinancialCompleted = bool;
  }
  onLoanInfoChanged(bool: boolean) {
    this.isLoanInfoCompleted = bool;
  }
  onAdditionalInfoChanged(bool: boolean) {
    this.isAdditionalInfoCompleted = bool;
  }
  openThankYouDialog() {
    this.dialog.open(ThankYouPopUpComponent);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


