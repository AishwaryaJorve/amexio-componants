import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAccesorComponent } from './value-accesor.component';

describe('ValueAccesorComponent', () => {
  let component: ValueAccesorComponent;
  let fixture: ComponentFixture<ValueAccesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueAccesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueAccesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
