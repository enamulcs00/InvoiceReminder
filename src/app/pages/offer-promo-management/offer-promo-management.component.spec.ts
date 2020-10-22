import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPromoManagementComponent } from './offer-promo-management.component';

describe('OfferPromoManagementComponent', () => {
  let component: OfferPromoManagementComponent;
  let fixture: ComponentFixture<OfferPromoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferPromoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPromoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
