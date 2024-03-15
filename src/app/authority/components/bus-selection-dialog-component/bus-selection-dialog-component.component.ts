import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { TosterService } from 'src/app/service/toster.service';

@Component({
  selector: 'app-bus-selection-dialog-component',
  templateUrl: './bus-selection-dialog-component.component.html',
  styleUrls: ['./bus-selection-dialog-component.component.css']
})
export class BusSelectionDialogComponentComponent {

  selectedBus: string | undefined;
  addBusForm: FormGroup;
  authorityId: string|undefined;

  constructor(public dialogRef: MatDialogRef<BusSelectionDialogComponentComponent>,
             private formBuilder :FormBuilder,
             private authorityService: AuthorityServiceService,
             private router :Router,
             private toastr : TosterService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("Bus list mat -dialog*** ",data);
      
      console.log("Authority uuid received: ", data.authorityId);
      console.log("BusManage data received: ", data.busManage);
      this.addBusForm = this.formBuilder.group({
      
        
        busName: ['', Validators.required],
  
      
      });
    }

  selectBus(busName: string) {
    this.dialogRef.close(busName);
  }


  handleAddBusSubmit(): void {
    console.log("HANDLE SUBMIT WROK ");
    const driverId=this.data.authorityId;
    
    if (this.selectedBus) {
      console.log("Selected Bus UUID:", this.selectedBus);
      console.log("Assign Driver  UUID:",driverId);
      this.authorityService.storeBusInDriver(driverId, this.selectedBus)
        .subscribe(response => {
       
          this.toastr.success('Bus added to driver successfully'); 
          this.dialogRef.close();
      
        }, error => {
          console.error("Error storing bus in authority table:", error);
          
        });
    } else {
      console.log("Error: bus has no UUID");
    }
  }

  }

