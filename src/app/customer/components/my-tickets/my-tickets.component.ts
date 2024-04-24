import { Component, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingAllResponse } from 'src/app/core/interface/bookingAllRes.mode';
import { UpdateWalletRequest } from 'src/app/core/interface/walletReq.model';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { DialogsServiceService } from 'src/app/service/dialogs-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { AddRatingComponent } from '../add-rating/add-rating.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent {


  pdfSrc: SafeResourceUrl | undefined;

  // totalFare: number = 0;
  total!: number;
  userMail : string|null="";

  WalletInfo:any;
  confirmationResult: boolean | undefined;

  busId:any;
  busName:any;
  category:any;
  busMail:any;
  bookingDate:any;
  depatureTime:any;
  arrivalTime:any;
  bookingId:any
  cashAdded: boolean = false;

  bookingLists:any[]=[];

  busData:any []=[];

  bookingDetails: BookingAllResponse [] =[];
  
  constructor(private route: ActivatedRoute,
    private bookingService : BookingServiceService,
    private userService:UserServiceService,
    private authorityService : AuthorityServiceService,
    private jwtService : JwtServiceService,
    private snackBar : MatSnackBar,
    private dialog: MatDialog,
    private router : Router,
    private injector :Injector,
    private toastr:TosterService,
    private dialogService : DialogsServiceService,
    private sanitizer: DomSanitizer) { }

ngOnInit(): void {

  this.userMail =this.jwtService.extractEmail();
  console.log("User mail : ",this.userMail);



  this.route.queryParams.subscribe(params => {
    const totalFare = Number(params['totalFare']);
    this.jwtService.addToTotal(totalFare);
   
  });
  
  if (this.userMail) {



    this.bookingService.findBookingByEmail(this.userMail).subscribe(responses => {
      this.bookingDetails = responses;
      if(Array.isArray(this.bookingDetails) && this.bookingDetails.length > 0){
        console.log("Booking details: * ", this.bookingDetails);

      // Iterate through all received booking objects and perform any necessary operations
          for (const booking of responses) {
            this.getBusByIds(booking.busId);
          }  

      }else{
        console.log("get length 0 booking error");
        this.router.navigate(['/customer/ticke-error'])
      }
      
      
  },error=>{
    console.log("gat booking error");
    this.router.navigate(['/customer/ticke-error'])
    
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

  cancelBooking(bookingId:string,selectedSeats: number,busId:string){
    console.log("cancel utton work  canceled seat count > ",selectedSeats);
    this.dialogService.openConfirmDialog("Are you sure to cancel Booking" )
    .afterClosed().subscribe(res=>{
      console.log("Response yes or no",res);

       if(res){
          this.bookingService.cancelBookingthis(bookingId).subscribe(res=>{
            console.log("user deleted successfully");
           location.reload();
           this.updateAvailableSeatAfterCancel(busId,selectedSeats)

          })
       }
    })
    

  }
  updateAvailableSeatAfterCancel(busId:string,selectedSeats:number){
    console.log("updateAvailableSeatAfterCancel work ",busId, "  ",selectedSeats);
    

    this.bookingService.updateAvailableSeatAfterCancel(busId,selectedSeats).subscribe(response=>{
      console.log("success canceld available seat updated" ,response);
      
    },err=>{
      console.log("failed to update" ,err);
    });

  }

  addToWallet(bookingId: string, totalFare: number) {

    this.dialogService.openConfirmDialog("Are you sure to Refund cash move to  Wallet " )
    .afterClosed().subscribe(res=>{

      if(res){
        this.confirmationResult = res ;

        const email:any=   this.jwtService.extractEmail();
        const request: UpdateWalletRequest = {
          totalFare: totalFare,
          email: email,
          bookingId: bookingId
        };
        console.log("email  myticket ",email);
        console.log("request myticket ) 0000  ",request);
        this.userService. updateWalletAndRetrieve(request).subscribe(
          (response: any) => {
            console.log('Updated wallet:', response);
            this.WalletInfo=response;
            console.log("wallet info ",this.WalletInfo);
            this.toastr.success("Refund amount successfuly added in your wallet ")
            this.router.navigate(['/customer/userWallet'])
            
          },
          (error: any) => {
            console.error('Error updating wallet:', error);
            this.toastr.failed("Refund amount already added in your wallet ")
           
          }
        );


        
      }

    })
  
  // addToWallet(bookingId: string, totalFare: number) {

  //   this.dialogService.openConfirmDialog("Are you sure to Refund cash move to  Wallet " )
  //   .afterClosed().subscribe(res=>{

  //     if(res){
  //       this.router.navigate(['/customer/userWallet'], {
  //         queryParams: { bookingId, totalFare }
  //       });
  //     }

  //   })


    // if (!this.cashAdded) {
    //   // If cash hasn't been added yet
    //   console.log("cash added 1", this.cashAdded);
    //   this.cashAdded = true; // Mark cash as added
    //   console.log("cash added 1", this.cashAdded);
    //   this.total = totalFare; 
      
    //   this.router.navigate(['/customer/userWallet'], {
    //     queryParams: { bookingId, totalFare }
    //   });
    // } else {
   
    //   this.router.navigate(['/customer/userWallet']);
    // }
  }

  showWallet() {
    console.log("show wallet work ");
    
    this.router.navigate(['/customer/userWallet'])
    }


    showChat(busId: string,authorityEmail: string) {
      console.log("bus id : ",busId);
      console.log("authority email : ",authorityEmail);
      
      // this.router.navigate(['/communication/chat'])
      this.router.navigate(['/communication/chat'], { queryParams: { busId, authorityEmail } });

      
      }

      // showRating(arg0: string,arg1: any) {
      //   console.log(arg0,arg1);
      //   this.router.navigate(['/customer/add-rating']) 
      //   }
        showRating(busId: string,bookingId: any) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = "670px";

          dialogConfig.data = { busId: busId, bookingId: bookingId };
      
          // Open the dialog
          const dialogRef = this.dialog.open(AddRatingComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(result => {
            location.reload()
          });
        }

        downloadBookingPdf(bookingId:string) {
          // temporary
          // const bookingIds = “dc25b6a5d8124fceb23bd7ae3f3d8d6”;
          
          this.bookingService.bookingInvoicePdf(bookingId).subscribe(
            (response: ArrayBuffer) => {
              this.pdfSrc = response;
              const blob = new Blob([response], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);
      
              const link = document.createElement('a');
              link.href = url;
              link.download = 'BookingInvoice.pdf';
              link.click();
      
              this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            },
            error => {
              console.error('Error downloading PDF:', error);
            }
          );
        }
        

        // ticketSendToMail(bookingId: string) {
        //  console.log("Booking Id ",bookingId);

        //       this.bookingService.sendTicketToEmail(bookingId).subscribe(res=>{
        //         console.log("Booking details ",res);
                
        //       },err=>{
        //         console.log("Booking details error ");

        //       })
              
        //   }
          ticketSendToMail(bookingId: string) {
            console.log("Booking Id ", bookingId);
            this.bookingService.sendTicketToEmail(bookingId).subscribe(
                (res: any) => {
                    console.log("Booking details ", res);
                    this.toastr.success("email is sent successfully")

                },
                (err: any) => {
                    // console.log("Failed to send ticket email: ", err);
                    // Handle error response here
                    this.toastr.success("email is sent successfully")
                }
            );
        }
          
  
   
}