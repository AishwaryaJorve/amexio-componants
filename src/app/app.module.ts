import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AmexioWidgetModule } from "amexio-ng-extensions"; // Import Amexio library
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventBaseComponent } from "./event.base/event.base.component";
import { ValueAccessorBaseComponent } from "./value-accesor/value-accesor.component";
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    EventBaseComponent,
    ValueAccessorBaseComponent,
    DropdownComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AmexioWidgetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
