import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'amexio-Components';
	reqType = ""
	str = [];
	requestTypeList = [
		{
			"key": "SIEBEL_101",
			"value": "SR Search"
		},
		{
			"key": "SIEBEL_102",
			"value": "Order Number Search"
		},
		{
			"key": "SIEBEL_103",
			"value": "Owner Search"
		},
		{
			"key": "SIEBEL_104",
			"value": "Contact Search"
		},
		{
			"key": "SIEBEL_105",
			"value": "PSAN"
		},
		{
			"key": "SIEBEL_106",
			"value": "SR Creation"
		},
		{
			"key": "SIEBEL_107",
			"value": "Email Search"
		},
		{
			"key": "SIEBEL_108",
			"value": "SR Requests"
		},
		{
			"key": "SIEBEL_109",
			"value": "Create Note"
		},
		{
			"key": "SIEBEL_110",
			"value": "Note Search"
		},
		{
			"key": "SIEBEL_111",
			"value": "PSAN,E"
		}

	]


	comboChartData: any;

	constructor() {
		this.comboChartData = [
			['Month', 'Papua New Guinea', 'Ecuador', 'Average'],
			['2004/05', 450, 3000, 614.6],
			['2005/06', 288, 2520, 682],
			['2006/07', 397, 3167, 623],
			['2007/08', 215, 2110, 609.4],
			['2008/09', 366, 2691, 569.6]
		];

	}

	ngOnInit() { }

	// For chart

// 	userDataSourcesc1: any;
// 	barArray: any[] = [];
// 	lineArray: any[] = [];
// 	barData: any;

// 	ngOnInit() {
// 		this.barArray = [
// 			{ column: "Corn Export", label: true },
// 			{ column: "Bajra Export", label: true }];

// 		this.lineArray = [
// 			{ column: "Rice Export", label: true, color: "green" },
// 			{ column: "Jowar Export" },
// 			{ column: "Wheat Export" }
// 		];
// 		this.barData = [
// 			['State', 'Corn Export', 'Bajra Export', 'Rice Export', 'Wheat Export', 'Jowar Export'],
// 			['Andhra Pradesh', 600, 500, 250, 50, 95],
// 			['Kerala', 500, 400, 75, 150, 195],
// 			['Tamil Nadu', 400, 300, 250, 50, 95],
// 			['Assam', 250, 150, 75, 150, 195],
// 			['Maharshtra', 300, 200, 250, 50, 95]
// 		];
// 	}

// 	constructor() {

// 	}
//    displayFieldArray : any[]=[];
// 	onMultiselectRequestType(event: any) {
// 		console.log(event);
// 		// set str arraya s empty
// 		this.displayFieldArray = [];
// 		console.log(this.displayFieldArray);
// 		event.map((item) => {
// 			this.displayFieldArray.push(item.value);
// 		});
// 		console.log(this.displayFieldArray);
// 		//
// 		this.reqType = this.displayFieldArray.toString();
// 		console.log(this.reqType);

// 	}

// 	//scenario 1 bar + line + data
// 	onDefaultChartClicksc1(event: any) {
// 		this.userDataSourcesc1 = event;
// 	}

// 	onDefaultLineClicksc1(event: any) {
// 		this.userDataSourcesc1 = event;
// 	}

// 	onUserDefineLegendClicksc1(event: any) {
// 		console.log(event);

// 		this.userDataSourcesc1 = event;
// 	}

}
