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
import { ConvertToPhysicalComponent } from './components/convert-to-physical/convert-to-physical.component';
import { BuyGoldComponent } from './components/buy-gold/buy-gold.component';
import { SellGoldComponent } from './components/sell-gold/sell-gold.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    /** Non Guarded */
    { path: "", component: LandingComponentComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    /** Auth(user) Guarded */
    { path: "buy-gold/:userId", component: BuyGoldComponent, canActivate: [AuthGuard] },
    { path: "sell-gold/:userId", component: SellGoldComponent, canActivate: [AuthGuard] },
    { path: "dashboard/:userId", component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: "transactionHistory/:userId", component: TransactionHistoryComponent, canActivate: [AuthGuard] },
    { path: "physicalGoldTransactionHistory/:userId", component: PhysicalGoldTransactionComponent, canActivate: [AuthGuard] },
    { path: "convert-to-physical/:userId", component: ConvertToPhysicalComponent, canActivate: [AuthGuard] },
    /** Admin Guarded */
    { path: "add-vendor", component: AddVendorComponent, canActivate: [AdminGuard] },
    { path: "all-vendor-branch", component: AllVendorBranchesComponent, canActivate: [AdminGuard] },
    { path: "all-vendors", component: AllVendorsComponent, canActivate: [AdminGuard] },
    { path: "all-users", component: AllUsersComponent, canActivate: [AdminGuard] },
    { path: "admin", component: AdminDashboardComponent, canActivate: [AdminGuard] },
    { path: "all-physicalGoldTransactionHistory", component: AllPhysicalGoldTransactionsComponent, canActivate: [AdminGuard] },
    { path: "all-transactionHistory", component: AllTransactionHistoryComponent, canActivate: [AdminGuard] },
    { path: "update-vendor/:vendorId", component: AddVendorComponent, canActivate: [AdminGuard] },
    { path: "all-vendor-branches", component: AllVendorBranchesComponent, canActivate: [AdminGuard] },
];
