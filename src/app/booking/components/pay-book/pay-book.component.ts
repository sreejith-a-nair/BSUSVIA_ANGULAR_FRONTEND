import { Component, Injector, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import * as Razorpay from 'razorpay';
import { BookingRequest } from 'src/app/core/interface/bookingRequest.mode';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

declare var Razorpay:any;

@Component({
  selector: 'app-pay-book',
  templateUrl: './pay-book.component.html',
  styleUrls: ['./pay-book.component.css']
})
export class PayBookComponent {

  selectedSeats: string = '';
  totalFare: number = 0;
  busId: string = '';
  totalSeats: number = 0;
  fare: number = 0;
  arrivaldate: string = '';
  departuredate: string = ''; 
  arrivalTime: string = ''; 
  departureTime: string = ''; 
  from: string = ''; 
  to: string = '';
  busNumber: string = ''; 
  busName: string = '';
  busType: string = ''; 
  category: string = '';
  contact:string='';
  email:string='';
  passengers: any[] = [];
 
  userMail : string |undefined|null

  constructor(private route: ActivatedRoute,
              private bookingService : BookingServiceService,
              private snackBar : MatSnackBar,
              private router : Router,
              private injector :Injector,
              private jwtservice : JwtServiceService) { }

  ngOnInit(): void {
 
    
    this.route.queryParams.subscribe(params => {
     console.log("params ata ",params);

     const passengersString = params['passengers']; 
     const passengers = JSON.parse(passengersString);
     this.passengers=passengers;

      this.selectedSeats = params['selectedSeats'] ?? '';
      this.totalFare = +params['totalFare'] ?? 0;
      this.busId = params['busId'] ?? '';
      this.totalSeats = +params['totalSeats'] ?? 0;
      this.fare = +params['fare'] ?? 0;
      this.email = params['email'] ?? '';
      this.contact = params['contact'] ?? '';
      this.arrivaldate = params['arrivaldate'] ?? ''; 
      this.departuredate = params['departuredate'] ?? ''; 
      this.arrivalTime = params['arrivalTime'] ?? ''; 
      this.departureTime = params['departureTime'] ?? ''; 
      this.from = params['from'] ?? ''; 
      this.to = params['to'] ?? ''; 
      this.busNumber = params['busNo'] ?? ''; 
      this.busName = params['busName'] ?? '';
      this.busType = params['busType'] ?? '';
      this.category = params['category'] ?? '';
      
    });
   console.log("pasenger data ",this.passengers);
  }

    payBook(){

      const bookingDetails = {
        passengers: this.passengers,
        busId: this.busId,
        totalFare: this.totalFare,
        selectedSeats: this.selectedSeats,
        totalSeats: this.totalSeats,
        fare: this.fare,
        email: this.email,
        contact: this.contact,
        arrivaldate: this.arrivaldate,
        departuredate: this.departuredate,
        arrivalTime: this.arrivalTime,
        departureTime: this.departureTime,
        from: this.from,
        to: this.to,
        busNumber: this.busNumber,
        busName: this.busName,
        busType: this.busType,
        category: this.category
      };
      this.bookingService.transaction(bookingDetails.totalFare).subscribe(
        response => {
          console.log("sucess",response);
          if(response!=null){
            this.openSnackBar(' Transaction processing transaction.', 'Close',true);
            this.openTransactionModal(response,bookingDetails);
          }else{
            this.openSnackBar('Error occurred while processing transaction.', 'Close',false);
          }
          
          
        },
        error => {
          console.log("err",error);
          
        }
      );
    }
    openSnackBar(message: string, action: string,isSuccess:boolean) {
      const panelClass = isSuccess ? ['custom-success-snackbar', 'custom-snackbar'] : ['custom-failed-snackbar', 'custom-snackbar'];
      this.snackBar.open(message, action, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: panelClass 
      });
    }

    openTransactionModal(response:any,bookingDetails:BookingRequest){
     var options = {
       order_id: response.orderId,
       key:response.key,
       amount:response.amount,
       currency:response.currency,
       name:'sreejith a nair',
       description:'Hello bus via payment',
       image: 'https://cdn.pixabay.com/photo/2016/11/29/08/44/bus-1868507_1280.jpg',
       handler:(response:any)=>{
         this.processResponse(response,bookingDetails);
       },
       prefill:{
        name:'busvia',
        email:'busvia@gmail.com',
        contact:'908456789'
       },
       notes:{
        address:'Online Booking'
       },
       theme:{
        color: '#1A24D0'
       }
     };

    var razorPayObj= new Razorpay(options);
    razorPayObj.open();
    }

    // processResponse(res:any,bookingDetails:BookingRequest){
    //   console.log(res);
    //   this.bookingService.bookNow(bookingDetails,this.busId).subscribe(response => {
    //     console.log("sucess add booking data ",response);
    //     const bookingId = response.uuid;
    //     console.log("sucess 1 ",bookingId);
    //     const ngZone = this.injector.get(NgZone);
    //     ngZone.run(()=>{

    //       console.log("redirect work" );
    //       // this.router.navigate(['/booking/booking-success', bookingId])
    //       this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId } });

    //     })
       
    // },
    // error => {
    //   console.log("err  not add booking data ",error);
      
    // });
    // }
    processResponse(res: any, bookingDetails: BookingRequest) {
    this.userMail =this.jwtservice.extractEmail();
      console.log(res);
      this.bookingService.bookNow(bookingDetails, this.busId,this.userMail).subscribe(
        (response: any) => {
          console.log("Success adding booking data", response);
          const bookingId = response.uuid;
          // const bookingId = 'dc25b6a5d8124fce82b3bd7a0e3fd8d6';
          // console.log("Booking ID:", bookingId);

          if (bookingId) {
            // Navigate to the booking success component with the bookingId as a query parameter
            this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId } });
          } else {
            console.error("Booking ID not found in response");
            // Handle the case where the booking ID is not available in the response
          }
        },
        (error: any) => {
          console.error("Error adding booking data", error);
          // Handle error response
        }
      );
    }

}
