import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { NotificationServiceService } from 'src/app/service/notification-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  role:null| string='';
  userActive!:boolean;
 
  constructor(private service: JwtServiceService,
              private formBuilder: FormBuilder,
              private router :Router,
              private toastrService : TosterService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private notificationService:NotificationServiceService
             
              ){   }

  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), this.invalidCharsValidators()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // this.sendNotification();
  }



  // sendNotification(): void {
   
  //   const deviceToken = "dctIpo8wbT8yg7YTxwAlm6:APA91bEQ2z37jiB6lSUn0r8gEgxo8unMsMhIPh7U5-dVw6tTBC-spnP9jh2pY6LrXfzbpxIp75vp15ByzydLkqIERcJzY0D7HILhHat_LqS2pAMEUBbTgYpxBKL5p2-LgZdMDe3o2NWF"; // Replace with the recipient's device token
  //   const title = "Booking successful";
  //   const bodi = "Congrats booking successfully completed with busvia";
  //   const icon = "https://i.ibb.co/8bpP4S1/error-page-new.jpg";
  //   this.notificationService.sendNotification(deviceToken, title, bodi, icon)
  //     .subscribe(
  //       response => {
  //         console.log('Notification sent successfully:', response);
  //         // Handle success response if needed
  //       },
  //       error => {
  //         console.error('Error sending notification:', error);
  //         // Handle error if needed
  //       }
  //     );
  //   // this.notificationService.sendNotificationToDivice(deviceToken)

    
  // }

  

  getErrorMessageForEmail(controlName: string): string {
    const control = this.loginForm.get(controlName);
    
    if (control?.hasError('required')) {
      return '*';
    } else if (control?.hasError('pattern') || control?.hasError('invalidCharsMail')) {
      return 'Enter a valid email';
    } 
    return '';
  }


  invalidCharsValidators() {
    return (control: AbstractControl) => {
    
      const invalidCharsMail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@gmail\.com$/i

      const values = control.value;

      if (!invalidCharsMail.test(values)) {
        return { invalidCharsMail: true };
      }

      return null;
    };
  }

  get emailFormControl() {
    return this.loginForm.get('email');
  }

  get emailRequiredError() {
    return this.emailFormControl?.hasError('required');
  }

  get emailFormatError() {
    return this.emailFormControl?.hasError('email') && !this.emailRequiredError;
  }  
  get passwordFormControl() {
    return this.loginForm.get('password');
  }

  get passwordRequiredError() {
    return this.passwordFormControl?.hasError('required');
  }

  get passwordMinLengthError() {
    return this.passwordFormControl?.hasError('minlength') && !this.passwordRequiredError;
  }   


  submitForm() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      this.openSnackBar('Please enter both email and password.', 'Error');
      return;
    }
  const  email:string = this.loginForm.value.email
  console.log("login user email" ,email );
  
  if(email){
    console.log("user email  is present");
    

    this.service.getExistingUserByEmail(email).subscribe( response => {
      this.userActive=response.block;
      console.log("User current status 1",this.userActive);
       console.log("User current status 2",response);
      

    },err=>{
       console.log("No user ");

    })
  }
   
  
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      response => {

          if(this.userActive){

            if (response.jwtToken) {
              const jwtToken = response.jwtToken;
              localStorage.setItem("jwt", jwtToken);
              this.role = this.service.extractRole();
              
                    switch (this.role) {
                        case '[Admin]':
                          this.toastrService.success('Login successful!', 'Success');
                          this.router.navigate(['admin', 'dashboard']);
                          break;
                        case '[Operator]':
                          this.toastrService.success('Login successful!', 'Success');
                          this.router.navigate(['operator', 'dashboard']);
                          break;
                        case '[Authority]':
                          this.toastrService.success('Login successful!', 'Success');
                          this.router.navigate(['admin', 'dashboard']);
                          break;
                        case '[User]':
                          this.toastrService.success('Login successful!', 'Success');
                          this.router.navigate(['customer', 'home']);
                          break;
                        default:
                          this.toastrService.warning('Unknown user role', 'Warning');
                          break;
                    }

             } else {
              console.log("'Login failed: **** ");
              this.toastrService.failed('Login failed: ' + response);
             }
          }else{
            console.log("account  bolcked");

            
            this.toastrService.failed('you are blocked !', 'Failed');
            
         }
      },
      error => {
        console.log("'Login failed: ************** ");
       
        this.openSnackBar('Please enter both email and password.', 'Error');
      }
    );
  }
  

 
 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000, 
    });
  }



  openForgotPasswordModal(): void {
    // Open the forgot password modal using MatDialog
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '550px' 
    });


}

}