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
import { TicketErrorComponent } from './components/ticket-error/ticket-error.component';
import { AddMoreDetaisComponent } from './components/add-more-detais/add-more-detais.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletHistoryComponent } from './components/wallet-history/wallet-history.component';
import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CouponsComponent } from './components/coupons/coupons.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';





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
    TicketErrorComponent,
    AddMoreDetaisComponent,
    EditUserComponent,
    WalletComponent,
    WalletHistoryComponent,
    AddRatingComponent,
    CouponsComponent,
    FooterComponent,
    AboutComponent,
    
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
    NgbModule,
    // MatNativeDateModule,
    // MatInputModule,
    // MatDatepickerModule,
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
