import { Component, Injector, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
// import * as Razorpay from 'razorpay';
import { BookingRequest } from 'src/app/core/interface/bookingRequest.mode';
import { CouponInfo } from 'src/app/core/interface/couponRequest.model';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { PaymentOption } from '../../payment-enum.enum';
import { UserServiceService } from 'src/app/service/user-service.service';
import { TosterService } from 'src/app/service/toster.service';

declare var Razorpay:any;

@Component({
  selector: 'app-pay-book',
  templateUrl: './pay-book.component.html',
  styleUrls: ['./pay-book.component.css']
})
export class PayBookComponent {


  selectedPaymentOption: PaymentOption = PaymentOption.WalletPayment; // Initialize with default value
  PaymentOption = PaymentOption;
  paymentInProgress: boolean = false;

  couponInfo : CouponInfo[] = [];
  couponApplied: boolean = false;
  userEmail !:string;
  useWalletTotal!:any;

  selectedCouponUuid!: string;

  selectedSeats: string = '';
  totalFare: number = 0;
  orginalPrice:number=0;
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
  authorityEmail:string='';
 
  userMail : string |undefined|null

  constructor(private route: ActivatedRoute,
              private bookingService : BookingServiceService,
              private snackBar : MatSnackBar,
              private router : Router,
              private injector :Injector,
              private jwtservice : JwtServiceService,
              private adminService : AdminServiceService,
              private userService:UserServiceService,
              private toster: TosterService
              ) { }

  ngOnInit(): void {
 
    
    this.route.queryParams.subscribe(params => {
     console.log("params ata ",params);

     const passengersString = params['passengers']; 
     const passengers = JSON.parse(passengersString);
     this.passengers=passengers;

      this.selectedSeats = params['selectedSeats'] ?? '';
      this.totalFare = +params['totalFare'] ?? 0;
      this.orginalPrice = +params['totalFare'] ?? 0;
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
      this.authorityEmail = params['authorityEmail'] ?? '';
      
    });
  
  this. getAllCoupons();

  }
  payBookWithWallet() {
    if (this.paymentInProgress) {
      return;
  }

  const email: any = this.jwtservice.extractEmail();

  this.userService.getWallet(email).subscribe(res => {
    
      this.useWalletTotal = res.totalAmount;
      this.toster.success("Please wait, payment processing...");
      
     
      this.paymentInProgress = true;

      setTimeout(() => {
          this.payNowWallet(this.useWalletTotal);
      }, 3000);
  }, err => {
      this.toster.failed("Sorry! You have no Wallet ");
  });

 
    }


    payNowWallet(walletAmount : any){
    
      if(this.totalFare<walletAmount){

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
          category: this.category,
          authorityEmail: this.authorityEmail,
          paymentMode: this.selectedPaymentOption,
          walletAmount:walletAmount,
          couponApplied:this.couponApplied
    
        };
        this.userMail =this.jwtservice.extractEmail();
        this.bookingService.bookNowWallet(bookingDetails, this.busId,this.userMail).subscribe(
          (response: any) => {
           
            const bookingId = response.uuid;
            const bookedSeatCount:number=response.selectedSeats;
            this.updateAvailableSeatAfterBooking(this.busId,bookedSeatCount)
            this.updateWallet(response)
            
  
            if (bookingId) {
              this.toster.success("Congrats ,Your booking is success ")
              this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId } });
            } else {
              console.error("Booking ID not found in response");
              this.toster.failed("failed to booking try again ,check all credentials")
            }
          },
          (error: any) => {
            console.error("Error adding booking data", error);
            this.toster.failed("failed to booking try again ,check all credentials");
            location.reload()
           
          }
        );

      }else{
        
          this.toster.error("sorry ! insuficent wallet balance ",walletAmount)
      setTimeout(() => {
        location.reload(), 3000})
      }

      
      
      
    }

    updateWallet(bookingInfo :any){
      if(bookingInfo){
       const email :any=this.jwtservice.extractEmail()

        const request={
          bookingId: bookingInfo.uuid,
          email: email,
          totalFare: this.totalFare,

        }
        this.userService.updateWalletAfterBooking(request).subscribe(res=>{

        },err=>{

        })
      }
      

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
        category: this.category,
        authorityEmail: this.authorityEmail,
        paymentMode: this.selectedPaymentOption,
        couponApplied:this.couponApplied

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

    processResponse(res: any, bookingDetails: BookingRequest) {
    this.userMail =this.jwtservice.extractEmail();
      console.log(res);
      this.bookingService.bookNow(bookingDetails, this.busId,this.userMail).subscribe(
        (response: any) => {
          const bookingId = response.uuid;
          const authorityMail = response.authorityMail;

          console.log("Authoriyu mail : ", authorityMail );
          
          const bookedSeatCount:number=response.selectedSeats;
          console.log("bookedSeatCount :", bookedSeatCount);
          this.updateAvailableSeatAfterBooking(this.busId,bookedSeatCount)

          if (bookingId) {
            this.toster.success("Congrats ,Your booking is success ")
            // this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId } });
            this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId, authorityMail: authorityMail } });
          } else {
            console.error("Booking ID not found in response");
            this.toster.failed("failed to booking try again ,check all credentials");
            location.reload()
           
          }
        },
        (error: any) => {
          console.error("Error adding booking data", error);
          this.toster.failed("failed to booking try again ,check all credentials")
          location.reload()
        }
      );
    }

    updateAvailableSeatAfterBooking(busId:string,bookedSeatCount:number){
      console.log("updateAvailableSeatAfterBooking  work  : Id  : ",busId);
      console.log("updateAvailableSeatAfterBooking  work  : bookedSeatCount  : ",bookedSeatCount);
      this.bookingService.updateAvailableSeatAfterBooking(busId,bookedSeatCount).subscribe(
        (response)=>{

        },(error)=>{

        }
      )
      
    }

    getAllCoupons() {
      this.adminService.showAllCoupons().subscribe(response=>{
        console.log("success    ");
        this.couponInfo=response;

      },err=>{
        console.log("errror");
        
    })
    }

    updateTotalFare(val: CouponInfo) {
      console.log("coupon applied ");
      
      }

      applyCoupon(couponUuid: string) {
       
        const selectedCoupon = this.couponInfo.find(val => val.uuid === couponUuid);
        if (selectedCoupon) {
        
          this.adminService.applyCoupon(selectedCoupon, this.totalFare).subscribe(
              res => {
                this.totalFare=res;
                this.couponApplied = true;
              },
              err => {
                  console.error("Error:", err);
                  location.reload()
              }
          );
      } else {
          console.error("Selected coupon not found!");
      }
         
        }

        cancelCoupon() {
          this.couponApplied = false;
          this.totalFare=this.orginalPrice;
      }

      logSelectedOption() {
        console.log('Selected Payment Option:', this.selectedPaymentOption);
      }

}


