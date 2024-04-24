import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { BookingServiceService } from 'src/app/service/booking-service.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit{


  constructor(private bookingService  : BookingServiceService,@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddRatingComponent>,){}

  busId:string='';
  bookingId:string='';
  ngOnInit(): void {
    this. busId = this.data.busId;
    this. bookingId = this.data.bookingId;
    console.log("bus id ",this.busId);
    console.log("bookingId id ",this.bookingId);
    
   
  }
  ratingcount=0;
  totalRating=0
  finalRating:any;

  ratingcontrol=new FormControl(0);

  getRating() {
    this.ratingcount++;
    this.totalRating= this.ratingcontrol.value||0;
    this.finalRating=(this.totalRating/this.ratingcount).toFixed(2)
    console.log("Rating value ",this.ratingcontrol.value);
   
    }

    submitRaing() {
      this.bookingService.addRating(this.totalRating,this.bookingId,this.busId).subscribe(res=>{
       console.log(res);
       this.dialogRef.close();
       
      },err=>{
        console.log("Erorr ");
        
      })
      }
      
}
