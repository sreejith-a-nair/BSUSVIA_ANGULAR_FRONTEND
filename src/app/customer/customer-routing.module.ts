import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import { AuthGuard } from '../AuthGuard';
import { UserListComponent } from './components/user-list/user-list.component';
import { EmployListComponent } from '../admin/components/employ-list/employ-list.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component';
import { ChangePswdComponent } from './components/change-pswd/change-pswd.component';
import { ChangePswdDialogComponent } from './components/change-pswd-dialog/change-pswd-dialog.component';


const routes: Routes = [{ path: '', component: CustomerComponent ,canActivate: [AuthGuard] },
                        { path: 'profile', component: ProfileComponent },
                        { path: 'home', component: HomeComponent },
                        { path: "user-list", component: UserListComponent},
                        { path: "show-map", component: MapComponent},
                        { path: "search-bus", component: SearchComponent},
                        { path: "bus-list", component: BusListComponent },
                        { path: "my-tickets", component: MyTicketsComponent },
                        { path: "confirm-message", component: ConfirmationMessageComponent },
                        { path: "change-pswd", component: ChangePswdComponent },
                        { path: "change-pswd-dilog", component: ChangePswdDialogComponent },
                        
                       
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
