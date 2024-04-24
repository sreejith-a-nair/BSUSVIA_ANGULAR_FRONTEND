import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-more-detais',
  templateUrl: './add-more-detais.component.html',
  styleUrls: ['./add-more-detais.component.css']
})
export class AddMoreDetaisComponent {
 

  addMoreDetailForm:any=FormGroup;
  responseMessage:any;
  userId!: string;
 
  
    constructor(private formBuilder : FormBuilder,
                private userService :UserServiceService,
                private dialogRef : MatDialogRef<AddMoreDetaisComponent>, 
                private ngxService :NgxUiLoaderService,
                private snackBar : MatSnackBar,
                private router: Router,
                @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.userId = this.data.userId;

    console.log('User ID:', this.userId);


        this.addMoreDetailForm=this.formBuilder.group({
          dob: ['', Validators.required],
          additionalContact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
          zipCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
          city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{4,}$')]] ,
          district: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{4,}$')]],
          state: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{4,}$')]]
    })
    
  }
  validateCity(control: AbstractControl): { [key: string]: boolean } | null {
    if (!/^[a-zA-Z ]{4,}$/.test(control.value)) {
      return { 'invalidCity': true };
    }
    return null;
  }
  addMoreUserDetails() {

    if (this.addMoreDetailForm.valid) {
 
      const formData = this.addMoreDetailForm.value;
      const userMoreDetails :any = {
        userId: this.userId,
        dob: formData.dob,
        // dob:`${formData.dob} ${formData.dob}`,
        additionalContact: formData.additionalContact,
        city: formData.city,
        zipCode: formData.zipCode,
        state: formData.state,
        district: formData.district,
      };

     
      this.userService.addMoreUserDetails(userMoreDetails).subscribe(
        (response) => {
          console.log('Form submitted successfully!', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error submitting form:', error);
          this.dialogRef.close();
        }
      );
    } else {
     
      
    }
  }
    
}
