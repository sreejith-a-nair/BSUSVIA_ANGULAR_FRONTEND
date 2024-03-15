import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { SeatRowsComponent } from '../seat-rows/seat-rows.component';

@Component({
  selector: 'app-bus-data',
  templateUrl: './bus-data.component.html',
  styleUrls: ['./bus-data.component.css']
})
export class BusDataComponent {

  
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
    { Head: 'Add Seats Row ', bodyKey: 'addSeatRow' },
    { Head: 'View Seats Row', bodyKey: 'viewSeatRow' },
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

viewSeatRow(busId: any) {
  console.log("Bus id for viewSeats",busId);
  

}
AddSeatRow(busId: any) {
  console.log("Bus id for Add seatrow",busId);
  this.ngxService.stop();
  this.openAddStopRowModal(busId);
}
openAddStopRowModal(busId:string|null) { 
    
    
  const dialogConfig= new MatDialogConfig();
  dialogConfig.width="650px";
  dialogConfig.data = { busId: busId };
  this.dialogs.open(SeatRowsComponent,dialogConfig)
  console.log("root time modal open  ",busId);
  this.router.navigate(['/operator/add-seat-row'], { queryParams: { busId: busId } });

}

}
