import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Event.BaseComponent } from './event.base.component';

describe('Event.BaseComponent', () => {
  let component: Event.BaseComponent;
  let fixture: ComponentFixture<Event.BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Event.BaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Event.BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
