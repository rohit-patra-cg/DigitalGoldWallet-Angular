import { Routes } from '@angular/router';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './gaurds/auth.guard'

export const routes: Routes = [
    {path: "", component: LandingComponentComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]}
];
