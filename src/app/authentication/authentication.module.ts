import { NgModule,isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { AuthGuard } from '../AuthGuard';
import { LogoutComponent } from './components/logout/logout.component';
import { ReusableComponentsModule } from '../modules/reusable_module';
import { AuthInterceptor } from '../core/interceptor/auth.interceptor';
import { MatCustomModule } from '../modules/mat_custom_module';
import { ToastModule } from 'primeng/toast';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { OtpValidationComponent } from './components/otp-validation/otp-validation.component';
import { AdminRequestComponent } from './components/admin-request/admin-request.component';



const ngxUiLoader:NgxUiLoaderConfig={
  text:"Loading...",
  textColor:"#ffffff",
  textPosition:"center-center",
  bgsColor:"#7b1fa2",
  fgsColor:"#7b1fa2",
  fgsType:SPINNER.fadingCircle,
  fgsSize:100,
  hasProgressBar:false

}

@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LogoutComponent,
    MoreDetailsComponent,
    OtpValidationComponent,
    AdminRequestComponent
  ],
  imports: [
    CommonModule,
    ReusableComponentsModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCustomModule,
    ToastModule,
    NgxUiLoaderModule.forRoot(ngxUiLoader),
    StoreDevtoolsModule.instrument({maxAge:50, logOnly: !isDevMode()})
  ],
  providers: [
    AuthGuard,
    // MatDialogModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

})
export class AuthenticationModule { }
