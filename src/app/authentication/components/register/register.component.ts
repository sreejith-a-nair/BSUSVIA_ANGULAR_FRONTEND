import { Component, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { Gender } from '../enum/enum';
import { TosterService } from 'src/app/service/toster.service';
import { Role } from '../enum/role.enum';
import { Authority } from 'src/app/core/interface/authoriy.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from 'src/app/core/const/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OtpValidationComponent } from '../otp-validation/otp-validation.component';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

 


  registerForm!:FormGroup;
  genders = Object.values(Gender);
  roles=Object.values(Role)
  isAuthority:boolean=false;
  isAdmin:boolean=false;
  isUser:boolean=false;
  isOperator:boolean=false;
  userEmail!:string;

  existingAuthorityEmails: Authority[] = [];
  

    constructor(private authorityService: AuthorityServiceService,
      private service:JwtServiceService,
      private route: ActivatedRoute,
      private fb :FormBuilder,
      private router : Router,
      private dialog: MatDialog,
      private userService:UserServiceService,
      private tostersrevice : TosterService,
      private snackBar: MatSnackBar) {
  
  }
   

  ngOnInit(): void {  
  const  passwordValidator = Validators.pattern(GlobalConstants.strongPasswordRegex);

    
    this.registerForm=this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/), this.invalidCharsValidator()]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/), this.invalidCharsValidators()]],
      contact: ['', [Validators.required, this.invalidContactValidator()]],
      gender: ['', Validators.required],
      role:['', Validators.required],
      authorityEmail:[''],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern(/^(?=.*[@$!%*?&])(?=.*\d).{4,}$/)
        ]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.passwordMatchValidator });


      this.registerForm.get('role')?.valueChanges.subscribe(role => {
        this.updateLastNameValidators(role);
      });
    }

    updateLastNameValidators(role: string): void {
      const lastNameControl = this.registerForm.get('lastName');
      if (role === 'Operator') {
        
        lastNameControl?.clearValidators();
        lastNameControl?.setErrors(null); 
      } else {

        lastNameControl?.setValidators([Validators.pattern(/^[a-zA-Z]*$/), this.invalidCharsValidator()]);
      }
     
      lastNameControl?.updateValueAndValidity();
    }

    passwordMatchValidator(formGroup: FormGroup) {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      console.log("pswd " ,password);
      console.log("c-pswd " ,confirmPassword);
      
      if (password !== confirmPassword) {
        console.log("if");
        
        formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        console.log("else");
        formGroup.get('confirmPassword')?.setErrors(null);
      }
    }
    
  
  getEmail() {
    console.log("getMailWorked  " );
    
    this.loadExistingAuthority()
  }

  onAuthorityEmailChange(event: any): void {
    const selectedEmail = event.target.value; 
    console.log("selected authority mail",selectedEmail);
    
    this.registerForm.get('lastName')?.setValue(selectedEmail);
}

  submitForm() {

    if (!this.registerForm.value.firstName||!this.registerForm.value.lastName||!this.registerForm.value.gender || !this.registerForm.value.email || !this.registerForm.value.contact || !this.registerForm.value.password || !this.registerForm.value.confirmPassword) {
      this.openSnackBar('Please fill in all fields.', 'Error');
      return;
    }

    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe(
        (res) => {
          if (res != null) {
            console.log("login success  ***** ",res);
            this.userEmail=res.email
            // this.tostersrevice.success("Sign up successful.");    
            if(this.isAuthority){ 
              this.tostersrevice.success("Sign up successful.");  
              this.router.navigateByUrl("/authentication/more-details?userId=" + res.uuid);
            }
            else if(this.isAdmin){
              console.log("login work in register admin");
              this.tostersrevice.success("Sign up successful.");  
              this.router.navigateByUrl("/authentication/login");
            }
            else if(this.isUser){
              console.log("login work in register user");
              this.tostersrevice.success("Sign up successful.");  
              // this.router.navigateByUrl("/authentication/login");
              // this.router.navigateByUrl("/authentication/otp-validate");
              console.log(" this.userEmail" , this.userEmail);
              this.otpValidate();
              // this.router.navigateByUrl("/authentication/otp-validate", { state: { email:  this.userEmail } });
            }else{
              console.log("login work in register operator");
              this.tostersrevice.success("Sign up successful.");  
              this.router.navigateByUrl("/authentication/login");

            }
          
          } else {
            this.tostersrevice.failed('signUp failed!');
            // this.openSnackBar("Sign up failed.", 'Error');
            
          }
        },
        (error) => {
            this.tostersrevice.failed('SignUp failed!');
            // this.openSnackBar(error.error, 'Error'); 
        }
      );

    } else {
      
      this.tostersrevice.failed('Form is invalid. Cannot submit.');
    }
  }


  otpValidate() {
    const dialogRef = this.dialog.open(OtpValidationComponent, {
      width: '600px',
      data: { email: this.userEmail } 
      
      
    });
    console.log("register user email  .>  ",this.userEmail);
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close(); 
    });
  }

  isPasswordStrong(password: string | null): boolean {
    if (!password) {
      return false; 
    }

    if (password.length < 4) {
      return false;
    }

    const specialCharRegex = /[@$!%*?&]/;
    if (!specialCharRegex.test(password)) {
      return false;
    }

    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      return false;
    }

    return true;
  }
  


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000, 
    });
  }

  loadExistingAuthority(): void {
    console.log("loadAuthority email  method worked ");
    
  const role = 'Authority';
    this.service.getExistingAuthorityEmails(role).subscribe(
      authorities => {
        console.log("Data",authorities);
        
        this.existingAuthorityEmails = authorities;
      },
      error => {
        console.error('Error fetching existing authority emails:', error);
        // Handle error as needed
      }
    );
  }
 

  roleHandler(event: Event) {
    const selectedRole = event.target as HTMLSelectElement;
    console.log("selected Role is ", selectedRole.value);
    if(selectedRole.value=='Authority'){
      this.isAuthority=selectedRole.value=='Authority'? true : false;
      this.isOperator=false;
    }
    else if (selectedRole.value=='User'){
      this.isUser=selectedRole.value=='User'? true : false;
      this.isOperator=false;
    }
    else if (selectedRole.value=='Admin'){
      this.isAdmin=selectedRole.value=='Admin'? true : false;
      this.isOperator=false;
    }
    else if (selectedRole.value=='Operator'){
      this.isOperator=selectedRole.value=='Operator'? true : false;
    }
    
    
  }
 
  invalidCharsValidator() {
    return (control: AbstractControl) => {
      const invalidChars = /[!@#$%^&*(),.?":{}|<>]/; 
      // const invalidChars =/^(?=.*[@$!%*?&])(?=.*\d).{4,}$/
      const value = control.value;

      if (invalidChars.test(value)) {
        return { invalidChars: true };
      }

      return null;
    };
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

  invalidContactValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      const invalidNumbers = /^\d{10}$/;
  
      if (!invalidNumbers.test(value)) {
        return { invalidContact: true };
      }
  
      return null;
    };
  }
  
  getErrorMessageForContact() {
    const control = this.registerForm.get('contact');
  
    if (control?.hasError('required')) {
      return '*';
    } else if (control?.hasError('invalidContact')) {
      return 'Invalid contact number (10 digits required)';
    }
  
    return '';
  } 

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    
    if (control?.hasError('required')) {
      return '*';
    } else if (control?.hasError('pattern') || control?.hasError('invalidChars')) {
      return 'Enter a valid name , use letters only';
    } 
    return '';
  }

  getErrorMessageForEmail(controlName: string): string {
    const control = this.registerForm.get(controlName);
    
    if (control?.hasError('required')) {
      return '*';
    } else if (control?.hasError('pattern') || control?.hasError('invalidCharsMail')) {
      return 'Enter a valid email';
    } 
    return '';
  }
   
  getErrorMessageForPassword(controlName: string): string {
    const control = this.registerForm.get(controlName);
  
    if (control?.hasError('required')) {
      return '*';
    } else if (control?.hasError('pattern') || control?.hasError('invalidChars')) {
      return 'Enter a valid password (6-16 characters)';
    } else if (control?.hasError('minlength')) {
      return 'Password should have at least 6 characters';
    } else if (control?.hasError('maxlength')) {
      return 'Password should not exceed 16 characters';
    }
  
    return '';
  }



  passwordMathValidator(formGroup:FormGroup){
    const password=formGroup.get('password')?.value;
    const confirmPassword=formGroup.get('confirmPassword')?.value;
    if(password!=confirmPassword){
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch:true})
    }else{
      formGroup.get('confirmPassword')?.setErrors(null)
    }

  }





showPassword: boolean = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

get inputType() {
  return this.showPassword ? 'text' : 'password';
}


  get firstName() {
    return this.registerForm.get('firstName');
  }
  
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get contact() {
    return this.registerForm.get('contact');
  }

  onSignUpClick() {
    // Handle sign-up logic
    console.log('Sign up clicked');
  }



}
