import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AmexioWidgetModule } from "amexio-ng-extensions"; // Import Amexio library
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { CommonDataService } from "./service/commondata.service";
import { DisplayFieldService } from "./service/display-field.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import {CommonDataService} from "./service/commondata.service";
// import {DisplayFieldService} from "./service/display-field.service";
@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AmexioWidgetModule, HttpClientModule, FormsModule,
    ReactiveFormsModule],
  providers: [CommonDataService, DisplayFieldService],
  bootstrap: [AppComponent],
})
export class AppModule {}
