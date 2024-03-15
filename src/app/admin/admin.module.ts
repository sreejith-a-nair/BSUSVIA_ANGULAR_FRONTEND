import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BusDetailsComponent } from './components/bus-details/bus-details.component';
import { BannerComponent } from './components/banner/banner.component';
import { AuthorityDetailsComponent } from './components/authority-details/authority-details.component';
import { ReusableComponentsModule } from "../modules/reusable_module";
import { AuthorityMoreDetailsComponent } from './components/authority-details/authority-more-details/authority-more-details.component';
import { MatCustomModule } from '../modules/mat_custom_module';
import { AllBuslistComponent } from './components/all-buslist/all-buslist.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';


@NgModule({
    declarations: [
        AdminComponent,
        BusDetailsComponent,
        BannerComponent,
        AuthorityDetailsComponent,
        AuthorityMoreDetailsComponent,
        AllBuslistComponent,
        BookingDetailsComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReusableComponentsModule,
        MatCustomModule
    ]
})
export class AdminModule { }
