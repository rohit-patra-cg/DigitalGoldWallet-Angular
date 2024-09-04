import { Routes } from '@angular/router';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './gaurds/auth.guard'
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';

export const routes: Routes = [
    {path: "", component: LandingComponentComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "all-users", component: AllUsersComponent, canActivate: [AuthGuard]},
    {path: "dashboard", component: UserDashboardComponent, canActivate: [AuthGuard]},
    {path: "transactionHistory/:userId", component: TransactionHistoryComponent, canActivate: [AuthGuard]}
];
