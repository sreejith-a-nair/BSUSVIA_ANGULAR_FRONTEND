import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css']
})
export class OtpValidationComponent {


  otp: any;
  firstName: string='';
  returnedOtp:any='';
  otpValues: number[] = [0, 0, 0, 0];
  javaService: any;
  userEmail!: string;

constructor(
              private toster : TosterService,
              private router : Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private jwtService :JwtServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

              }
   @Output() closeDialog = new EventEmitter<void>();
   @Output() otpEntered = new EventEmitter<string>();
   @Output() otpValidated = new EventEmitter<boolean>();


  ngOnInit(): void { 
    this.userEmail = this.data.email;
    this.firstName = this.data.firstName;
    console.log("first name ",this.firstName);
    console.log("user email otp ",this.userEmail);
    
      if (this.userEmail) {
        this.jwtService.generateOTPAndSendEmail(this.userEmail).subscribe(
          otp => {
            console.log('Returned OTP:', otp);
            this.returnedOtp = otp;
          },
          error => {
            console.error('Error generating OTP:', error);
            // Handle error
            this.toster.failed('Invalid credentials.');
          }
        );
      }
    
   }

  onInputChange(index: number, event: any) {
    const value = event.target.value;
    if (value.match(/^[0-9]$/)) { 
      this.otpValues[index] = value;
      const otp = this.otpValues.join('');
      this.otpEntered.emit(otp); 
    } else {
      event.target.value = ''; 
    }
  }


submit() {
  console.log("submit work");
  
  const enteredOtp = this.otpValues.join('');
  if (enteredOtp == this.returnedOtp) {
    console.log("otp and entered value are equal  ", this.otp, "  = ", enteredOtp);
    this.closeDialog.emit();
    this.toster.success('Entered otp is valid ');
    this.router.navigateByUrl('/authentication/login');
  } else {
    this.toster.failed('Entered OTP does not match the received OTP.');
    console.log('Entered OTP does not match the received OTP.');
  }
}

submitProfile() {
  console.log("profile submit work");
  const enteredOtp = this.otpValues.join('');
  if (enteredOtp == this.returnedOtp) {
    console.log("otp and entered value are equal  ", this.otp, "  = ", enteredOtp);
    this.closeDialog.emit();
    this.otpValidated.emit(true);
    this.toster.success('Entered otp is valid ');
    
    // this.router.navigateByUrl('/authentication/login');
  } else {
    this.toster.failed('Entered OTP does not match the received OTP.');
    console.log('Entered OTP does not match the received OTP.');
    this.otpValidated.emit(false);
   
  }
  }

}