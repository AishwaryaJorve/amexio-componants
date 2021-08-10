import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AmexioWidgetModule } from "amexio-ng-extensions"; // Import Amexio library
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonDataService } from "./amexio-dropdown-new/commondata.service";
import { DisplayFieldService } from "./amexio-dropdown-new/display-field.service";
import { AmexioDropdownNewComponent } from "./amexio-dropdown-new/amexio-dropdown-new.component";
import {ChartTitleComponent} from "../app/amexio-google-chart/chart.title.component";
import {chartLengendComponent} from "../app/amexio-google-chart/chart.legend.componet";
import {AreaChartComponent} from "../app/amexio-google-chart/area.chart.component";
import  {ChartAreaComponent} from "../app/amexio-google-chart/chart.area.component";
import { ChartLoaderService } from "./amexio-google-chart/chart.loader.service";

@NgModule({
  declarations: [
    AppComponent,
    //component for dropdown
    AmexioDropdownNewComponent,

    //component for google chart
    AreaChartComponent,
    chartLengendComponent,
    ChartTitleComponent,
    ChartAreaComponent
   


  ],
  imports: [BrowserModule, AppRoutingModule, AmexioWidgetModule, HttpClientModule, FormsModule,
    ReactiveFormsModule],
  providers: [
    //services for dropdown
    CommonDataService, 
    DisplayFieldService,

    //service for google chart
    ChartLoaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
