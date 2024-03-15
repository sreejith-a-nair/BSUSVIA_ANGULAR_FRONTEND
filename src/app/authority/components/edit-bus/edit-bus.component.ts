import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusType } from '../bus-enum/bus-type.enum';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { MatDialog, MatDialogConfig,MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { BusFeature } from '../bus-enum/busFeature';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent {

  addBusForm!: FormGroup;
  responseMessage: any;
  busNumberPattern = /^[A-Z]{2}\/\d{2}\/\d{1,6}$/;
  busNamePattern = /^[A-Za-z \/\\]{2,}$/;
  numberPattern = /^[1-9]\d*$/;
  busTypes: string[] = Object.values(BusType);
  categories :string[] = Object.values(BusFeature);


  constructor(private formBuilder: FormBuilder,
              private authorityService: AuthorityServiceService,
              private dialog: MatDialogRef<EditBusComponent>,
              private jwtService: JwtServiceService,
              private ngxService: NgxUiLoaderService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {  console.log("busData in edit component",data.busData.fare);}
             
              

  ngOnInit(): void {
    this.addBusForm = this.formBuilder.group({
      uuid:[this.data.busData.uuid, Validators.required],
      busName: new FormControl(this.data.busData.busName, [Validators.required, Validators.pattern(this.busNamePattern)]),
      busNumber: new FormControl(this.data.busData.busNumber, [Validators.required, Validators.pattern(this.busNumberPattern)]),
      busType: [this.data.busData.busType, Validators.required],
      category: [this.data.busData.category, Validators.required],
      totalSeats: [this.data.busData.totalSeats, [Validators.required, Validators.pattern(this.numberPattern)]],
      upperSeat: [this.data.busData.upperSeat, [Validators.required, Validators.pattern(this.numberPattern)]],
      lowerSeat: [this.data.busData.lowerSeat, [Validators.required, Validators.pattern(this.numberPattern)]],
      fare: [this.data.busData.fare, [Validators.required, Validators.pattern(this.numberPattern)]],
      availableSeats: [this.data.busData.availableSeats, [Validators.required, Validators.pattern(this.numberPattern)]],
      doubleSeatCount: [this.data.busData.doubleSeatCount, [Validators.required, Validators.pattern(this.numberPattern)]],
      thirdRowSeatCount: [this.data.busData.thirdRowSeatCount, [Validators.required, Validators.pattern(this.numberPattern)]],
      
    });
    console.log("Edit bus data edit component  ",this.addBusForm);
    
  }

  handleEditBusSubmit() {
    const busId=this.data.busData.uuid
    console.log("add work  edit submit work " ,busId);
    const email =this.jwtService.extractEmail();
    this.ngxService.start();
    const formData = this.addBusForm.value;
    const busData :any = {
      uuid:formData.uuid,
      busName: formData.busName,
      busNumber: formData.busNumber,
      busType: formData.busType,
      category: formData.category,
      totalSeats: formData.totalSeats,
      upperSeat: formData.upperSeat,
      lowerSeat: formData.lowerSeat,
      availableSeats: formData.availableSeats,
      doubleSeatCount: formData.doubleSeatCount,
      thirdRowSeatCount: formData.thirdRowSeatCount,
      fare: formData.fare,
      email: email
    };
    console.log("add work + data  ",busData);
  
    this.authorityService.updateBus(busData,busId).subscribe((response: any) => {
      console.log("Response add bus success  ",response);
      
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialog.close();
     
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
