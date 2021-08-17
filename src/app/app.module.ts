import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AmexioWidgetModule } from "amexio-ng-extensions"; // Import Amexio library
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonDataService } from "./amexio-dropdown-new/commondata.service";
import { DisplayFieldService } from "./amexio-dropdown-new/display-field.service";
import { AmexioDropdownNewComponent } from "./amexio-dropdown-new/amexio-dropdown-new.component";
import { ChartTitleComponent } from "../app/amexio-google-chart/chart.title.component";
import {AreaChartComponent} from "../app/amexio-google-chart/area.chart.component";
import  {ChartAreaComponent} from "../app/amexio-google-chart/chart.area.component";
import { ChartLoaderService } from "./amexio-google-chart/chart.loader.service";
import { ComboChartComponent } from "../app/amexio-google-chart/combo.chart.component";
import { HorizontalAxisComponent } from "./amexio-google-chart/chart.horizontalaxis.component";
import {VerticalAxisComponent} from "./amexio-google-chart/chart.verticalaxis.component";
import {ChartLegendComponent} from "../app/amexio-google-chart/chart.legend.componet";
import {VerticalZAxisComponent} from "../app/amexio-google-chart/chart.verticalZaxis.component";

@NgModule({
  declarations: [
    AppComponent,
    //component for dropdown
    AmexioDropdownNewComponent,

    //component for google chart
    AreaChartComponent,
    ChartLegendComponent,
    ChartTitleComponent,
    ChartAreaComponent,
    ComboChartComponent,
    HorizontalAxisComponent,
    VerticalAxisComponent,
    VerticalZAxisComponent

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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
