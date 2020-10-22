import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffersComponent } from './edit-offers.component';

describe('EditOffersComponent', () => {
  let component: EditOffersComponent;
  let fixture: ComponentFixture<EditOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
