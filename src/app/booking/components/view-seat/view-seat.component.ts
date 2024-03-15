import { Component, ViewChild } from '@angular/core';
import { MatSnackBar,MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce } from 'rxjs';
import { LoginComponent } from 'src/app/authentication/components/login/login.component';
import { BusResponse } from 'src/app/core/interface/bus-response';
import { BookingServiceService } from 'src/app/service/booking-service.service';

@Component({
  selector: 'app-view-seat',
  templateUrl: './view-seat.component.html',
  styleUrls: ['./view-seat.component.css']
})
export class ViewSeatComponent {

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


  constructor(private route: ActivatedRoute, private bookingService: BookingServiceService, private router: Router,private matSnackBar : MatSnackBar) { }
   
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
        
      //   for (let i = 0; i < response.totalSeats; i++) {
      //     if (i < response.upperSeat) {
      //         this.upperSeatsList.push({ seatNumber: i + 1 });
      //         if (this.bookedSeatsList.includes(i)) {
      //           this.upperSeatsList.push({ selected: true });
      //         }else{
      //           this.upperSeatsList.push({ booked: false });
      //         }
      //     } else {
      //         this.lowerSeatsList.push({ seatNumber: i + 1});
      //         if (this.bookedSeatsList.includes(i)) {
      //           this.lowerSeatsList.push({ selected: true })
      //         }else{
      //           this.lowerSeatsList.push({ booked: false })
      //         }
      //     }
      // }

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

  // bookSeat (seatNumber : number){
 

    // if (this.lowerSeatsList.length >= 4) {
    
    //   const errors :string ="You cannot select more than 4 seats. in Lower Deck ";
      
    //   this.openCustomSnackBar(errors)
  
    //   return;
    // }else if(this.upperSeatsList.length >= 4){
    //   const errors :string ="You cannot select more than 4 seats. in upperDeck";
      
    //   this.openCustomSnackBar(errors)
    // }
//     if(seatNumber<this.lowerSeatCount){

//           if(this.bookedSeatsList.includes(seatNumber)) return;

//           let check = this.upperSeatsList[seatNumber]

//           if(check.booked){
//             console.log("if");
            
//           this.upperSeatsList[seatNumber] = {booked : false}
//           const seatIndexToDelete=this.upperSeatsList.findIndex((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
//           this.selectedSeatsLists.splice(seatIndexToDelete);
//           console.log("deleted ",this.selectedSeatsLists);
//           this.selectedSeatsCount=this.selectedSeatsLists.length;

//           return;
//           }else{
//           this.upperSeatsList[seatNumber] = {booked : true}
//           }
//           const isDataExists=this.selectedSeatsLists.find((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
//           if(isDataExists==undefined){
//             this.selectedSeatsLists.push(seatNumber)
//             console.log("Added ",this.selectedSeatsLists);}
//             this.selectedSeatsCount=this.selectedSeatsLists.length;
//           }else{

//             console.log("else");

//             if(this.bookedSeatsList.includes(seatNumber)) return;
            
   
//           let checking = this.lowerSeatsList[seatNumber]

//               if(checking.booked){
//               this.lowerSeatsList[seatNumber] = {booked : false}
//               const seatIndexToDelete=this.lowerSeatsList.findIndex((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
//               this.selectedSeatsListes.splice(seatIndexToDelete);
//               console.log("delete ",this.selectedSeatsListes);
//               this.selectedSeatsCount=this.selectedSeatsListes.length;

//               return;
//               }else{
//               this.lowerSeatsList[seatNumber] = {booked : true}
//               }

//               const isDataExist=this.selectedSeatsListes.find((data: { seatNumber: number; }) => data .seatNumber===seatNumber);
//               if(isDataExist==undefined){
//                 this.selectedSeatsListes.push(seatNumber)
//                 console.log("Added ",this.selectedSeatsListes);}
//                 this.selectedSeatsCount=this.selectedSeatsListes.length;
//            }
// }

  bookSeat (seatNumber : number){
    if (this.selectedSeatsLists.length >= 7) {
    
      const errors :string ="You cannot select more than 7 seats.";
      
      this.openCustomSnackBar(errors)
  
      return;
    }
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

}















// new

// ngOnInit() {
//   this.route.queryParams.subscribe(params => {
//     this.busId = params['busId'];
//     this.bookingService.updatedSeatAfterBooking(this.busId).subscribe((response: number[]) => {
//       this.bookedSeatsList = response;
//       this.fetchBusDetails();
//     }, (error) => {
//       console.log("Error fetching updated seat after booking: ", error);
//     })
//   });
// }

// fetchBusDetails(): void {
//   this.bookingService.getBusById(this.busId).subscribe((response: any) => {
//     this.busDetails = response;
//     this.busfare = response.fare;

//     for (let i = 0; i < response.totalSeats; i++) {
//       if (this.bookedSeatsList.includes(i)) {
//         this.selectedSeatsList.push({ selected: true });
//       } else {
//         this.selectedSeatsList.push({ booked: false });
//       }
//     }

//     for (let i = 0; i < response.upperSeat; i++) {
//       if (this.bookedSeatsList.includes(i)) {
//         this.upperSeatList.push({ selected: true });
//       } else {
//         this.upperSeatList.push({ booked: false });
//       }
//     }

//     for (let i = response.upperSeat; i < response.totalSeats; i++) {
//       if (this.bookedSeatsList.includes(i)) {
//         this.lowerSeatList.push({ selected: true });
//       } else {
//         this.lowerSeatList.push({ booked: false });
//       }
//     }
//   }, (error) => {
//     console.log("Error fetching bus details: ", error);
//   });
// }
