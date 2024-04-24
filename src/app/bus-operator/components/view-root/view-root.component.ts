import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { AddStopsComponent } from '../add-stops/add-stops.component';
import { EditRootComponent } from '../edit-root/edit-root.component';

@Component({
  selector: 'app-view-root',
  templateUrl: './view-root.component.html',
  styleUrls: ['./view-root.component.css']
})
export class ViewRootComponent {

  
  
driverBus: any;
 busId:string="";
// busManage: any;

  constructor(private driverService : DriverServiceService,
              private jwtService : JwtServiceService,
              private ngxService: NgxUiLoaderService,
              private dialogs:MatDialog,
            //  private dialog: MatDialogRef<AddStopsComponent>,
              private route : ActivatedRoute,
              private router : Router){
                
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.busId = params['busId'];
     console.log("bus id in view root  0 0 0",this.busId);
     
      this.getBusRootAndTime(this.busId);
    });

    this.driverService.getBusRootAndTime  (this.busId);
  }

  HeadingArray = [
    { Head: 'Source Location', bodyKey: 'sourceLocation' },
    { Head: 'Destination Location', bodyKey: 'destinationLocation' },
    { Head: 'Departure Time', bodyKey: 'departureTime' },
    { Head: 'Arrival Time', bodyKey: 'arrivalTime' },
    { Head: 'Departure Date', bodyKey: 'departureDate' },
    { Head: 'Arrival Date', bodyKey: 'arrivalDate' },
    { Head: 'Total Hour', bodyKey: 'totalHour' },
    { Head: 'Type', bodyKey: 'rootType' },
    { Head: 'Perday Trip', bodyKey: 'perdayTrip' },
    { Head: 'Edit', bodyKey: 'editRoot' },
    // { Head: 'Add Stop ', bodyKey: 'addStop' },
    // { Head: 'View Stops', bodyKey: 'viewStop' },
  ]


  getBusRootAndTime(busId: string): void {
    this.driverService.getBusRootAndTime(busId).subscribe(
      response => {
        console.log(response);
        this.driverBus = response; 
        console.log(" Bus root  "+ this.driverBus );
      },
      error => {
        console.error('Error fetching bus root and time:', error);
      }
    );
  }




  addStops(routeId: string) {
    console.log("add stop uuid  0 0 0 ", routeId);
    this.openStopsModal(routeId);
 }
 openStopsModal(routeId: string | null) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "650px";
  dialogConfig.data = { routeId: routeId };
  console.log("stop modal open ", routeId);
  const dialogRef = this.dialogs.open(AddStopsComponent, dialogConfig);
}

  viewStops(busId: Event) {
    console.log("view stops  bus uuid" , busId);
    this.router.navigate(['/operator/view-'], { queryParams: { busId: busId } });

  }

  editRoot(rootId:string) {
    console.log("Edit event  ",rootId);
  
   const busdata = this.driverBus.filter((each: { uuid: string; }) => each.uuid === rootId );
   console.log("exsisting data root ",rootId);
  
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="650px";
    dialogConfig.data = { routeData: busdata[0] };
    console.log("BUS Data for edit ",busdata);
    
    this.dialogs.open(EditRootComponent,dialogConfig)
  
    const dialogRef: MatDialogRef<EditRootComponent> = this.dialogs.open(EditRootComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      // Perform page reload here
      location.reload();
    });
    
    }
}
