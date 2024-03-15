import { Component, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { Gender } from '../enum/enum';
import { TosterService } from 'src/app/service/toster.service';
import { Role } from '../enum/role.enum';
import { Authority } from 'src/app/core/interface/authoriy.model';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  existingAuthorityEmails: Authority[] = [];
  

  constructor(
    private service :JwtServiceService,
    private fb :FormBuilder, 
    private router: Router,
    private tostersrevice : TosterService,
    private snackBar: MatSnackBar
    ){   }

   

  ngOnInit(): void {  
    
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
        this.invalidCharsValidator() 
      ]],
      confirmPassword:['',[Validators.required]],
    },
    {validator:this.passwordMathValidator})

   

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
            console.log("login success  ***** ");
            this.tostersrevice.success("Sign up successful.");    
            if(this.isAuthority){ 
              this.router.navigateByUrl("/authentication/more-details?userId=" + res.uuid);
            }
            else if(this.isAdmin){
              console.log("login work in register admin");
              this.router.navigateByUrl("/authentication/login");
            }
            else if(this.isUser){
              console.log("login work in register user");
              this.router.navigateByUrl("/authentication/login");
            }else{
              console.log("login work in register operator");
              this.router.navigateByUrl("/authentication/login");
            }
          
          } else {
            this.openSnackBar("Sign up failed.", 'Error');
            
          }
        },
        (error) => {
          
            console.log("failed=================");
            this.openSnackBar(error.error, 'Error');
        }
      );

    } else {
      
      console.log("Form is invalid. Cannot submit.");
    
    }
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
      const value = control.value;

      if (invalidChars.test(value)) {
        return { invalidChars: true };
      }

      return null;
    };
  }
  invalidCharsValidators() {
    return (control: AbstractControl) => {
      // const invalidCharsMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
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
