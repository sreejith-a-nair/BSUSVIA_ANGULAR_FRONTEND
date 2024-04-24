import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { RootType } from '../enum/rootType.enum';

@Component({
  selector: 'app-edit-root',
  templateUrl: './edit-root.component.html',
  styleUrls: ['./edit-root.component.css']
})
export class EditRootComponent {


  
  addRouteTimeForm!: FormGroup;
  responseMessage: any;
  locationPattern = /^[a-zA-Z]{4,}$/;
  timePattern = /^[0-9]{2}:[0-9]{2}$/;
  numberPattern = /^[1-9]\d*$/;
  rootTypeOptions: string[] = Object.values(RootType);
  constructor(
    private formBuilder: FormBuilder,
    private authorityService: AuthorityServiceService,
    private dialog: MatDialogRef<EditRootComponent>,
    private jwtService: JwtServiceService,
    private ngxService: NgxUiLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { console.log("Root in edit component",data.busData);}

  ngOnInit(): void {
    console.log("Edit root component data ",this.data.routeData);
    
    this.addRouteTimeForm = this.formBuilder.group({
      uuid:[this.data.routeData.uuid, Validators.required],
      sourceLocation: new FormControl(this.data.routeData.sourceLocation, [Validators.required, Validators.pattern(this.locationPattern)]),
      destinationLocation: new FormControl(this.data.routeData.destinationLocation, [Validators.required, Validators.pattern(this.locationPattern)]),
      departureTime: new FormControl(this.data.routeData.departureTime, [Validators.required, Validators.pattern(this.timePattern)]),
      arrivalTime: new FormControl(this.data.routeData.arrivalTime, [Validators.required, Validators.pattern(this.timePattern)]),
      departureDate: new FormControl(this.data.routeData.departureDate, Validators.required),
      arrivalDate: new FormControl(this.data.routeData.arrivalDate, Validators.required),
      totalHour: new FormControl(this.data.routeData.totalHour, Validators.required),
      perdayTrip: new FormControl(this.data.routeData.perdayTrip, [Validators.required, Validators.pattern(this.numberPattern), Validators.min(1)]),
      rootType: new FormControl(this.data.routeData.rootType, Validators.required)
      // departurePeriod: new FormControl(this.data.routeData.departurePeriod, Validators.required),
      // arrivalPeriod: new FormControl(this.data.routeData.arrivalPeriod, Validators.required),
    });
   
  }

  handleEditRouteSubmit() {
    const routeId = this.data.routeData.uuid;
    const email = this.jwtService.extractEmail();
    this.ngxService.start();
    const formData = this.addRouteTimeForm.value;
    const routeData: any = {
      uuid: routeId,
      sourceLocation: formData.sourceLocation,
      destinationLocation: formData.destinationLocation,
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      departureDate: formData.departureDate,
      arrivalDate: formData.arrivalDate,
      totalHour: formData.totalHour,
      perdayTrip: formData.perdayTrip,
      rootType:formData.rootType
      // email: email
    };
    this.authorityService.updateRoute(routeData, routeId).subscribe((response: any) => {
      console.log("Response edit route success", response);
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialog.close();
    }, (error) => {
      console.log("Response edit route error", error);
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = 'An error occurred.';
      }
    });
  }

}
