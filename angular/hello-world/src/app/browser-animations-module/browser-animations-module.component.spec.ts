import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModuleComponent } from './browser-animations-module.component';

describe('BrowserAnimationsModuleComponent', () => {
  let component: BrowserAnimationsModuleComponent;
  let fixture: ComponentFixture<BrowserAnimationsModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserAnimationsModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserAnimationsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
