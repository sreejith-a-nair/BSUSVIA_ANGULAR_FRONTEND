import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { BookingServiceService } from 'src/app/service/booking-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';

@Component({
  selector: 'app-offline-view-seat',
  templateUrl: './offline-view-seat.component.html',
  styleUrls: ['./offline-view-seat.component.css']
})
export class OfflineViewSeatComponent {


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild('customSnackBarTemplate') customSnackBarTemplate: any;
  message: string = "";

  hoveredIndex: number | null = null;
  busId: any;
  busName: any = '';
  busDetails: BusResponse[] = [];
  selectedSeatsList : any = []
  selectedSeatsLists : any = []
  selectedSeatsListes : any = []
  bookedSeatsList : number[] = []
  busfare:any ;
  selectedSeatsCount:number=0;


  // mew
  upperSeatsList:any =[];
  lowerSeatsList: any=[];
  upperSeatCount:number=0;
  lowerSeatCount:number=0;


  constructor(private route: ActivatedRoute, private bookingService: BookingServiceService, private router: Router,private matSnackBar : MatSnackBar,private jwtService:JwtServiceService,private toster :TosterService) { }
   
    ngOnInit() {

      console.log("BookedSeatList initially  ",this.bookedSeatsList);

      this.route.queryParams.subscribe(params => {
        this.busId = params['busId'];
        console.log("BUS ID I VIEW SEATS ", this.busId);

        this.bookingService.updatedSeatAfterBooking(this.busId).subscribe((response: number[])=>{
          console.log(response);
          for (let i = 0; i < response.length; i++) {
            console.log("res  I : ",response[i]);
            this.bookedSeatsList.push(response[i]);
          }
       ;
        console.log("BookedSeatList 1",this.bookedSeatsList);
        this.fetchBusDetails();
        
      },(error)=>{
        console.log("error occured boosetSeatAvailability");
        
      })

      this.bookingService.updateSeatsAfterBlockSeat(this.busId).subscribe((response: number[])=>{
        console.log(response);
        for (let i = 0; i < response.length; i++) {
          console.log("res  I : ",response[i]);
          this.bookedSeatsList.push(response[i]);
        }
     ;
      console.log("BookedSeatList 1",this.bookedSeatsList);
     
    },(error)=>{
      console.log("error occured boosetSeatAvailability");
      
    })
      
      
    });
  }
  
  fetchBusDetails(): void {
   
  
    this.bookingService.getBusById(this.busId).subscribe((response: any) => {
        this.busDetails = response;
        this.busfare = response.fare;

        this.upperSeatCount=response.upperSeat
        this.lowerSeatCount=response.lowerSeat
        console.log("upperSeat : ",response.upperSeat );
        console.log("lowerseat : ", response.lowerSeat);
        

        for (let i = 0; i < response.totalSeats; i++) {
          if (i < response.upperSeat) { 
            console.log(i);
          console.log("upper seat"+response.upperSeat);
              if (this.bookedSeatsList.includes(i)) {
                  console.log("BookedSeatList includes total seats index", this.bookedSeatsList);
                  this.selectedSeatsList.push({ selected: true });
              } else {
                  console.log("BookedSeatList Not includes total seats index", this.bookedSeatsList);
                  this.selectedSeatsList.push({ booked: false });
              }
          } else {
            console.log(i);
            console.log("lower seat"+response.upperSeat);
              if (this.bookedSeatsList.includes(i)) {
                  console.log("BookedSeatList includes total seats index", this.bookedSeatsList);
                  this.selectedSeatsList.push({ selected: true });
              } else {
                  console.log("BookedSeatList Not includes total seats index", this.bookedSeatsList);
                  this.selectedSeatsList.push({ booked: false });
              }
          }
      }

    }, (error) => {
        console.log("Error fetching bus details: ", error);
    });
}



// end
  openCustomSnackBar(messages:string) {
    this.message=messages;
    let snackBarRef: MatSnackBarRef<any> = this.matSnackBar.openFromTemplate(this.customSnackBarTemplate, {
      duration: 4000 
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log(this.message);
    });
  }
  dismiss() {
    this.matSnackBar.dismiss();
  }


  bookSeat (seatNumber : number){
    // if (this.selectedSeatsLists.length >= 7) {
    
    //   const errors :string ="You cannot select more than 7 seats.";
      
    //   this.openCustomSnackBar(errors)
  
    //   return;
    // }
      if(this.bookedSeatsList.includes(seatNumber)) return;

      let check = this.selectedSeatsList[seatNumber]
      if(check.booked){
      this.selectedSeatsList[seatNumber] = {booked : false}
      const seatIndexToDelete=this.selectedSeatsLists.findIndex((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
      this.selectedSeatsLists.splice(seatIndexToDelete);
      console.log("deleted ",this.selectedSeatsLists);
      this.selectedSeatsCount=this.selectedSeatsLists.length;

      return;
      }else{
      this.selectedSeatsList[seatNumber] = {booked : true}
      }
      const isDataExist=this.selectedSeatsLists.find((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
      if(isDataExist==undefined){
        this.selectedSeatsLists.push(seatNumber)
        console.log("Added ",this.selectedSeatsLists);}
        this.selectedSeatsCount=this.selectedSeatsLists.length;
  }

  
  showIndex(index: number): void {
      this.hoveredIndex = index;
  }

  hideIndex(): void {
      this.hoveredIndex = null;
  }

  getSeatNumber(totalSeats:number):number[]{
   
    let seatsArray=[];
    for (let index = 1; index <= totalSeats; index++) {
          seatsArray.push(index);
      
    }
    return seatsArray;
  }
  navigateToPayment() {
   
    if (this.selectedSeatsCount > 0) {
    
      const selectedSeats = this.selectedSeatsLists.join(',');
      const totalFare = this.selectedSeatsCount * this.busfare;
      const totalSeats=this.selectedSeatsCount;
      const fare=this.busfare;

      this.router.navigate(['/booking/payment-details'], { queryParams: { selectedSeats, totalFare, busId: this.busId, totalSeats, fare } });
    }
  }



  blockSeat(){
    console.log("Selected seat numbers",this.selectedSeatsLists );
    
   const seatCount:number=this.selectedSeatsLists.length; 

    const blockDetails = {
      busId: this.busId,
      selectedSeats: this.selectedSeatsLists ,
    };
    const userMail =this.jwtService.extractEmail();
    // const bookedSeatCount:number=this.selectedSeatsLists.length; 
    // console.log("count of booked seat ",bookedSeatCount);
      
      this.bookingService.blockSeat( this.busId,userMail,blockDetails).subscribe(
        (response: any) => {
          console.log("Success adding booking data", response);
          const bookingId = response.uuid;

          this.toster.success("Block Seat successfull");
          window.location.reload();
          // const bookedSeatCount:number=response.selectedSeats;
          const bookedSeatCount:number=this.selectedSeatsLists.length; 
          console.log("coumt of booked seat ",bookedSeatCount);
          
          console.log("bookedSeatCount :", bookedSeatCount);
          this.updateAvailableSeatAfterBooking(this.busId,bookedSeatCount)

          // if (bookingId) {
            
          //   this.router.navigate(['/booking/booking-success'], { queryParams: { bookingId: bookingId } });
          // } else {
          //   console.error("Booking ID not found in response");
           
          // }
        },
        (error: any) => {
          console.error("Error adding booking data", error);
         
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
}
