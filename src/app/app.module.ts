import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmexioWidgetModule } from "amexio-ng-extensions"; // Import Amexio library
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmexioDropdown1Component } from './amexio-dropdown1/amexio-dropdown1.component';

@NgModule({
  declarations: [
    AppComponent,
     AmexioDropdown1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmexioWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
