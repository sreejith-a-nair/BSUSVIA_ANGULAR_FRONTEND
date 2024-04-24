import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceService } from 'src/app/service/booking-service.service';
 import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {

  userForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedSeats: string="";

  selectedSeatIndex: number = 0;
  actualSeatNumber: number = 0;

  totalFare: number=0;
  busId: string="";
  totalSeats!: number;
  fare!: number;
  busMoreDetails:any[]=[];
  departuredate:any;
  arrivaldate:any;
  departureTime:any;
  arrivalTime:any;
  from:any;
  to:any;
  totalHours:any;
  busNumber:any;
  email:any;
  category:any;
  busName:any;
  busType:any;
  authorityEmail:string='';

  selectedSeatsLists: number[] = [];



    constructor(private router: Router,private route: ActivatedRoute,private bookingService:BookingServiceService,private fb: FormBuilder ,private snackBar :MatSnackBar) { }

    ngOnInit(): void {

    
      this.route.queryParams.subscribe(params => {
        this.selectedSeats = params['selectedSeats'] ?? '';
        this.selectedSeatsLists = (params['selectedSeats'] || '').split(',').map((seat: string) => +seat);
        this.selectedSeatIndex= +params['selectedSeats'] ?? 0;
        this.totalFare = +params['totalFare'] ?? 0;
        this.busId = params['busId'] ?? '';
        this.busNumber=params['busNumber']??'';
        this.totalSeats = +params['totalSeats'] ?? 0;
        this.fare = +params['fare'] ?? 0;
        this.authorityEmail = params['authorityEmail'] ?? ''; 
      });
      console.log("Authority email &&&",this.authorityEmail);
      
    this.actualSeatNumber=this.selectedSeatIndex+1;
    this.userForm = this.fb.group({
      // Initial form controls go here
      passengerName0: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,}')]],
      passengerAge0: ['', [Validators.required, this.ageValidator()]],
      passengerGender0: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, this.phoneNumberValidator()]]
  });

  for (let i = 1; i < this.getSeatsArray().length; i++) {
      this.addPassengerControl(i);
  }

    this.bookingService.getBusRouteById(this.busId).subscribe((response: any) => {

     this.busMoreDetails=response;

     this.arrivaldate=response.arrivalDate;
     this.departuredate=response.departureDate;
     this.departureTime=response.departureTime;
     this.arrivalTime=response.arrivalTime;
     this.from=response.sourceLocation;
     this.to=response.destinationLocation;
     this.totalHours=response.totalHour;
     this.busName=response.busInfo.busName;
     this.busNumber=response.busInfo.busNumber;
     this.category=response.busInfo.category;
     this.busType=response.busInfo.busType;
     this.email=response.busInfo.email;
     this.authorityEmail=this.authorityEmail;

     console.log("Bus full data by id ",this.busMoreDetails);
     console.log("Bus email authority ",this.authorityEmail);
     
    }, (error) => {
      console.log("RESPONSE  ", error);
    });
  
  }
  // new 
  addPassengerControl(index: number): void {
    const controls = this.userForm.controls;
    controls[`passengerName${index}`] = this.fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]{4,}')]);
    controls[`passengerAge${index}`] = this.fb.control('', [Validators.required, this.ageValidator()]);
    controls[`passengerGender${index}`] = this.fb.control('', Validators.required);
}


// end
  getSeatsArray(): number[] {
    return Array.from({ length: this.totalSeats }, (_, i) => i);
}

   phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumberRegex = /^\d{10}$/;
  
      if (!phoneNumberRegex.test(control.value)) {
        return { 'invalidPhoneNumber': true };
      }
      return null;
    };
  }
  ageValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const age = control.value;
      if (isNaN(age) || age < 11) {
        return { 'invalidAge': true };
      }
      return null;
    };
  }

    submitForm(): void {
      if (this.userForm.valid) {
          const passengers = [];
          const formData = this.userForm.value;
          const selectedSeatsArray = this.selectedSeats.split(',').map(Number); 
  
          
          for (let i = 0; i < this.getSeatsArray().length; i++) {
            const seatNumber = selectedSeatsArray[i];
              passengers.push({
                  name: formData[`passengerName${i}`],
                  age: formData[`passengerAge${i}`],
                  gender: formData[`passengerGender${i}`],
                  seatNumber: seatNumber 
              });
            
          }

        const queryParams = {
            selectedSeats: this.selectedSeats,
            totalFare: this.totalFare,
            busId: this.busId,
            totalSeats: this.totalSeats,
            fare: this.fare,
            passengers: JSON.stringify(passengers),
            email: formData.email,
            contact: formData.phone,
            arrivaldate: this.arrivaldate,
            departuredate: this.departuredate,
            arrivalTime: this.arrivalTime,
            departureTime: this.departureTime,
            from: this.from,
            to: this.to,
            busNo: this.busNumber,
            busName: this.busName,
            busType: this.busType,
            category: this.category,
            authorityEmail:this.authorityEmail
        };
        console.log("Quesry paar in payment details ",this.authorityEmail);
        

        console.log("PASSENGER LIST", passengers);
        this.openError("successfully booked");
        this.router.navigate(['/booking/pay-book'], { queryParams: queryParams });
        
    }
}


  openError(message:string){
    this.snackBar.open(message, 'Close', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
          
        });
  }
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
