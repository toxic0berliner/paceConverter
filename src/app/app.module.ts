import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PaceCardComponent } from './pace-card/pace-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PaceCardComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
