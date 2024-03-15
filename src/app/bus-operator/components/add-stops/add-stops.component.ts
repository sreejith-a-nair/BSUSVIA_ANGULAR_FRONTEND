import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { Districts } from '../enum/districts.enum';
import { DriverServiceService } from 'src/app/service/driver-service.service';

@Component({
  selector: 'app-add-stops',
  templateUrl: './add-stops.component.html',
  styleUrls: ['./add-stops.component.css']
})
export class AddStopsComponent {

  // stops: { number: number, selectedDistrict: string ,sequenceNumber?: number }[] = [];
  stops: { number: number; selectedDistrict: string }[] = [];
  DistrictsArray = Object.values(Districts);
  routeId: string | null | undefined;


  addStops!: FormGroup;
  responseMessage: any;
  constructor(private formBuilder: FormBuilder,
              private driverService: DriverServiceService,
              private dialog: MatDialogRef<AddStopsComponent>,
              private ngxService: NgxUiLoaderService,
              private router : Router,
              private route: ActivatedRoute,  
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddStopsComponent>
  ) {
    this.routeId = data.routeId;
    console.log("Route id  in constractor  ",this.routeId);
    
  }
uuidRoute :string= this.data;

  ngOnInit(): void {

    this.driverService.getBusRootAndTimes(this.routeId).subscribe(
      response => {
        console.log(response);
        this.data.start = response.sourceLocation;
        this.data.end = response.destinationLocation;
        console.log("Start ", this.data.start);
        console.log("End ", this.data.end);
  

        const lastStopNumber = this.stops.length ? this.stops[this.stops.length - 1].number : 0;
        // this.stops.push({ number: lastStopNumber + 1, selectedDistrict: this.data.end });
        this.stops.unshift({ number: 1, selectedDistrict: this.data.start });
  

        // this.stops.forEach((stop, index) => {

        //   stop.sequenceNumber = index + 1;
        // });
  
        console.log("Stops with sequence numbers", this.stops);
      },
      error => {
        console.error('Error fetching bus root and time:', error);
        // Handle error
      }
    );

  }
  saveStops(): void {
    const stopsData = {
      routeId: this.routeId,
      stops: this.stops
    };
    this.driverService.addStopForRoute(stopsData).subscribe(
    response => {
      console.log('Stops added successfully:', response);
      this.dialogRef.close(this.stops);
    },
    error => {
      console.error('Error adding stops:', error);
      // Handle error
    }
  );
    console.log('Stops:', this.stops);
    this.dialogRef.close(this.stops);
  }
   addStop(): void {
    const nextStopNumber = this.stops.length + 1;
    this.stops.push({ number: nextStopNumber, selectedDistrict: '' });
  }

  removeStop(stopNumber: number): void {
    this.stops.splice(stopNumber - 1, 1);

    this.stops.forEach((stop, index) => {
      stop.number = index + 1;
    });
  }

  
  isSaveEnabled(): boolean {
  
    return this.stops.length >= 2 && this.stops.every(stop => !!stop.selectedDistrict);
  }
  
  
}
