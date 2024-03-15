import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';  
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserReducer } from './state/user.reducer';
import { UserEffect } from './state/user.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from './AuthGuard';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { MatCustomModule } from './modules/mat_custom_module';
import { MessageService } from 'primeng/api';
import { AuthorityReducer } from './state/authority.reducer';





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
    AppComponent,
    NavbarComponent,


  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCustomModule,
    ToastModule,
    
    // NgIconsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoader),
    StoreModule.forRoot({user:UserReducer,
                         authority:AuthorityReducer}),

    EffectsModule.forRoot([UserEffect]),
    StoreDevtoolsModule.instrument({maxAge:50, logOnly: !isDevMode()})

  ],
providers: [
  MessageService,
  AuthGuard,
  // MatDialogModule,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
