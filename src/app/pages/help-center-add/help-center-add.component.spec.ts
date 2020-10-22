import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterAddComponent } from './help-center-add.component';

describe('HelpCenterAddComponent', () => {
  let component: HelpCenterAddComponent;
  let fixture: ComponentFixture<HelpCenterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpCenterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
