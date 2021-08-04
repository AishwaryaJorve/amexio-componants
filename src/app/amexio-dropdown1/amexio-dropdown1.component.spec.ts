import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmexioDropdown1Component } from './amexio-dropdown1.component';

describe('AmexioDropdown1Component', () => {
  let component: AmexioDropdown1Component;
  let fixture: ComponentFixture<AmexioDropdown1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmexioDropdown1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmexioDropdown1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
