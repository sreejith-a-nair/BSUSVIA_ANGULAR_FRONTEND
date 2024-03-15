import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { AddBusComponent } from 'src/app/authority/components/add-bus/add-bus.component';
// import { BusRouteAndTimeComponent } from 'src/app/authority/components/bus-route-and-time/bus-route-and-time.component';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { AddRootComponent } from '../add-root/add-root.component';

@Component({
  selector: 'app-root-time',
  templateUrl: './root-time.component.html',
  styleUrls: ['./root-time.component.css']
})
export class RootTimeComponent implements OnInit{


  
driverBus: BusResponse[] = [];
// busManage: any;

  constructor(private driverService : DriverServiceService,
              private jwtService : JwtServiceService,
              private ngxService: NgxUiLoaderService,
              // private dialog: MatDialogRef<RootTimeComponent>,
              private dialogs:MatDialog,
              private router : Router){
              
  }

  HeadingArray = [
    { Head: 'Bus Name', bodyKey: 'busName' },
    { Head: 'Bus Number', bodyKey: 'busNumber' },
    { Head: 'Bus Type', bodyKey: 'busType' },
    { Head: 'Total Seats', bodyKey: 'totalSeats' },
    { Head: 'Double Seat Count', bodyKey: 'doubleSeatCount' },
    { Head: 'Third Row Seat Count', bodyKey: 'thirdRowSeatCount' },
    { Head: 'Add root ', bodyKey: 'addRoot' },
    { Head: 'View root', bodyKey: 'viewroot' },
  ];
  
  ngOnInit(): void {
    const driverMail = this.jwtService.extractEmail();
    this.driverService.getBusByDriverEmail  (driverMail).subscribe(
      response => {
        console.log(response);
        this.driverBus=response;
        console.log("Driver bus "+ this.driverBus );
        
          
      },
      err => {
        console.error("Error fetching bus:", err);
      }
    );
  }

  AddRootAndTime(busId: string) {
    console.log("add root bus uuid * * * ", busId);
    this.ngxService.stop();
    this.openRouteAndTimeModal(busId);
  }
    
  openRouteAndTimeModal(busId:string|null) { 
    
    
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="650px";
    dialogConfig.data = { busId: busId };
    this.dialogs.open(AddRootComponent,dialogConfig)
    console.log("root time modal open  ",busId);
    this.router.navigate(['/operator/add-root'], { queryParams: { busId: busId } });

  }


  viewRoot(busId: Event) {
    console.log("view root bus uuid" , busId);
    this.router.navigate(['/operator/view-root'], { queryParams: { busId: busId } });

  }
      


}
