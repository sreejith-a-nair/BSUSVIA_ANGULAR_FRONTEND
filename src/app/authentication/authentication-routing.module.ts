import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';


const routes: Routes = [{ path: '', component: AuthenticationComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'register', component: RegisterComponent },
                        { path: 'forgot-password', component: ForgotPasswordComponent },
                        { path: 'change-password', component: ChangePasswordComponent },
                        { path: 'logout', component: LogoutComponent },
                        { path: 'more-details', component: MoreDetailsComponent }
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
