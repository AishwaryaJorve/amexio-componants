/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

// @Component({
//   selector: 'value-accessor',
//   template: './value-accessor.component.html',
// })

export class ValueAccessorBaseComponent<T> implements ControlValueAccessor {

  onTouchedCallback: () => void = noop;
  onChangeCallback: (_: any) => void = noop;

  innerValue: T;

  constructor() {

  }

  // get accessor
  get value(): T {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: T) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
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

  // THIS METHOD GENERATE RANDOM STRING
  generateName(name: string, fieldlabel: string, inputType: string): string {
    let newName = name;
    if (!name && fieldlabel) {
      newName = fieldlabel.replace(/\s/g, '');
    } else if (!name && !fieldlabel) {
      newName = inputType + '-' + this.getRandomString();
    }
    return newName;
  }
  getRandomString(): string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < 6; i++) {
      randomString += possibleCharacters.charAt(window.crypto.getRandomValues(new Uint32Array(1))[0] * possibleCharacters.length);
    }
    return randomString;
  }

  createCompId(inputType: any, name: any) {
    if (name === '' || name === null) {
      return inputType + '_' + window.crypto.getRandomValues(new Uint32Array(1))[0];
    } else {
      return inputType + '_' + name;
    }
  }
}
