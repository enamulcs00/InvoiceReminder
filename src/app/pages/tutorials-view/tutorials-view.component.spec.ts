import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsViewComponent } from './tutorials-view.component';

describe('TutorialsViewComponent', () => {
  let component: TutorialsViewComponent;
  let fixture: ComponentFixture<TutorialsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
