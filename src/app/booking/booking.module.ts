import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { ViewSeatComponent } from './components/view-seat/view-seat.component';
import { CustomerComponent } from '../customer/customer.component';
import { MatCustomModule } from '../modules/mat_custom_module';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayBookComponent } from './components/pay-book/pay-book.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';




@NgModule({
  declarations: [
    BookingComponent,
    ViewSeatComponent,
    PaymentDetailsComponent,
    PayBookComponent,
    BookingSuccessComponent,

   
  ],
  imports: [
    MatCustomModule,
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule
  ]
})
export class BookingModule { }
