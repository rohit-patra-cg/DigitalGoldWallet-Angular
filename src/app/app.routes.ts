import { Routes } from '@angular/router';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard'
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { PhysicalGoldTransactionComponent } from './components/physical-gold-transaction/physical-gold-transaction.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AllVendorsComponent } from './components/all-vendors/all-vendors.component';
import { AllPhysicalGoldTransactionsComponent } from './components/all-physical-gold-transactions/all-physical-gold-transactions.component';
import { AllTransactionHistoryComponent } from './components/all-transaction-history/all-transaction-history.component';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { AllVendorBranchesComponent } from './components/all-vendor-branches/all-vendor-branches.component';

export const routes: Routes = [
    {path: "", component: LandingComponentComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "add-vendor", component: AddVendorComponent , canActivate: [AuthGuard]},//to be changed
    {path: "all-vendor-branch", component: AllVendorBranchesComponent , canActivate: [AuthGuard]},//to be changed
    {path: "all-vendors", component: AllVendorsComponent, canActivate: [AuthGuard]},//to be changed to admin guard
    {path: "all-users", component: AllUsersComponent, canActivate: [AuthGuard]},//to be changed to admin guard
    {path: "dashboard/:userId", component: UserDashboardComponent, canActivate: [AuthGuard]},
    {path: "transactionHistory/:userId", component: TransactionHistoryComponent, canActivate: [AuthGuard]},
    {path: "physicalGoldTransactionHistory/:userId", component: PhysicalGoldTransactionComponent, canActivate: [AuthGuard]},
    {path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard]}, //to be changed to admin guard
    {path: "all-physicalGoldTransactionHistory", component: AllPhysicalGoldTransactionsComponent, canActivate: [AuthGuard]}, //to be changed to admin guard
    {path: "all-transactionHistory", component: AllTransactionHistoryComponent, canActivate: [AuthGuard]}, //to be changed to admin guard
    {path: "update-vendor/:vendorId", component: AddVendorComponent, canActivate: [AuthGuard]} //to be changed to admin guard
];
