import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationModuleComponent } from './browser-animation-module.component';

describe('BrowserAnimationModuleComponent', () => {
  let component: BrowserAnimationModuleComponent;
  let fixture: ComponentFixture<BrowserAnimationModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserAnimationModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserAnimationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
