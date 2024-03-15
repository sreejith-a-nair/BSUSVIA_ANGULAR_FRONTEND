import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-driver-bus.ts',
  templateUrl: './driver-bus.ts.component.html',
  styleUrls: ['./driver-bus.ts.component.css']
})
export class DriverBusTsComponent {


  driverBus:any= [];
  searchKeyword !: string ;

  constructor(private authorityService: AuthorityServiceService,
              private jwtservice:JwtServiceService,
              private route: ActivatedRoute,
              private router : Router,
              private dialog: MatDialog
              ) {
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['busList']) {
        const busList = JSON.parse(params['busList']);
        console.log('Received bus list:', busList);
        this.driverBus = busList;
        const filteredBusList = {
          uuid: busList.uuid,
          busName: busList.busName,
          busNumber: busList.busNumber,
          busType: busList.busType,
          totalSeats: busList.totalSeats,
          doubleSeatCount: busList.doubleSeatCount,
          thirdRowSeatCount: busList.thirdRowSeatCount,
          email: busList.email
        };
        this.driverBus = [filteredBusList];
        console.log("DRIVER BUS DATA ONLY ",this.driverBus);
        
      }
       
    });
  }
    
  // deleteBusData(busId: string|any) {
  //   console.log("Bus ID   ", busId);

    
  //   this.authorityService.deleteBusById(busId).subscribe(
  //     () => {
  //       console.log("user deleted successfully");
  //       location.reload();
  //     },
  //     (error) => {
  //       console.error('Error deleting user:', error);
  //     }
  //   );
  //   }

 

  HeadingArray = [
    { Head: 'Bus Name', bodyKey: 'busName' },
    { Head: 'Bus Number', bodyKey: 'busNumber' },
    { Head: 'Bus Type', bodyKey: 'busType' },
    // { Head: 'Is Available', bodyKey: 'isAvailable' },
    { Head: 'Total Seats', bodyKey: 'totalSeats' },
    { Head: 'Double Seat Count', bodyKey: 'doubleSeatCount' },
    { Head: 'Third Row Seat Count', bodyKey: 'thirdRowSeatCount' },
    // { Head: 'Email', bodyKey: 'email' }
];








}
