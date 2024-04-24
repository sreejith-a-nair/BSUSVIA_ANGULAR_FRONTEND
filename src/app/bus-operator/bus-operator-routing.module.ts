import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusOperatorComponent } from './bus-operator.component';
import { RootTimeComponent } from './components/root-time/root-time.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRootComponent } from './components/add-root/add-root.component';
import { ViewRootComponent } from './components/view-root/view-root.component';
import { AddStopsComponent } from './components/add-stops/add-stops.component';
import { BusDataComponent } from './components/bus-data/bus-data.component';
import { SeatRowsComponent } from './components/seat-rows/seat-rows.component';
import { OfflineViewSeatComponent } from '../booking/components/offline-view-seat/offline-view-seat.component';
import { ReservedUserListComponent } from './components/reserved-user-list/reserved-user-list.component';

const routes: Routes = [{ path: '', component: BusOperatorComponent },
                        { path: 'bus-root-time', component: RootTimeComponent },
                        { path: 'dashboard', component: DashboardComponent } ,
                        { path: 'add-root', component: AddRootComponent },
                        { path: 'view-root', component: ViewRootComponent },
                        { path: 'add-stops', component: AddStopsComponent },
                        { path: 'bus-data', component: BusDataComponent },
                        { path: 'add-seat-row', component: SeatRowsComponent },
                        { path: 'reserved-user-list', component: ReservedUserListComponent },
                        
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusOperatorRoutingModule { }
