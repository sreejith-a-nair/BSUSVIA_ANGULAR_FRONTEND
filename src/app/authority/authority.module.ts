import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorityRoutingModule } from './authority-routing.module';
import { AuthorityComponent } from './authority.component';
import { BusManageComponent } from './components/bus-manage/bus-manage.component';
import { DriverManageComponent } from './components/driver-manage/driver-manage.component';
import { TicketManageComponent } from './components/ticket-manage/ticket-manage.component';
import { ReusableComponentsModule } from "../modules/reusable_module";
import { DashboardManageComponent } from './components/dashboard-manage/dashboard-manage.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { MatCustomModule } from '../modules/mat_custom_module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBusComponent } from './components/edit-bus/edit-bus.component';
import { BusSelectionDialogComponentComponent } from './components/bus-selection-dialog-component/bus-selection-dialog-component.component';
import { DriverBusTsComponent } from './components/driver-bus.ts/driver-bus.ts.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ChatManageComponent } from './components/chat-manage/chat-manage.component';
import { NotificationManageComponent } from './components/notification-manage/notification-manage.component'; // Import NgxMaterialTimepickerModule



@NgModule({
    declarations: [
        AuthorityComponent,
        BusManageComponent,
        DriverManageComponent,
        TicketManageComponent,
        DashboardManageComponent,
        AddBusComponent,
        EditBusComponent,
        BusSelectionDialogComponentComponent,
        DriverBusTsComponent,
        ChatManageComponent,
        NotificationManageComponent
    ],
    imports: [
        CommonModule,
        AuthorityRoutingModule,
        ReusableComponentsModule,
        MatCustomModule,
        ReactiveFormsModule,
        FormsModule,
        NgxMaterialTimepickerModule
    ]
})
export class AuthorityModule { }
