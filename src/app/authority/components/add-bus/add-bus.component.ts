import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { BusType } from '../bus-enum/bus-type.enum';
import { Router } from '@angular/router';
// import { BusRouteAndTimeComponent } from '../bus-route-and-time/bus-route-and-time.component';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { BusFeature } from '../bus-enum/busFeature';




@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent {

  addBusForm!: FormGroup;
  responseMessage: any;
  busNumberPattern = /^[A-Z]{2}\/\d{2}\/\d{1,6}$/;
  busNamePattern = /^[A-Za-z \/\\]{2,}$/;
  numberPattern = /^[1-9]\d*$/;
  busTypes: string[] = Object.values(BusType);
  category: string[] = Object.values(BusFeature);

  constructor(private formBuilder: FormBuilder,
              private authorityService: AuthorityServiceService,
              private dialog: MatDialogRef<AddBusComponent>,
              private dialogs:MatDialog,
              private jwtService : JwtServiceService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

  ngOnInit(): void {
    this.addBusForm = this.formBuilder.group({
      busName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{4,}$/)]),
      busNumber: new FormControl('', [Validators.required, Validators.pattern(this.busNumberPattern)]),
      busType: ['', Validators.required],
      totalSeats: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      availableSeats: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      fare: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      category: ['', Validators.required],
      doubleSeatCount: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      thirdRowSeatCount: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      upperSeat: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      lowerSeat: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
    });
  }

    handleAddBusSubmit() {
      console.log("add work  ");
      const email =this.jwtService.extractEmail();
      this.ngxService.start();
      const formData = this.addBusForm.value;
      const busData :any = {

        busName: formData.busName,
        busNumber: formData.busNumber,
        busType: formData.busType,
        totalSeats: formData.totalSeats,
        upperSeat: formData.upperSeat,
        lowerSeat: formData.lowerSeat,
        availableSeats:formData.availableSeats,
        fare:formData.fare,
        category:formData.category,
        doubleSeatCount: formData.doubleSeatCount,
        thirdRowSeatCount: formData.thirdRowSeatCount,

        email: email
      };
      console.log("add work + data  ",busData);
    
    this.authorityService.addBus(busData).subscribe((response: any) => {
      console.log("Response add bus success  ",response);
      
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialog.close();
      const busId: string | null = response.uuid;

    }, (error) => {
      console.log("Response add bus error  ",error);
      console.log(error);
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = 'An error occurred.';
      }
    });
  }


}
