import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { ValueAccessorBaseComponent } from "../value-accesor/value-accesor.component";

@Component({
  selector: 'app-event.base',
  templateUrl: './event.base.component.html',
  styleUrls: ['./event.base.component.css']
})
export class EventBaseComponent extends ValueAccessorBaseComponent<any>  {

  self = false;
  itemClick = false;
  dropdownstyle: any;
  documentClickListener: any;
  /* hideDropdown : flag for multiselect with chcekbox */
  hideDropdown: any = undefined;
  dropFlag = false;
  constructor(public renderer: Renderer2, public element: ElementRef, private cd: ChangeDetectorRef) {
      super();
      this.hide();
  }

  onBaseFocusEvent(event: any) {
      this.self = true;
      this.dropdownstyle = { visibility: 'visible' };
      this.bindDocumentClickListener();
  }

  onBaseBlurEvent(event: any): boolean {
      this.onBaseItemClicked();
      return false;
  }

  onBaseItemClicked() {
      this.itemClick = true;
      this.hide();
      this.unbindDocumentClickListener();
      this.clearClicks();
  }

  bindDocumentClickListener() {
      if (!this.documentClickListener) {
          this.documentClickListener = this.renderer
              .listen('document', 'click', (event: any) => {
                 if (!this.dropFlag) {
                  this.handleDocumentListener(event);
                 }
              });
      }

  }

  handleDocumentListener(event: any) {
      if (!this.self && !this.itemClick) {
          this.hide();
          this.unbindDocumentClickListener();
      }
      this.clearClicks();
      this.cd.markForCheck();
  }

  clearClicks() {
      this.self = false;
      this.itemClick = false;
  }

  unbindDocumentClickListener() {
      if (this.documentClickListener) {
          this.documentClickListener();
          this.documentClickListener = null;
      }

  }
  hide() {
      if (this.hideDropdown || this.hideDropdown === undefined) { // fix to handle visibility in case of multiselect
          this.dropdownstyle = { visibility: 'hidden' };
          this.hideDropdown = false;
      }
  }
}
