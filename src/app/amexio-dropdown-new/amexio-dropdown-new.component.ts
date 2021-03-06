import {
	animate,
	state,
	style,
	transition,
	trigger,
} from "@angular/animations";
import {
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	forwardRef,
	Inject,
	inject,
	Input,
	OnInit,
	Output,
	Renderer2,
	TemplateRef,
	ViewChild,
} from "@angular/core";
import {
	ControlValueAccessor,
	FormControl,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	Validators,
} from "@angular/forms";
import { CommonDataService } from "./commondata.service";
import { DisplayFieldService } from "./display-field.service";
import { debounceTime } from "rxjs/operators";
import { EventBaseComponent } from "./event.base.component";
@Component({
	selector: 'amexio-dropdown-new',
	templateUrl: './amexio-dropdown-new.component.html',

	animations: [
		trigger("changeState", [
			state(
				"visible",
				style({
					"max-height": "200px",
				})
			),
			state(
				"hidden",
				style({
					"max-height": "0px",
				})
			),
			transition("*=>*", animate("200ms")),
		]),
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => AmexioDropdownNewComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => AmexioDropdownNewComponent),
			multi: true,
		},
	],
})

export class AmexioDropdownNewComponent extends EventBaseComponent<any> implements OnInit, ControlValueAccessor, Validators {

	/*
	 Properties
	 name : field-label
	 datatype : string
	 version : 4.0 onwards
	 default :
	 description : The label of this field
	 */
	@Input("field-label") fieldlabel: string;
	/*
	Properties
	name : allow-blank
	datatype : string
	version : 4.0 onwards
	default :
	description : Sets if field is required
	*/
	@Input("allow-blank") allowblank = true;

	/*
	Properties
	name : data
	datatype : any
	version : 4.0 onwards
	default :
	description : Local data for dropdown.
	*/
	_data: any;
	componentLoaded: boolean;
	hideDropdown: boolean;
	dropFlag: boolean;
	displayfieldToSearch: string = "";
	@Input("data")
	set data(value: any) {
		this._data = value;
		if (this.componentLoaded) {
			this.setData(this._data);
		}
	}
	get data(): any {
		return this._data;
	}
	/*
	 Properties
	 name : data-reader
	 datatype : string
	 version : 4.0 onwards
	 default :
	 description : Key in JSON datasource for records
	 */
	@Input("data-reader") datareader: string;

	/*
	 Properties
	 name : http-method
	 datatype : string
	 version : 4.0 onwards
	 default :
	 description : Type of HTTP call, POST,GET.
	 */
	@Input("http-method") httpmethod: string;

	/*
	 Properties
	 name : http-url
	 datatype : string
	 version : 4.0 onwards
	 default :
	 description : REST url for fetching datasource.
	 */
	@Input("http-url") httpurl: string;

	/*
	Properties
	name : display-field
	datatype : string
	version : 4.0 onwards
	default :
	description : Name of key inside response data to display on ui.
	*/
	@Input("display-field") displayfield: string
	/*
	Properties
	name : value-field
	datatype : string
	version : 4.0 onwards
	default :
	description : Name of key inside response data.use to send to backend
	*/
	@Input("value-field") valuefield: string;

	/*
	Properties
	name : search
	datatype : boolean
	version : 4.0 onwards
	default : false
	description : true for search box enable
	*/
	@Input() search: boolean;
	/*
	 Properties
	 name : readonly
	 datatype : boolean
	 version : 4.2.1 onwards
	 default : false
	 description : true for set dropdown input readonly.
	 */
	@Input() readonly: boolean;

	/*
	Properties
	name : multi-select
	datatype : boolean
	version : 4.0 onwards
	default : false
	description : true for select multiple options
	*/
	@Input("multi-select") multiselect: boolean;

	@Input("button-label") buttonLabel = "Ok";

	@ViewChild("dropdownitems", { read: ElementRef })
	public dropdownitems: ElementRef;

	displayValue = "";
	multiselectValuesCopy = [];
	filteredOptions: any[] = [];

	selectAllFlag = false;
	/*
	 Events
	 name : onBlur
	 datatype : any
	 version : 4.0 onwards
	 default :
	 description : On blur event
	 */
	@Output() onBlur: any = new EventEmitter<any>();
	/*
	Events
	name : input
	datatype : any
	version : none
	default :
	description : On input event field.
	*/
	@Output() input: any = new EventEmitter<any>();
	/*
	Events
	name : focus
	datatype : any
	version : none
	default :
	description : On field focus event
	*/
	@Output() focus: any = new EventEmitter<any>();
	/*
	Events
	name : onSingleSelect
	datatype : any
	version : none
	default :
	description : Fire when drop down item selected.
	*/
	@Output() onSingleSelect: any = new EventEmitter<any>();
	@Output() onRecordSelect: any = new EventEmitter<any>();

	/*
	Events
	name : onMultiSelect
	datatype : any
	version :none
	default :
	description : Fire when multiple record select in drop down.this event is only
	applied when multi-select=true
	*/
	@Output() onMultiSelect: any = new EventEmitter<any>();
	/*
	Events
	name : onClick
	datatype : any
	version :none
	default :
	description : On record select event.this event is only for normal dropdown.
	*/
	@Output() onClick: any = new EventEmitter<any>();
	showToolTip: boolean;
	/*
	Properties
	name : place-holder
	datatype : string
	version : 4.0 onwards
	default :
	description : Show place-holder inside dropdown component*/
	@Input("place-holder") placeholder = "";
	/*
	Properties
	name : disabled
	datatype : boolean
	version : 4.0 onwards
	default : false
	description : If true will not react on any user events and show disable icon over*/
	@Input() disabled: boolean;
	/*
	Properties
	name : icon-feedback
	datatype : boolean
	version : 4.0 onwards
	default : false
	description : */
	@Input("icon-feedback") iconfeedback: boolean;
	/*
	Properties
	name : font-style
	datatype : string
	version : 4.0 onwards
	default :
	description : Set font-style to field
	*/
	@Input("font-style") fontstyle: string;
	/*
	Properties
	name : font-family
	datatype : string
	version : 4.0 onwards
	default :
	description : Set font-family to field
	*/
	@Input("font-family") fontfamily: string;
	/*
	Properties
	name : font-size
	datatype : string
	version : 4.0 onwards
	default :
	description : Set font-size to field
	*/
	@Input("font-size") fontsize: string;
	/*
	Properties
	name : has-label
	datatype : boolean
	version : 4.0 onwards
	default : false
	description : flag to set label
	*/
	@Input("has-label") haslabel = true;
	/*
	Properties
	name : enable-popover
	datatype : boolean
	version : 4.0 onwards
	default :false
	description : Set enable / disable popover.
	*/
	@Input("enable-popover") enablepopover: boolean;

	@Input("enable-sort") enablesort = false;

	@Input("sort") sort = "";

	@Input("enable-checkbox") enablecheckbox = false;

	@Input("mask-loader") maskloader1 = false;
	helpInfoMsg: string;
	_errormsg: string;

	get errormsg(): string {
		return this._errormsg;
	}

	@Input("error-msg")
	set errormsg(value: string) {
		this.helpInfoMsg = value + "<br/>";
	}

	@ContentChild("amexioBodyTmpl") bodyTemplate: TemplateRef<any>;

	posixUp: boolean;
	isValid: boolean;
	selectedindex = -1;
	responseData: any;
	previousData: any;
	viewData: any;
	componentId: string;
	multiselectValues: any[] = [];
	maskloader = true;
	activedescendant = "aria-activedescendant";
	key = "index";
	// The internal dataviews model

	@Output() isComponentValid: any = new EventEmitter<any>();
	@Input("name") name: string;

	// inject service
	constructor(
		@Inject(forwardRef(() => CommonDataService)) private dataService: CommonDataService,
		@Inject(forwardRef(() => DisplayFieldService)) private displayFieldService: DisplayFieldService,
		public element: ElementRef,
		public renderer: Renderer2,
		_cd: ChangeDetectorRef
	) {
		super(renderer, element, _cd);
	}
	ngOnInit() {
		if (!this.enablecheckbox) {
			this.hideDropdown = true;
		}

		this.name = this.generateName(this.name, this.fieldlabel, "dropdowninput");
		this.componentId = this.createCompId("dropdown", this.name);
		this.isValid = this.allowblank;
		this.isComponentValid.emit(this.allowblank);
		if (this.httpmethod && this.httpurl) {
			this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(
				(response: any) => {
					this.responseData = response;
				},
				(error) => { },
				() => {
					this.setData(this.responseData);
				}
			);
		} else if (this.data) {
			this.previousData = JSON.parse(JSON.stringify(this.data));
			this.setData(this.data);
		}
		this.componentLoaded = true;
	}
	setData(httpResponse: any) {
		// Check if key is added?
		let responsedata = httpResponse;
		if (this.datareader != null) {
			this.multiselectValues = [];
			const dr = this.datareader.split(".");
			if (dr) {
				for (const ir of dr) {
					responsedata = responsedata[ir];
				}
			}
		} else {
			responsedata = httpResponse;
		}
		this.setResponseData(responsedata);
		this.multiSelection();
		this.setUserSelection();
		this.maskloader = false;
	}
	setResponseData(responsedata: any) {
		if (responsedata) {
			if (
				this.enablesort === true &&
				(this.sort === "" || this.sort.toLowerCase() === "asc")
			) {
				this.sortDataAscending(responsedata);
			} else if (
				this.enablesort === true &&
				this.sort.toLowerCase() === "desc"
			) {
				this.sortDataDescending(responsedata);
			} else if (this.enablesort === false) {
				this.viewData = responsedata;
				this.filteredOptions = this.viewData;
				this.generateIndex(this.filteredOptions);
			}
		}
	}

	sortDataAscending(data: any) {
		this.viewData = data.sort((a: any, b: any) =>
			this.displayFieldService.findValue(this.displayfield, a).toLowerCase() !==
				this.displayFieldService.findValue(this.displayfield, b).toLowerCase()
				? this.displayFieldService
					.findValue(this.displayfield, a)
					.toLowerCase() <
					this.displayFieldService.findValue(this.displayfield, b).toLowerCase()
					? -1
					: 1
				: 0
		);
		this.filteredOptions = this.viewData;
		this.generateIndex(this.filteredOptions);
	}
	sortDataDescending(data: any) {
		this.viewData = data.sort((a: any, b: any) =>
			this.displayFieldService.findValue(this.displayfield, a).toLowerCase() !==
				this.displayFieldService.findValue(this.displayfield, b).toLowerCase()
				? this.displayFieldService
					.findValue(this.displayfield, a)
					.toLowerCase() >
					this.displayFieldService.findValue(this.displayfield, b).toLowerCase()
					? -1
					: 1
				: 0
		);
		this.filteredOptions = this.viewData;
		this.generateIndex(this.filteredOptions);
	}

	generateIndex(data: any) {
		data.forEach((element: any, index: number) => {
			element["index"] = this.componentId + "listitem" + index;
		});
	}

	multiSelection() {
		if (this.multiselect && this.viewData) {
			let preSelectedMultiValues = "";
			const optionsChecked: any = [];
			this.viewData.forEach((row: any) => {
				if (row.hasOwnProperty("checked")) {
					if (row.checked) {
						optionsChecked.push(row[this.valuefield]);
						this.multiselectValues.push(row);
						preSelectedMultiValues === ""
							? (preSelectedMultiValues += this.displayFieldService.findValue(
								this.displayfield,
								row
							))
							: (preSelectedMultiValues +=
								", " +
								this.displayFieldService.findValue(this.displayfield, row));
					}
				} else {
					row["checked"] = false;
				}
			});
			this.bindData();
		}
	}
	bindData() {
		if (this.value && this.multiselect) {
			this.bindMultiselectModel();
		} else {
			this.displayValue = this.setMultiSelect();
		}
	}
	bindMultiselectModel() {
		if (this.value && this.multiselect && this.viewData.length > 0) {
			this.displayValue = this.value;
			this.bindMultiSelectModelData(this.value);
		}
	}
	splitData(): any {
		let data: any[] = [];
		if (this.value && this.multiselect) {
			this.displayValue = this.value;
			data = this.value.split(",");
		}
		return data;
	}
	bindMultiSelectModelData(valueArray: any[]) {
		let preSelectedValues = "";
		let res: any[] = [];
		res = this.splitData();
		this.viewData.forEach((row: any) => {
			if (res.length > 0) {
				res.forEach((valueData: any) => {
					if (row[this.valuefield] === valueData) {
						row["checked"] = true;
						preSelectedValues === ""
							? (preSelectedValues += this.displayFieldService.findValue(
								this.displayfield,
								row
							))
							: (preSelectedValues +=
								", " +
								this.displayFieldService.findValue(this.displayfield, row));
					}
				});
			} else {
				if (row.checked) {
					row["checked"] = false;
				}
			}
		});
	}
	setUserSelection() {
		// Set user selection
		if (this.innerValue != null) {
			const valueKey = this.valuefield;
			const displayKey = this.displayfield;
			const val = this.innerValue;
			if (this.viewData.length > 0) {
				this.viewData.forEach((item: any) => {
					if (item[valueKey] === val) {
						this.isValid = true;
						this.isComponentValid.emit(true);
						this.displayValue = item[displayKey];
						delete item[this.key];
						this.onSingleSelect.emit(item);
					}
				});
			}
		}
	}
	enableChkbox() {
		debounceTime(300);
		if (this.enablecheckbox) {
			this.dropFlag = true;
		}
	}
	emitItem(selectedItem: any) {
		if (selectedItem.hasOwnProperty("item")) {
			this.value = selectedItem.item[this.valuefield];
			this.displayValue = this.displayFieldService.findValue(
				this.displayfield,
				selectedItem.item
			);
		} else {
			this.value = selectedItem[this.valuefield];
			this.displayValue = this.displayFieldService.findValue(
				this.displayfield,
				selectedItem
			);
		}
		this.multiselect ? (this.showToolTip = true) : (this.showToolTip = false);
		if (selectedItem.hasOwnProperty("item")) {
			delete selectedItem.item[this.key];
		} else {
			delete selectedItem[this.key];
		}
		if (selectedItem.hasOwnProperty("item")) {
			this.onSingleSelect.emit(selectedItem.item);
		} else {
			this.onSingleSelect.emit(selectedItem);
		}

		if (selectedItem.hasOwnProperty("item")) {
			this.onRecordSelect.emit(selectedItem.item);
		} else {
			this.onRecordSelect.emit(selectedItem);
		}
	}
	validateChkbox() {
		this.isValid = true;
		if (!this.enablecheckbox) {
			this.hideDropdown = true;
			this.hide();
		}
		this.isComponentValid.emit(true);
	}
	setFlags() {
		this.selectAllFlag = false;
		// this.multiselectValues = [];
	}
	chkFlag(selectedItem: any) {
		console.log("only check");

		if (selectedItem.hasOwnProperty("item")) {
			if (selectedItem.item.hasOwnProperty("checked")) {
				selectedItem.item.checked = !selectedItem.item.checked;
			}
		} else if (selectedItem.hasOwnProperty("checked")) {
			selectedItem.checked = !selectedItem.checked;
		}
	}


	checkboxMethod(selectedItem: any) {
		if (!this.enablecheckbox) {
			this.displayValue = this.setMultiSelect();
		}
		if (this.enablecheckbox) {
			this.onBaseFocusEvent(selectedItem);
		}
	}

	setMultiSelectData() {
		console.log(this.multiselectValues);



		this.multiselectValuesCopy = this.multiselectValues;
		this.multiselectValues = [];
		// this.multiselectValues = multiselectValuesCopy
		// for (let i = 0; i < multiselectValuesCopy.length; i++) {
		// 	if (i % 2 == 0) {
		// 		this.multiselectValues.push(multiselectValuesCopy[i]);
		// 	}
		// }
		if (this.innerValue && this.innerValue.length > 0) {
			const modelValue = this.innerValue;
			this.filteredOptions.forEach((test) => {
				if (modelValue.length > 0) {
					this.modelCheck(modelValue, test);
				}
			});
		}
	}

	modelCheck(modelValue: any, test: any) {
		modelValue.forEach((mdValue: any) => {
			if (test[this.valuefield] === mdValue) {
				if (test.hasOwnProperty("checked")) {
					test.checked = true;
				}
				this.multiselectValues.push(test);
			}
		});
	}
	navigateKey(event: any) {
		this.multiselectValues = [];
		this.multiselectValues = this.multiselectValuesCopy;
	}
	getDisplayText() {
		console.log("inside getDisplayText");

		if (this.innerValue != null || this.innerValue !== "") {
			if (this.multiselect) {
				this.displayValue = this.setMultiSelect();
			} else {
				this.displayValue = "";
				this.filteredOptions.forEach((test) => {
					if (test[this.valuefield] === this.innerValue) {
						this.displayValue = this.displayFieldService.findValue(
							this.displayfield,
							test
						);
					}
				});
				this.displayValue =
					this.displayValue === undefined ? "" : this.displayValue;
			}
			console.log(this.displayValue);

		}
	}
	setMultiSelect() {
		this.setMultiSelectData();
		let multiselectDisplayString: any = "";
		let multiselectValueModel: any = "";
		this.multiselectValues.forEach((row: any) => {
			multiselectDisplayString === ""
				? (multiselectDisplayString += this.displayFieldService.findValue(
					this.displayfield,
					row
				))
				: (multiselectDisplayString +=
					", " + this.displayFieldService.findValue(this.displayfield, row));
		});
		this.multiselectValues.forEach((row: any) => {
			multiselectValueModel === ""
				? (multiselectValueModel += this.displayFieldService.findValue(
					this.valuefield,
					row
				))
				: (multiselectValueModel +=
					", " + this.displayFieldService.findValue(this.valuefield, row));
		});

		console.log(this.multiselectValues);
		this.value = multiselectValueModel;
		console.log(this.multiselectValues);
		if (this.multiselectValues.length > 0) {
			return multiselectDisplayString;
		} else {
			return "";
		}

	}
	onDropDownClick(event: any) {
		console.log(event);
		if (!this.enablecheckbox) {
			this.hideDropdown = true;
		}
		this.onBaseFocusEvent(event);
		this.showToolTip = true;
		this.onClick.emit(event);
		if (!this.multiselect && this.selectedindex > -1) {
			this.filteredOptions[this.selectedindex].selected = false;
			this.selectedindex = -1;
			this.selectedindex = this.selectedindex + 1;
			this.filteredOptions[this.selectedindex].selected = true;
			const inputid = document.getElementById(this.componentId);
			inputid.setAttribute(
				this.activedescendant,
				this.filteredOptions[this.selectedindex].index
			);
			this.generateScroll(this.selectedindex);
		}


	}

	generateScroll(index: any) {
		const listitems =
			this.element.nativeElement.getElementsByClassName("list-items")[index];
		if (listitems) {
			listitems.scrollIntoView({ behavior: "smooth" });
		}
	}

	focusToLast(event: any) {
		if (this.selectedindex > -1) {
			this.filteredOptions[this.selectedindex].selected = false;
			this.selectedindex = this.filteredOptions.length - 1;
			this.filteredOptions[this.filteredOptions.length - 1].selected = true;
			const inputid = document.getElementById(this.componentId);
			inputid.setAttribute(
				this.activedescendant,
				this.filteredOptions[this.filteredOptions.length - 1].index
			);
			this.generateScroll(this.selectedindex);
		}
	}
	closeOnEScape(event: any) {
		this.showToolTip = false;
		if (!this.enablecheckbox) {
			this.hideDropdown = true;
			this.hide();
		}
	}
	onChange(event: string) {
		this.innerValue = event;
		this.isValid = true;
		this.getDisplayText();
		this.isComponentValid.emit(true);
	}
	onInput(input: any, event: any) {
		if (event.target.value.length === 0) {
			this.value = "";
			this.displayValue = "";
			this.onChangeCallback(this.value);
		}
		this.input.emit();
		this.isValid = input.valid;
		this.isComponentValid.emit(input.valid);
	}
	onDropDownSearchKeyUp(event: any) {
		console.log("search", this.multiselectValues);

		console.log(this.displayfield.valueOf);
		this.displayfieldToSearch = this.displayfield;
		if (this.search && this.viewData) {
			const keyword = event.target.value;
			if (keyword != null && keyword !== "" && keyword !== " ") {
				this.filteredOptions = [];
				const search_Term = keyword.toLowerCase();
				this.viewData.forEach((row: any) => {
					if (
						this.displayFieldService
							.findValue(this.displayfield, row)
							.toLowerCase()
							.startsWith(search_Term)
					) {
						this.filteredOptions.push(row);
						console.log(this.filteredOptions, "On serach filterOptions");
						console.log(this.multiselectValues, "On search MultiselectValues");
					}
				});
			}
			if (keyword === "") {
				this.filteredOptions = this.viewData;
			}
		}
		if (event.keyCode === 8) {
			this.innerValue = "";
			this.displayValue = event.target.value;
		}
		if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
			this.navigateUsingKey(event);
		}
		this.onBaseFocusEvent({});


	}

	onItemSelect(selectedItem: any) {
		let selectedRow: any;
		console.log("checked");
		console.log(this.filteredOptions, "On select Item");
		console.log(this.multiselectValues, "On select multiSelectValues");

		this.enableChkbox();
		if (this.multiselect) {
			this.setFlags();
			console.log(this.multiselectValues, "On select multiSelectValues 2");
			const optionsChecked: any = [];
			if (
				selectedItem.hasOwnProperty("item") ||
				selectedItem.hasOwnProperty("checked")
			) {
				console.log("check");

				this.chkFlag(selectedItem);
				this.filteredOptions.forEach((row: any) => {
					if (row.checked) {
						optionsChecked.push(row[this.valuefield]);
						selectedRow = row;
						if (!this.multiselectValues.includes(row) && row.checked) {
							this.multiselectValues.push(row);
						}
						// this.multiselectValues.push(row);
						// // this.multiselectValues = [...this.multiselectValues, row];
						// console.log(this.multiselectValues, "On select multiSelectValues after operation");
						// this.multiselectValuesCopy = this.multiselectValues;
					}
				});
				// this.multiselectValues = [];
				// this.multiselectValuesCopy.forEach((row: any) => {
				// 	console.log(this.multiselectValues.includes(row.key), "if condition");
				// 	if (this.multiselectValues.includes(row.key)) {
				// 		console.log(this.multiselectValues.includes(row.key), "if condition");
				// 	}
				// 	else {
				// 		this.multiselectValues.push(row);
				// 		console.log("else");

				// 	}
				// })
				// console.log(selectedRow, "selected roe on select item");

				// if (!this.multiselectValues.includes(selectedRow)) {
				// 	this.multiselectValues.push(selectedRow);
				// }
				this.innerValue = optionsChecked;
				this.checkboxMethod(selectedItem);
				console.log("Multiselect values after operation", this.multiselectValues);
				if (!this.enablecheckbox) {
					this.onMultiSelect.emit(this.multiselectValues);
				}
				this.multiselectValuesCopy = this.multiselectValues;
				console.log(this.multiselectValues, "on click")
			} // if ends here
		} else {

			this.emitItem(selectedItem);
			console.log("else");

		} // else ends here
		this.validateChkbox();
	}

	// navigate using keys
	navigateUsingKey(event: any) {
		if (!this.showToolTip) {
			this.showToolTip = true;
		}
		if (this.selectedindex > this.filteredOptions.length) {
			this.selectedindex = 0;
		}
		if (
			event.keyCode === 40 ||
			(event.keyCode === 38 && this.selectedindex < this.filteredOptions.length)
		) {
			let prevselectedindex = -1;
			prevselectedindex = this.selectedindex;
			if (event.keyCode === 40) {
				this.selectedindex++;
			} else if (event.keyCode === 38) {
				this.selectedindex--;
			}
			this.navigateFilterOptions(prevselectedindex);
		}
		if (event.keyCode === 13 && this.filteredOptions[this.selectedindex]) {
			this.onItemSelect(this.filteredOptions[this.selectedindex]);
		}
	}
	// for highlight navigated options
	navigateFilterOptions(previndex: number) {
		if (this.filteredOptions[this.selectedindex]) {
			this.filteredOptions[this.selectedindex].selected = true;
			const inputid = document.getElementById(this.componentId);
			inputid.setAttribute(
				this.activedescendant,
				this.filteredOptions[this.selectedindex].index
			);
		}
		if (this.filteredOptions[previndex]) {
			this.filteredOptions[previndex].selected = false;
			this.toNavigateFirstAndLastOption();
		}
		this.generateScroll(this.selectedindex);
	}
	// to navigate first and last option
	toNavigateFirstAndLastOption() {
		if (this.selectedindex === -1) {
			this.selectedindex = this.filteredOptions.length - 1;
			this.filteredOptions[this.filteredOptions.length - 1].selected = true;
			const inputid = document.getElementById(this.componentId);
			inputid.setAttribute(
				this.activedescendant,
				this.filteredOptions[this.filteredOptions.length - 1].index
			);
		} else if (this.selectedindex === this.filteredOptions.length) {
			this.selectedindex = 0;
			this.filteredOptions[this.selectedindex].selected = true;
			const inputid = document.getElementById(this.componentId);
			inputid.setAttribute(
				this.activedescendant,
				this.filteredOptions[this.selectedindex].index
			);
		}
	}
	// get accessor
	get value(): any {
		return this.innerValue;
	}
	//  set accessor including call the onchange callback
	set value(v: any) {
		if (v != null && v !== this.innerValue) {
			this.innerValue = v;
			this.onChangeCallback(v);
		}
	}
	// Set touched on blur
	onblur(event: any) {
		if (this.self) {
			this.self = false;
		}
		this.hideDropdown = true;
		if (
			event.target &&
			event.target.value &&
			this.filteredOptions &&
			this.filteredOptions.length === 1
		) {
			const fvalue = event.target.value;
			const row = this.filteredOptions[0];
			const rvalue = this.displayFieldService.findValue(this.displayfield, row);
			if (fvalue && rvalue && fvalue.toLowerCase() === rvalue.toLowerCase()) {
				this.onItemSelect(row);
			}
			this.onBaseBlurEvent(event);
		}
		if (this.showToolTip) {
			this.showToolTip = !this.showToolTip;
		}
		let flag: any;
		if (event.target.value !== "") {
			const result = this.filteredOptions.find(
				(o: any) => o[this.displayfield] === event.target.value
			);
			if (result !== undefined) {
				flag = false;
			} else {
				flag = true;
			}
		} else {
			flag = true;
		}
		this.onTouchedCallback();
		this.onBlur.emit({ event, flag });
	}
	onFocus(elem: any, event: /*  */ any) {
		this.hideDropdown = true;

		this.onBaseFocusEvent(elem);
		this.showToolTip = true;
		this.posixUp = this.getListPosition(elem);
		this.focus.emit(event);
	}
	getListPosition(elementRef: any): boolean {
		const dropdownHeight = 325; // must be same in dropdown.scss
		if (
			window.screen.height - elementRef.getBoundingClientRect().bottom <
			dropdownHeight
		) {
			return true;
		} else {
			return false;
		}
	}
	// From ControlValueAccessor interface
	writeValue(value: any) {
		if (value != null) {
			this.writeChangedValue(value);
			if (this.value && this.multiselect) {
				this.bindMultiselectModel();
			}
		} else {
			this.innerValue = "";
			if (this.allowblank) {
				this.isValid = true;
			}
		}
	}
	writeChangedValue(value: any) {
		if (value !== this.innerValue) {
			let status = false;
			if (this.viewData && this.viewData.length > 0) {
				this.viewData.forEach((item: any) => {
					if (item[this.valuefield] === value) {
						this.isValid = true;
						this.displayValue = this.displayFieldService.findValue(
							this.displayfield,
							item
						);
						status = true;
						return;
					}
				});
			}
			if (!status) {
				this.displayValue = "";
			}
			this.value = value;
		}
	}

	// From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onChangeCallback = fn;
	}
	// From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}
	onIconClick() {
		if (!this.enablecheckbox) {
			this.hideDropdown = true;
		}
		if (this.dropdownstyle.visibility === "hidden") {
			this.showToolTip = false;
		}
		if (!this.disabled) {
			if (this.showToolTip === undefined || this.showToolTip === false) {
				this.onBaseFocusEvent({});
			} else {
				this.onBaseBlurEvent({});
			}
			this.showToolTip = !this.showToolTip;
		}
	}
	// THIS MEHTOD CHECK INPUT IS VALID OR NOT
	checkValidity(): boolean {
		return this.isValid;
	}
	public validate(c: FormControl) {
		return (!this.allowblank && (this.value || this.value === 0)) ||
			this.allowblank
			? null
			: {
				jsonParseError: {
					valid: true,
				},
			};
	}

	selectAll(event: any) {
		this.selectAllFlag = !this.selectAllFlag;
		const optionsChecked: any = [];
		// this.multiselectValues = this.multiselectValuesCopy;
		this.multiselectValues = [];
		this.filteredOptions.forEach((row: any) => {
			if (this.selectAllFlag) {
				row.checked = true;
				optionsChecked.push(row[this.valuefield]);
				this.multiselectValues.push(row);
			} else {
				row.checked = false;
			}
		});
		this.innerValue = optionsChecked;
		if (!this.enablecheckbox) {
			this.displayValue = this.setMultiSelect();
		}
		if (this.enablecheckbox) {
			this.onBaseFocusEvent(event);
		}
		this.multiselectValuesCopy.forEach(item => {
			if (!this.multiselectValues.includes(item))
				this.multiselectValues.push(item);
		})

		console.log(this.multiselectValues);
		this.onMultiSelect.emit(this.multiselectValues);
		console.log(this.multiselectValues);

	}

	onSaveClick(event: any) {
		this.multiselectValuesCopy = this.multiselectValues;

		this.displayfieldToSearch = " ";

		console.log(this.displayfield);
		console.log(this.displayValue);


		console.log(this.selectedindex);
		let copy = [];
		console.log(this.multiselectValues);

		copy = this.multiselectValues;
		this.multiselectValues = []
		copy.map((item, index) => {
			if (item.checked) {
				this.multiselectValues.push(item)
			}
		})
		console.log(this.multiselectValues);
		// this.displayValue = this.setMultiSelect();
		this.onMultiSelect.emit(this.multiselectValues);
		this.hideDropdown = true;
		this.dropFlag = false;
		this.hide();
	}

}
