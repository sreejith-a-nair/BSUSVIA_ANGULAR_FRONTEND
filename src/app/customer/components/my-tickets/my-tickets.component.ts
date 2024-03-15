import { Component, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingAllResponse } from 'src/app/core/interface/bookingAllRes.mode';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { DialogsServiceService } from 'src/app/service/dialogs-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent {


  userMail : string|null="";

  busId:any;
  busName:any;
  category:any;
  busMail:any;
  bookingDate:any;
  depatureTime:any;
  arrivalTime:any;
  bookingId:any

  bookingLists:any[]=[];

  busData:any []=[];

  bookingDetails: BookingAllResponse [] =[];
  
  constructor(private route: ActivatedRoute,
    private bookingService : BookingServiceService,
    private authorityService : AuthorityServiceService,
    private jwtService : JwtServiceService,
    private snackBar : MatSnackBar,
    private router : Router,
    private injector :Injector,
    private dialogService : DialogsServiceService) { }

ngOnInit(): void {

  this.userMail =this.jwtService.extractEmail();
  console.log("User mail : ",this.userMail);

  this.authorityService.getAllBooking().subscribe(bookingList=>{
    console.log("User more data list ",bookingList);   

});
  
  if (this.userMail) {



    this.bookingService.findBookingByEmail(this.userMail).subscribe(responses => {
      this.bookingDetails = responses;
      
      console.log("Booking details: * ", this.bookingDetails);

      // Iterate through all received booking objects and perform any necessary operations
      for (const booking of responses) {
        this.getBusByIds(booking.busId);
      }
    

    // this.bookingService.findBookingByEmail(this.userMail).subscribe( responses =>{
    //   this.bookingDetails = responses;
      
    //   if (responses.length > 0) {
    //     this.getBusByIds(responses[0].busId);
    // }

    // console.log("Booking details : " ,responses);
    
    
  },error=>{
    console.log("gat booking error");
    
  })

  


}

} 
 getBusByIds(busId: any) {
  this.bookingService.getBusById(busId).subscribe(res=>{
     
    this.busData=res;
    this.busMail=res.email;
    this.category=res.category;
    this.busName=res.busName;
    this.depatureTime=res.departureTime;
    this.category=res.arrivalTime;
    this.bookingDate=res.departureDate;


    console.log("bus iddd  success " ,this.busData, "depature and arrival time : ", this.depatureTime ," ",this.arrivalTime);
    },err=>{
      console.log(err);
      
    })
  }

  cancelBooking(bookingId:string){
    console.log("cancel utton work ");
    this.dialogService.openConfirmDialog("Are you sure to cancel Booking" )
    .afterClosed().subscribe(res=>{
      console.log("Response yes or no",res);

       if(res){
          this.bookingService.cancelBookingthis(bookingId).subscribe(res=>{
            console.log("user deleted successfully");
           location.reload();

          })
       }
    })
    

  }

}