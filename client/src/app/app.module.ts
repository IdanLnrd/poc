import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from './api/api.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { DataModule } from './data/data.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ApiModule,
    MatProgressSpinnerModule,
    AutocompleteModule,
    DataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
