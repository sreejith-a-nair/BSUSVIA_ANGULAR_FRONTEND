import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Gender } from 'src/app/authentication/components/enum/enum';
import { OtpValidationComponent } from 'src/app/authentication/components/otp-validation/otp-validation.component';
import { BusType } from 'src/app/authority/components/bus-enum/bus-type.enum';
import { BusFeature } from 'src/app/authority/components/bus-enum/busFeature';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userEmail!:string|null;
  editUserForm!: FormGroup;
  responseMessage: any;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  contactRegex = /^[0-9]{10}$/;
  genderOptions: string[] = Object.values(Gender);


  constructor(private formBuilder: FormBuilder,
              private authorityService: AuthorityServiceService,
              private dialog: MatDialogRef<EditUserComponent>,
              private jwtService: JwtServiceService,
              private ngxService: NgxUiLoaderService,
              private dialogs: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                  console.log("busData in edit component",data);}
             
              

  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      uuid:[this.data.uuid],
      contact:[this.data.busData.contact, [Validators.required, Validators.pattern(this.contactRegex)]],
      firstName: [this.data.busData.firstName, Validators.required],
      lastName: [this.data.busData.lastName, Validators.required],
      email:[this.data.busData.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      // email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), this.invalidCharsValidators()]],
      gender: [this.data.busData.gender, Validators.required],
     
      
    });
    console.log("Edit bus data edit component  ",this.editUserForm);
    
  }
  handleEditBusSubmit() {
    this.otpValidate();
  }

  otpValidate() {
    const dialogRef = this.dialogs.open(OtpValidationComponent, {
      width: '600px',
      data: { email: this.jwtService.extractEmail(), firstName: this.editUserForm.value.firstName }
    });
    dialogRef.componentInstance.closeDialog.subscribe((otpValidated: boolean) => {
      
      console.log("OTP validation result:", otpValidated);
      dialogRef.close(); 
      console.log("haii");


        const userId = this.data.busData.uuid;
        const formData = this.editUserForm.value;
        const userData: any = {
          uuid: formData.uuid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          contact: formData.contact,
          email: formData.email,
          gender: formData.gender,
        };
        this.authorityService.updateUser(userData, userId).subscribe((response: any) => {
          console.log("Response add bus success  ", response);
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.dialog.close();
          location.reload();
        }, (error) => {
          console.log("Response add bus error  ", error);
          this.ngxService.stop();
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = 'An error occurred.';
          }
        });
    
    });
      
  }
    
  emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailPattern = /^\d{10}$/; 
    const email = control.value;
  
    if (emailPattern.test(email)) {
      return null; 
    } else {
      return { 'invalidEmail': true };
    }
  }

  // isInvalidEmail() {
  //   const emailControl = this.editUserForm.get('email');
  //   return emailControl.invalid && emailControl.touched;
  // }

  
}
