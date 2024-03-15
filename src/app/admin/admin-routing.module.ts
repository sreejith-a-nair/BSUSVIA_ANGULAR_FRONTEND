import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../AuthGuard';
import { EmployListComponent } from './components/employ-list/employ-list.component';
import { BusDetailsComponent } from './components/bus-details/bus-details.component';
import { AuthorityDetailsComponent } from './components/authority-details/authority-details.component';
import { AuthorityMoreDetailsComponent } from './components/authority-details/authority-more-details/authority-more-details.component';
import { AllBuslistComponent } from './components/all-buslist/all-buslist.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';

const routes: Routes = [{ path: '', component: AdminComponent },
                        { path: "", redirectTo: "dashboard", pathMatch: 'full'},
                        { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
                        // { path: "user-list", component: UserListComponent},
                        { path: "employ-list", component: EmployListComponent},
                        { path: "all-bus-list", component: AllBuslistComponent} ,
                        { path: "authority-details", component: AuthorityDetailsComponent},
                        { path: "authority-more-details", component: AuthorityMoreDetailsComponent},
                        { path: "booking-details", component: BookingDetailsComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
