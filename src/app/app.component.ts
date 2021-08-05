import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'amexio-io-multiselect';
	reqType = " "
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
		}
	]
	constructor() {

	}

	onMultiselectRequestType(event: any) {
		console.log(event);
	}

}
