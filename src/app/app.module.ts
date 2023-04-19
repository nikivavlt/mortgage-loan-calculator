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
import { SecondTabComponent } from './second-tab/second-tab.component';
import { ThirdTabComponent } from './third-tab/third-tab.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    FirstTabComponent,
    SecondTabComponent,
    ThirdTabComponent,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
