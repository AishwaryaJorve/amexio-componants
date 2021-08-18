/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 *
 *
 */

/**
 * @author AishwaryaJorve, ShubhangiDongre
 */

/*
Component Name : Amexio combo chart
Component Selector : <amexio-chart-combo>
Component Description : A chart that lets you render each series as a different marker type from the following list: line,bars
*/
import { AfterContentInit, Component, ContentChildren, ElementRef, Inject, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { ChartAreaComponent } from './chart.area.component';
import { ChartLegendComponent } from './chart.legend.componet';
import { ChartTitleComponent } from './chart.title.component';
import { HorizontalAxisComponent } from './chart.horizontalaxis.component';
import { VerticalAxisComponent } from './chart.verticalaxis.component';
import {VerticalZAxisComponent} from "./chart.verticalZaxis.component";
import { ChartLoaderService } from './chart.loader.service';

declare var google: any;
@Component({
	selector: 'amexio-chart-combo', template: `
    <div *ngIf="showChart" #combochart
         [style.width]="width"
         [style.height]="height" (window:resize)="onResize($event)">
      <div *ngIf="!hasLoaded" class="lmask">
      </div>
    </div>
  `, styles: [`.lmask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #000;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
    opacity: 0.4;
  }

  .lmask.fixed {
    position: fixed;
  }

  .lmask:before {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 35px #2187e7;
    width: 50px;
    height: 50px;
    -moz-animation: spinPulse 1s infinite ease-in-out;
    -webkit-animation: spinPulse 1s infinite linear;
    margin: -25px 0 0 -25px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .lmask:after {
    content: '';
    background-color: transparent;
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 50px;
    box-shadow: 0 0 15px #2187e7;
    width: 30px;
    height: 30px;
    -moz-animation: spinoffPulse 1s infinite linear;
    -webkit-animation: spinoffPulse 1s infinite linear;
    margin: -15px 0 0 -15px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  @-moz-keyframes spinPulse {
    0% {
      -moz-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -moz-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -moz-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-moz-keyframes spinoffPulse {
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spinPulse {
    0% {
      -webkit-transform: rotate(160deg);
      opacity: 0;
      box-shadow: 0 0 1px #2187e7;
    }
    50% {
      -webkit-transform: rotate(145deg);
      opacity: 1;
    }
    100% {
      -webkit-transform: rotate(-320deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes spinoffPulse {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  ` ],
})

export class ComboChartComponent implements AfterContentInit, OnInit {

	private options: any;
	private comboData: any;
	private chart: any;

	id: any;
	/*
  Properties
  name : width
  datatype : string
  version : 4.0 onwards
  default : none
  description : Width of chart
  */
	@Input() width: string;
	/*
  Properties
  name : height
  datatype : string
  version : 4.0 onwards
  default : none
  description : height of chart
  */
	@Input() height: string;

	showChart: boolean;
	_data: any;
	_title: string;

	get data(): any {
		return this._data;
	}

	/*
	Properties
	name : data
	datatype : any
	version : 4.0 onwards
	default : none
	description : For the use of local data
	*/
	@Input('data')
	set data(data: any) {
		if (data) {
			this._data = data;
			this.showChart = true;
		} else {
			this.showChart = false;
		}
	}

	// @Input('title')
	// set title(title) {
	// 	if (title) {
	// 		this._title = title
	// 		this.showChart = true;
	// 	} else {
	// 		this.showChart = false;
	// 	}
	// }

	/*
	Properties
	name : background-color
	datatype : string
	version : 4.0 onwards
	default : none
	description : sets background color to chart
	*/
	@Input('background-color') backgroundcolor: string;

	hasLoaded: boolean;

	@ContentChildren(ChartLegendComponent) chartLegendComp: QueryList<ChartLegendComponent>;

	@ContentChildren(ChartTitleComponent) chartTitleComp: QueryList<ChartTitleComponent>;

	@ContentChildren(ChartAreaComponent) chartAreaComp: QueryList<ChartAreaComponent>;

	@ContentChildren(HorizontalAxisComponent) horizontalComp: QueryList<HorizontalAxisComponent>;

	
	horizontalArray: HorizontalAxisComponent[];

	horizontalComponent: HorizontalAxisComponent;

	@ContentChildren(VerticalAxisComponent) verticalComp: QueryList<VerticalAxisComponent>;
	@ContentChildren(VerticalZAxisComponent) verticalZaxisComp: QueryList<VerticalZAxisComponent>;

	verticalArray: VerticalAxisComponent[];

	verticalComponent: VerticalAxisComponent;
	verticalZaxisArray : VerticalZAxisComponent[];
	verticalZaxisComponent :  VerticalZAxisComponent;

	chartAreaArray: ChartAreaComponent[];

	chartAreaComponent: ChartAreaComponent;

	chartLegendArray: ChartLegendComponent[];

	chartLengendComponent: ChartLegendComponent;

	chartTitleArray: ChartTitleComponent[];

	chartTitleComponent: ChartTitleComponent;

	@ViewChild('combochart') private combochart: ElementRef;

	constructor(@Inject(ChartLoaderService) private loader: ChartLoaderService) {
		this.width = '100%';
	}

	drawChart() {
		if (this.showChart) {
			this.comboData = google.visualization.arrayToDataTable(this._data);
			this.options = {
				title: this.chartTitleComponent ? this.chartTitleComponent.title : null,
				titleTextStyle: this.chartTitleComponent ? this.chartTitleStyle() : null,
				backgroundcolor: this.backgroundcolor,
				legend: this.chartLengendComponent ? this.chartLegendStyle() : 'none',
				chartArea: this.chartAreaComponent ? this.chartBackground() : null,
				// Gives each series an axis that matches the vAxes number below.
				series: {
					0: {
						targetAxisIndex: 0,
						type: 'bars',
						position: "right"
					},
					1: {
						targetAxisIndex: 1,
						type: 'line',
						position: "left"
					},

				},
				vAxes: {
					// Adds titles to each axis.
					0: {
						title: this.verticalComponent ? this.chartVerticalStyle().title : null,
					},
					1: {
						title: this.verticalZaxisComponent ? this.chartVerticalzaxisStyle().title : null,
					}
				},

				vZAxis: this.verticalZaxisComponent ? this.chartVerticalzaxisStyle() : null,
				vAxis: this.verticalComponent ? this.chartVerticalStyle() : null,
				hAxis: this.horizontalComponent ? this.chartHorizontalStyle() : null,
				seriesType: 'bars',
				// series: { 1: { type: 'line' } },
			};
			console.log(this.verticalComponent ? this.chartVerticalStyle() : null,);
			console.log(this.chartLengendComponent ? this.chartLegendStyle() : 'none');
			console.log(this.verticalZaxisComponent ? this.chartVerticalzaxisStyle() : null);



			if (this.comboData) {
				this.chart = new google.visualization.ComboChart(this.combochart.nativeElement);
				this.hasLoaded = true;
				this.chart.draw(this.comboData, this.options);
				google.visualization.events.addListener(this.chart, 'click', this.click);
			}

		}

	}
	click(e: any) {

	}
	chartTitleStyle() {
		return {
			color: this.chartTitleComponent.color ? this.chartTitleComponent.color : null,
			fontName: this.chartTitleComponent.fontname ? this.chartTitleComponent.fontname : null,
			fontsize: this.chartTitleComponent.fontsize ? this.chartTitleComponent.fontsize : null,
			bold: this.chartTitleComponent.bold ? this.chartTitleComponent.bold : null,
			italic: this.chartTitleComponent.italic ? this.chartTitleComponent.italic : null,
		};
	}
	chartLegendStyle() {
		return {
			position: this.chartLengendComponent.position ? this.chartLengendComponent.position : null,
			// this work only in chart position is top
			maxLines: this.chartLengendComponent.maxlines ? this.chartLengendComponent.maxlines : null, textStyle: {
				color: this.chartLengendComponent.color ? this.chartLengendComponent.color : null,
				fontsize: this.chartLengendComponent.fontsize ? this.chartLengendComponent.fontsize : null,
				fontName: this.chartLengendComponent.fontname ? this.chartLengendComponent.fontname : null,
				bold: this.chartLengendComponent.bold ? this.chartLengendComponent.bold : null,
				alignment: this.chartLengendComponent.alignment ? this.chartLengendComponent.alignment : null,
			},
		};
	}

	chartVerticalStyle() {
		return {
			title: this.verticalComponent.title ? this.verticalComponent.title : null,
			titleTextStyle: { color: this.verticalComponent.titlecolor ? this.verticalComponent.titlecolor : null },

		};
	}

	chartVerticalzaxisStyle() {
		return {
			position: this.verticalZaxisComponent.position ? this.verticalZaxisComponent.position : null,
			title: this.verticalZaxisComponent.title ? this.verticalZaxisComponent.title : null,
			titleTextStyle: { color: this.verticalZaxisComponent.titlecolor ? this.verticalZaxisComponent.titlecolor : null },

		};
	}

	chartBackground() {
		return {
			backgroundcolor: this.chartAreaComponent.chartbackgroundcolor ? this.chartAreaComponent.chartbackgroundcolor : null,
			left: this.chartAreaComponent.leftposition ? this.chartAreaComponent.leftposition : null,
			top: this.chartAreaComponent.topposition ? this.chartAreaComponent.topposition : null,
			height: this.chartAreaComponent.chartheight ? this.chartAreaComponent.chartheight : null,
			width: this.chartAreaComponent.chartwidth ? this.chartAreaComponent.chartwidth : null,
		};
	}

	chartHorizontalStyle() {
		return {
			title: this.horizontalComponent.title ? this.horizontalComponent.title : null,
			titleTextStyle: { color: this.horizontalComponent.titlecolor ? this.horizontalComponent.titlecolor : null },

		};

	}

	// after content init for inner directive is run
	ngAfterContentInit(): void {
		this.chartLegendArray = this.chartLegendComp.toArray();
		this.chartTitleArray = this.chartTitleComp.toArray();
		this.chartAreaArray = this.chartAreaComp.toArray();
		this.horizontalArray = this.horizontalComp.toArray();
		this.verticalArray = this.verticalComp.toArray();
		this.verticalZaxisArray = this.verticalZaxisComp.toArray();
		// take first component
		if (this.chartLegendArray.length === 1) {
			this.chartLengendComponent = this.chartLegendArray.pop();
		}
		if (this.chartTitleArray.length === 1) {
			this.chartTitleComponent = this.chartTitleArray.pop();
		}
		if (this.chartAreaArray.length === 1) {
			this.chartAreaComponent = this.chartAreaArray.pop();
		}
		if (this.horizontalArray.length === 1) {
			this.horizontalComponent = this.horizontalArray.pop();
		}
		if (this.verticalArray.length === 1) {
			this.verticalComponent = this.verticalArray.pop();
		}
		if(this.verticalZaxisArray.length === 1){
			this.verticalZaxisComponent = this.verticalZaxisArray.pop();
		}
	}

	ngOnInit(): void {
		this.hasLoaded = false;
		this.loader.loadCharts('ComboChart').subscribe((value) => console.log(), (errror) => console.error(errror), () => {
			this.drawChart();
		});
	}

	onResize(event: any) {
		this.drawChart();
	}
}
