import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterEditComponent } from './help-center-edit.component';

describe('HelpCenterEditComponent', () => {
  let component: HelpCenterEditComponent;
  let fixture: ComponentFixture<HelpCenterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
