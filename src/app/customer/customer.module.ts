import { NgModule,isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig,NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../AuthGuard';
import { AuthInterceptor } from '../core/interceptor/auth.interceptor';
import { RouterModule } from '@angular/router';
import { MatCustomModule } from '../modules/mat_custom_module';
import { ReusableComponentsModule } from '../modules/reusable_module';
import { EmployListComponent } from '../admin/components/employ-list/employ-list.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component';
import { ChangePswdComponent } from './components/change-pswd/change-pswd.component';
import { ChangePswdDialogComponent } from './components/change-pswd-dialog/change-pswd-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserErrorpageComponent } from './components/user-errorpage/user-errorpage.component';




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
    CustomerComponent,
    ProfileComponent,
    UserListComponent,
    HomeComponent,
    EmployListComponent,
    MapComponent,
    SearchComponent,
    BusListComponent,
    MyTicketsComponent,
    ConfirmationMessageComponent,
    ChangePswdComponent,
    ChangePswdDialogComponent,
    UserErrorpageComponent,
    // DashboardComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatCustomModule,
    NgxUiLoaderModule.forRoot(ngxUiLoader),
    RouterModule,
    ReusableComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forRoot({user:UserReducer}),
    // EffectsModule.forRoot([UserEffect]),
    StoreDevtoolsModule.instrument({maxAge:50, logOnly: !isDevMode()})
  ],
  exports: [
    RouterModule 
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

})
export class CustomerModule { }
