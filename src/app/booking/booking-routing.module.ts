import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking.component';
import { ViewSeatComponent } from './components/view-seat/view-seat.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PayBookComponent } from './components/pay-book/pay-book.component';
import { BookingSuccessComponent } from './components/booking-success/booking-success.component';
import { OfflineViewSeatComponent } from './components/offline-view-seat/offline-view-seat.component';
import { CouponComponent } from './components/coupon/coupon.component';
// import { MyTicketComponent } from './components/my-ticket/my-ticket.component';

const routes: Routes = [{ path: '', component: BookingComponent },
                        { path: 'view-seats', component: ViewSeatComponent },
                        { path: 'payment-details', component: PaymentDetailsComponent },
                        { path: 'pay-book', component: PayBookComponent },
                        { path: 'booking-success', component: BookingSuccessComponent },
                        { path: 'offline-view-seat', component: OfflineViewSeatComponent },
                        { path: 'coupon-list', component: CouponComponent },
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {



 }
