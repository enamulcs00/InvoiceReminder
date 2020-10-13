
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { TermsEditComponent } from './pages/terms-edit/terms-edit.component';
import { TermsViewComponent } from './pages/terms-view/terms-view.component';
import { ViewOffersComponent } from './pages/view-offers/view-offers.component';
import { PrivacyViewComponent } from './pages/privacy-view/privacy-view.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { HeaderBarComponent } from './pages/header-bar/header-bar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent },

  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'subadmin-management', component: SubadminManagementComponent, canActivate: [AuthGuard] },
  { path: 'manage-records/:id', component: ManageRecordsComponent, canActivate: [AuthGuard] },
  { path: 'category-management', component: CategoryManagementComponent, canActivate: [AuthGuard] },
  { path: 'package-management', component: PackageManagementComponent, canActivate: [AuthGuard] },
  { path: 'offer-promo-management', component: OfferPromoManagementComponent, canActivate: [AuthGuard] },
  { path: 'transaction-management', component: TransactionManagementComponent, canActivate: [AuthGuard] },
  { path: 'help-center-management', component: HelpCenterManagementComponent, canActivate: [AuthGuard] },
  { path: 'static-content-management', component: StaticContentManagementComponent, canActivate: [AuthGuard] },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'add-subadmin', component: AddSubadminComponent, canActivate: [AuthGuard] },
  { path: 'add-offers', component: AddOffersComponent, canActivate: [AuthGuard] },
  { path: 'add-promotions', component: AddPromotionsComponent, canActivate: [AuthGuard] },
  { path: 'edit-offers/:id', component: EditOffersComponent, canActivate: [AuthGuard] },
  { path: 'edit-subadmin/:id', component: EditSubadminComponent, canActivate: [AuthGuard] },
  { path: 'edit-user-detail/:id', component: EditUserDetailComponent, canActivate: [AuthGuard] },
  { path: 'help-center-add', component: HelpCenterAddComponent, canActivate: [AuthGuard] },
  { path: 'help-center-edit/:id', component: HelpCenterEditComponent, canActivate: [AuthGuard] },
  { path: 'privacy-edit', component: PrivacyEditComponent, canActivate: [AuthGuard] },
  { path: 'tutorials-view', component: TutorialsViewComponent, canActivate: [AuthGuard] },
  { path: 'privacy-view', component: PrivacyViewComponent, canActivate: [AuthGuard] },
  { path: 'terms-edit', component: TermsEditComponent, canActivate: [AuthGuard] },
  { path: 'terms-view', component: TermsViewComponent, canActivate: [AuthGuard] },
  { path: 'view-offers/:id', component: ViewOffersComponent, canActivate: [AuthGuard] },
  { path: 'side-menu', component: SideMenuComponent, canActivate: [AuthGuard] },
  { path: 'header-bar', component: HeaderBarComponent, canActivate: [AuthGuard] },
  { path: 'view-promotion/:id', component: EditPromotionComponent, canActivate: [AuthGuard] },
  { path: 'promotion-edit/:id', component: PromotionEditComponent, canActivate: [AuthGuard] },
  { path: 'reset-password/:id/:email/:token', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
