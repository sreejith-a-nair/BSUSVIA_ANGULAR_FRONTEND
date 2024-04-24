import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { DriverServiceService } from 'src/app/service/driver-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-reserved-user-list',
  templateUrl: './reserved-user-list.component.html',
  styleUrls: ['./reserved-user-list.component.css']
})
export class ReservedUserListComponent {

  driverBus: BusResponse[] = [];
  bookedPassengers:any []=[];
  


  constructor(private driverService : DriverServiceService,
    private jwtService : JwtServiceService,
    private ngxService: NgxUiLoaderService,
    private bookingService:BookingServiceService,
    // private dialog: MatDialogRef<RootTimeComponent>,
    private dialogs:MatDialog,
    private router : Router){
    
}

ngOnInit(): void {
  const driverMail = this.jwtService.extractEmail();
  this.driverService.getBusByDriverEmail  (driverMail).subscribe(
    response => {
      console.log(response);
      this.driverBus=response;
      if (this.driverBus.length > 0) {
        const busId = this.driverBus[0].uuid; 
        console.log('UUID:', busId);
        this.findBookingByBusId(busId);
      }
      console.log("Driver bus in bookedUser list ", this.driverBus );
     
        
    },
    err => {
      console.error("Error fetching bus:", err);
    }
  );
}
  findBookingByBusId(busId: string) {
    this.bookingService.getBookingByBusId(busId).subscribe(res=>{
      console.log("Booking data : ",res);
      // this.bookedPassengers=res;
      
      this.bookedPassengers = res
      .map(booking =>
        booking.passengers
          .filter(passenger => passenger.seatNumber >= 0) 
          .map(passenger => ({
            ...passenger,
            seatNumber: passenger.seatNumber + 1,
            bookingDate: booking.bookingDate,
            contact: booking.contact
          }))
      )
      .flat();

    })
  }

  HeadingArray = [
    { Head: 'UserName', bodyKey: 'name' },
    { Head: 'Gender', bodyKey: 'gender' },
    { Head: 'Age', bodyKey: 'age' },
    { Head: ' Seat NO', bodyKey: 'seatNumber' },
    { Head: 'Contact', bodyKey: 'contact' },
    { Head: 'Booking Date ', bodyKey: 'bookingDate' },
  ]

}
