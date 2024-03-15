import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  bookingList: any[] = [];


  
  constructor(private jwtService: JwtServiceService,
              private bookingService : BookingServiceService,
              private authorityService : AuthorityServiceService,
              private router : Router,
              private dialog: MatDialog) {
              this.bookingList = [];

}


HeadingArray = [
  { Head: 'Email', bodyKey: 'email' },
  { Head: 'Contact', bodyKey: 'contact' },
  { Head: 'Booking Date', bodyKey: 'departuredate' },
  { Head: 'From ', bodyKey: 'fromLocations' },
  { Head: 'To ', bodyKey: 'toLocations' },
  { Head: 'Bus Number', bodyKey: 'busNumber' },
  { Head: 'Total Fare', bodyKey: 'totalFare' },
  { Head: 'Status', bodyKey: 'status' },


];
                 
  ngOnInit(): void {
  
   this.authorityService.getAllBooking().subscribe(bookingList=>{
                    console.log("User more data list ",bookingList);              
     this.bookingList=bookingList;
        
  });
                  
 }

}
