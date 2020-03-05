import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModuleComponent } from './browser-module.component';

describe('BrowserModuleComponent', () => {
  let component: BrowserModuleComponent;
  let fixture: ComponentFixture<BrowserModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
