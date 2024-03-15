import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  role:null| string='';
 
  constructor(private service: JwtServiceService,
              private formBuilder: FormBuilder,
              private router :Router,
              private tostersrevice : TosterService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
             
              ){   }

  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), this.invalidCharsValidators()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


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
          
      }
    

        console.log(this.loginForm.value);
        this.service.login(this.loginForm.value).subscribe(response=>{
  
      if (response.jwtToken) {
      
        const jwtToken = response.jwtToken;
        localStorage.setItem("jwt", jwtToken);
       
        this.role =this.service.extractRole();
      
 
      if (this.role === '[Admin]') {
     
        this.router.navigate(['admin', 'dashboard']);
        }
        else if (this.role === '[Operator]') {
   
          this.router.navigate(['operator', 'dashboard']);
          } 
         else if (this.role === '[Authority]') {
          
            this.router.navigate(['admin', 'dashboard']);
            } 
            
        else if (this.role === '[User]'){
        this.router.navigate(['customer', 'home']);
   
       } 
       this.tostersrevice.success('Login successful!', 'Success');
      } 
    },err=>{
        console.log("'Login failed: ************** ")
       
        this.openSnackBar('Please enter both email and password.', 'Error');
    })

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