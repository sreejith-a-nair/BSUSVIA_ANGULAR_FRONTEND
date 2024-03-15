import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { from } from 'rxjs';
// import { BusRouteAndTimeComponent } from 'src/app/authority/components/bus-route-and-time/bus-route-and-time.component';
import { dateConverter } from 'src/app/core/utils/dateConverter';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { TimePeriod } from '../enum/timePeriod.enum';

@Component({
  selector: 'app-add-root',
  templateUrl: './add-root.component.html',
  styleUrls: ['./add-root.component.css']
})
export class AddRootComponent {

  
  addRouteTimeForm!: FormGroup;
  responseMessage: any;
  busId:string |null=" ";
   picker: any; 

calculatedDuration: string | undefined;

departurePeriods=Object.values(TimePeriod);
arrivalPeriods=Object.values(TimePeriod);


  constructor(private formBuilder: FormBuilder,
              private authorityService: AuthorityServiceService,
              private dialog: MatDialogRef<AddRootComponent>,
              private ngxService: NgxUiLoaderService,
              private router : Router,
              private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any ) { 
                this.busId = data.busId;
                
                }

  ngOnInit(): void {


    this.addRouteTimeForm = this.formBuilder.group({
      sourceLocation: ['', Validators.required],
      destinationLocation: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      totalHour: ['', Validators.required],
      perdayTrip: ['', Validators.required],
      departurePeriod: ['', Validators.required],
      arrivalPeriod: ['', Validators.required],

    });

  }

  handleAddRouteTimeSubmits() {
 
    this.ngxService.start();
    const formData = this.addRouteTimeForm.value;

      const rootTimeData: any = {
        sourceLocation: formData.sourceLocation,
        destinationLocation: formData.destinationLocation,
        departureDate:formData.departureDate,
        arrivalDate: formData.arrivalDate,
        totalHour: formData.totalHour,
        perdayTrip: formData.perdayTrip,
        departureTime:`${formData.departureTime} ${formData.departurePeriod}`,
        arrivalTime:`${formData.arrivalTime} ${formData.arrivalPeriod}`,
        departurePeriod:formData.departurePeriod
        
      };
    console.log("departure dete in addroot bus ",rootTimeData.departureDate);
    
  
    this.authorityService.addRouteAndTimeByDriver(rootTimeData,this.busId).subscribe((response: any) => {
      this.ngxService.stop();
      
      this.responseMessage = response?.message;
      this.dialog.close();
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = 'An error occurred.';
      }
    });
  

}


calculateDuration() {

  const formData = this.addRouteTimeForm.value;

  const departureTimeParts = formData.departureTime.split(':');
  let departureHours = parseInt(departureTimeParts[0], 10);

  const departureMinutes = parseInt(departureTimeParts[1], 10);

  
  if (formData.departurePeriod === 'PM' && departureHours !== 12) {
    departureHours += 12;
  } else if (formData.departurePeriod === 'AM' && departureHours === 12) {
    departureHours = 0;
  }

  const arrivalTimeParts = formData.arrivalTime.split(':');
  let arrivalHours = parseInt(arrivalTimeParts[0], 10);
  const arrivalMinutes = parseInt(arrivalTimeParts[1], 10);


  if (formData.arrivalPeriod === 'PM' && arrivalHours !== 12) {
    arrivalHours += 12;
  } else if (formData.arrivalPeriod === 'AM' && arrivalHours === 12) {
    arrivalHours = 0;
  }

  let departureTotalMinutes = departureHours * 60 + departureMinutes;
  let arrivalTotalMinutes = arrivalHours * 60 + arrivalMinutes;

  if (arrivalTotalMinutes < departureTotalMinutes) {
    arrivalTotalMinutes += 24 * 60; 
  }

  let durationMinutes = arrivalTotalMinutes - departureTotalMinutes;

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  console.log(hours);
  console.log(minutes);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  this.addRouteTimeForm.patchValue({
    totalHour: `${hours}:${formattedMinutes}` 
  });
}

}