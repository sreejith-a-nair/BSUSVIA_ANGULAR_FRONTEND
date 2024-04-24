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
import { OfflineViewSeatComponent } from './components/offline-view-seat/offline-view-seat.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { ReusableComponentsModule } from "../modules/reusable_module";
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { EditCouponComponent } from './components/edit-coupon/edit-coupon.component';
import { FormsModule } from '@angular/forms';

import { enviroment } from 'src/environment/environment';
import {initializeApp} from 'firebase/app';
initializeApp(enviroment.firebase)



@NgModule({
    declarations: [
        BookingComponent,
        ViewSeatComponent,
        PaymentDetailsComponent,
        PayBookComponent,
        BookingSuccessComponent,
        OfflineViewSeatComponent,
        CouponComponent,
        AddCouponComponent,
        EditCouponComponent,
    ],
    imports: [
        MatCustomModule,
        CommonModule,
        BookingRoutingModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        ReusableComponentsModule,
        FormsModule 
    ]
})
export class BookingModule { }
