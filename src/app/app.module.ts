import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { SubadminManagementComponent } from './pages/subadmin-management/subadmin-management.component';
import { ManageRecordsComponent } from './pages/manage-records/manage-records.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { PackageManagementComponent } from './pages/package-management/package-management.component';
import { OfferPromoManagementComponent } from './pages/offer-promo-management/offer-promo-management.component';
import { TransactionManagementComponent } from './pages/transaction-management/transaction-management.component';
import { HelpCenterManagementComponent } from './pages/help-center-management/help-center-management.component';
import { StaticContentManagementComponent } from './pages/static-content-management/static-content-management.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AddSubadminComponent } from './pages/add-subadmin/add-subadmin.component';
import { AddOffersComponent } from './pages/add-offers/add-offers.component';
import { AddPromotionsComponent } from './pages/add-promotions/add-promotions.component';
import { EditOffersComponent } from './pages/edit-offers/edit-offers.component';
import { EditSubadminComponent } from './pages/edit-subadmin/edit-subadmin.component';
import { EditUserDetailComponent } from './pages/edit-user-detail/edit-user-detail.component';
import { HelpCenterAddComponent } from './pages/help-center-add/help-center-add.component';
import { HelpCenterEditComponent } from './pages/help-center-edit/help-center-edit.component';
import { PrivacyEditComponent } from './pages/privacy-edit/privacy-edit.component';
import { TutorialsViewComponent } from './pages/tutorials-view/tutorials-view.component';
import { PrivacyViewComponent } from './pages/privacy-view/privacy-view.component';
import { TermsEditComponent } from './pages/terms-edit/terms-edit.component';
import { TermsViewComponent } from './pages/terms-view/terms-view.component';
import { ViewOffersComponent } from './pages/view-offers/view-offers.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { HeaderBarComponent } from './pages/header-bar/header-bar.component';
import { MainServicesService} from './main-services.service';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { countryList } from "./pages/countrylist";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';


// import {Debounce} from 'angular2-debounce';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    UserManagementComponent,
    SubadminManagementComponent,
    ManageRecordsComponent,
    CategoryManagementComponent,
    PackageManagementComponent,
    OfferPromoManagementComponent,
    TransactionManagementComponent,
    HelpCenterManagementComponent,
    StaticContentManagementComponent,
    AddUserComponent,
    AddSubadminComponent,
    AddOffersComponent,
    AddPromotionsComponent,
    EditOffersComponent,
    EditSubadminComponent,
    EditUserDetailComponent,
    HelpCenterAddComponent,
    HelpCenterEditComponent,
    PrivacyEditComponent,
    TutorialsViewComponent,
    PrivacyViewComponent,
    TermsEditComponent,
    TermsViewComponent,
    ViewOffersComponent,
    SideMenuComponent,
    HeaderBarComponent,
    ResetPasswordComponent,
    EditPromotionComponent,
    PromotionEditComponent,

    
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      maxOpened :1,
      preventDuplicates: true,
    }),
     NgxPaginationModule,
    
     

  ],
  providers: [MainServicesService,CookieService,countryList,],
  bootstrap: [AppComponent]
})
export class AppModule { }
