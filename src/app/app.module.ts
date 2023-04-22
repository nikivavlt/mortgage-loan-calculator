import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MonthlyPaymentCalc } from './components/monthly-payment-calc/monthly-payment-calc.component';
import { MortgageApplicationComponent } from './components/mortgage-application/mortgage-application.component';
import { PersonalInformationComponent } from './components/mortgage-application/mortgageAppComponents/personal-information/personal-information.component';
import { IncomeAndFinancialLiabilitiesComponent } from './components/mortgage-application/mortgageAppComponents/income-and-financial-liabilities/income-and-financial-liabilities.component';
import { LoanInformationComponent } from './components/mortgage-application/mortgageAppComponents/loan-information/loan-information.component';
import { AdditionalInformationComponent } from './components/mortgage-application/mortgageAppComponents/additional-information/additional-information.component';
import { MaxLoanCalculatorComponent } from './components/max-loan-calculator/max-loan-calculator.component';
import { ShowMaxMortgageAmountComponent } from './components/show-max-mortgage-amount/show-max-mortgage-amount.component';
import { ThankYouPopUpComponent } from './components/thank-you-pop-up/thank-you-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SingleApplicationPopUpComponent } from './components/single-application-pop-up/single-application-pop-up.component';
import { MatIconModule } from '@angular/material/icon';
import { ListOfApplicationsComponent } from './components/list-of-applications/list-of-applications.component';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSliderModule,
    MatMenuModule
    NgChartsModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MonthlyPaymentCalc,
    MortgageApplicationComponent,
    PersonalInformationComponent,
    IncomeAndFinancialLiabilitiesComponent,
    LoanInformationComponent,
    AdditionalInformationComponent,
    MaxLoanCalculatorComponent,
    ShowMaxMortgageAmountComponent,
    ThankYouPopUpComponent,
    SingleApplicationPopUpComponent,
    ListOfApplicationsComponent,
    ChatBubbleComponent,
    AuthorizationComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
