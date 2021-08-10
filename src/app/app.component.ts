import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'amexio-io-multiselect';
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
	constructor() {

	}
   displayFieldArray : any[]=[];
	onMultiselectRequestType(event: any) {
		console.log(event);
		// set str arraya s empty
		this.displayFieldArray = [];
		console.log(this.displayFieldArray);
		event.map((item) => {
			this.displayFieldArray.push(item.value);
		});
		console.log(this.displayFieldArray);
		//
		this.reqType = this.str.toString();
		console.log(this.reqType);

	}

}
