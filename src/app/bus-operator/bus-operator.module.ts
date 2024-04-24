import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusOperatorRoutingModule } from './bus-operator-routing.module';
import { BusOperatorComponent } from './bus-operator.component';
import { RootTimeComponent } from './components/root-time/root-time.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReusableComponentsModule } from "../modules/reusable_module";
import { MatCustomModule } from '../modules/mat_custom_module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRootComponent } from './components/add-root/add-root.component';
import { ViewRootComponent } from './components/view-root/view-root.component';
import { AddStopsComponent } from './components/add-stops/add-stops.component';
import { SeatRowsComponent } from './components/seat-rows/seat-rows.component';
import { BusDataComponent } from './components/bus-data/bus-data.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ReservedUserListComponent } from './components/reserved-user-list/reserved-user-list.component';
import { EditRootComponent } from './components/edit-root/edit-root.component';


@NgModule({
    declarations: [
        BusOperatorComponent,
        RootTimeComponent,
        DashboardComponent,
        AddRootComponent,
        ViewRootComponent,
        AddStopsComponent,
        SeatRowsComponent,
        BusDataComponent,
        ReservedUserListComponent,
        EditRootComponent
    ],
    imports: [
        CommonModule,
        BusOperatorRoutingModule,
        ReusableComponentsModule,
        MatCustomModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMaterialTimepickerModule
        
    ]
})
export class BusOperatorModule { }
