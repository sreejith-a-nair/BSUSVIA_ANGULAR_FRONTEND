import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorityComponent } from './authority.component';
import { BusManageComponent } from './components/bus-manage/bus-manage.component';
import { DriverManageComponent } from './components/driver-manage/driver-manage.component';
import { TicketManageComponent } from './components/ticket-manage/ticket-manage.component';
import { DashboardManageComponent } from './components/dashboard-manage/dashboard-manage.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
// import { BusRouteAndTimeComponent } from './components/bus-route-and-time/bus-route-and-time.component';
import { EditBusComponent } from './components/edit-bus/edit-bus.component';
import { DriverBusTsComponent } from './components/driver-bus.ts/driver-bus.ts.component';

const routes: Routes = [{ path: '', component: AuthorityComponent },
                        { path: 'bus-manage', component: BusManageComponent },
                        { path: 'ticket-manage', component: TicketManageComponent },
                        { path: 'dashboard-manage', component: DashboardManageComponent },
                        { path: 'add-bus', component: AddBusComponent },
                        { path: 'edit-bus', component: EditBusComponent },
                        // { path: 'add-route-time', component: BusRouteAndTimeComponent },
                        { path: 'operator-manage', component: DriverManageComponent },
                        { path: 'driver-bus', component: DriverBusTsComponent },
                   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorityRoutingModule { }
