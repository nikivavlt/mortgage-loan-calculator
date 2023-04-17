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

import { HttpClientModule } from '@angular/common/http';
import { FirstTabComponent } from './first-tab/first-tab.component';
import { ThirdTabComponent } from './third-tab/third-tab.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MonthlyPaymentCalc } from './monthly-payment-calc/monthly-payment-calc.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    FirstTabComponent,
    MonthlyPaymentCalc,
    ThirdTabComponent,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
