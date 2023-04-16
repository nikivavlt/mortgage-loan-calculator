import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FirstTabComponent } from './first-tab/first-tab.component';
import { SecondTabComponent } from './second-tab/second-tab.component';
import { MortgageApplicationComponent } from './components/mortgage-application/mortgage-application.component';
import { PersonalInformationComponent } from './components/mortgage-application/mortgageAppComponents/personal-information/personal-information.component';
import { IncomeAndFinancialLiabilitiesComponent } from './components/mortgage-application/mortgageAppComponents/income-and-financial-liabilities/income-and-financial-liabilities.component';
import { LoanInformationComponent } from './components/mortgage-application/mortgageAppComponents/loan-information/loan-information.component';
import { AdditionalInformationComponent } from './components/mortgage-application/mortgageAppComponents/additional-information/additional-information.component';

@NgModule({
  imports: [
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    FirstTabComponent,
    SecondTabComponent,
    MortgageApplicationComponent,
    PersonalInformationComponent,
    IncomeAndFinancialLiabilitiesComponent,
    LoanInformationComponent,
    AdditionalInformationComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
