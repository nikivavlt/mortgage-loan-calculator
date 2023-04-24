import { Component,EventEmitter,Output,ViewChild } from '@angular/core';
import { BehaviorSubject,Subject, takeUntil} from 'rxjs';
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

  //TODO use service
  @ViewChild(PersonalInformationComponent) personalInfoComponent!: PersonalInformationComponent;
  @ViewChild(IncomeAndFinancialLiabilitiesComponent) incomeAndFinancialComponent!: IncomeAndFinancialLiabilitiesComponent;
  @ViewChild(LoanInformationComponent) loanInfoComponent!: LoanInformationComponent;
  @ViewChild(AdditionalInformationComponent) additionalInfoComponent!: AdditionalInformationComponent;

  @Output() tabChanged = new EventEmitter<number>();

  stepperIndex = new BehaviorSubject<number>(-1);
  private readonly destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private mortgageApplicationService: MortgageApplicationService) {}

  submitForm() {
    if(!this.isPersonalInfoCompleted||!this.isIncomeAndFinancialCompleted||!this.isLoanInfoCompleted||!this.isAdditionalInfoCompleted){
      console.log("Not all form fields are filled, please check if all fields are filled correctly");
      return
    }

    const data = {
      ...this.personalInfoComponent.personalInformationForm.value,
      ...this.incomeAndFinancialComponent.incomeAndFinancialLiabilitiesForm.value,
      ...this.loanInfoComponent.loanInformationForm.value,
      ...this.additionalInfoComponent.additionalInformationForm.value
    };

    this.mortgageApplicationService.saveForm(data)
    .pipe(takeUntil(this.destroy$))
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
    const dialogRef = this.dialog.open(ThankYouPopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.resetAndCloseForm();
    });
  }
  resetAndCloseForm(){
    this.personalInfoComponent.personalInformationForm.reset();
    this.incomeAndFinancialComponent.incomeAndFinancialLiabilitiesForm.reset();
    this.loanInfoComponent.loanInformationForm.reset();
    this.additionalInfoComponent.additionalInformationForm.reset();
    this.stepperIndex.next(0);
    this.selectTab(0);
  }

  selectTab(tabIndex: number) {
    this.tabChanged.emit(tabIndex);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


