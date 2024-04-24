import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { Authority } from '../enum/Authority.enum';
import { IdProof } from '../enum/idProof.enum';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit{



  registerForm!:FormGroup;
  authorityTypes=Object.values(Authority)
  idProofs=Object.values(IdProof)
  isAuthority:boolean=false;
  userId!: string;
  

  constructor(
    private service :JwtServiceService,
    private fb :FormBuilder, 
    private router: Router,
    private tostersrevice : TosterService,
    private route: ActivatedRoute
    ){   }

   

  ngOnInit(): void {  
    console.log("REGISTER IN ANGULAR user "+this.registerForm);
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    
    this.registerForm=this.fb.group({
      uniqueName: ['',[Validators.required, Validators.pattern('[A-Za-z]{2,}')]],
      authorityType: ['', Validators.required],
      location: ['', [Validators.required ,Validators.pattern(/^(?=.*[a-zA-Z]{3,})[^0-9]*$/)]],
      district: ['', [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z]{3,})[^0-9]*$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      licenceNo:['', [Validators.required, Validators.pattern('^[A-Z]{2}/\\d{2}/[A-Z]+$')]]
   
    })

  }  

  submitForm() {

    if (this.registerForm.valid) {
      console.log("UUID ****",this.userId);
      
      const moreDetailsRequest = { ...this.registerForm.value, userId: this.userId };
      console.log("Full data ",moreDetailsRequest);
      

      this.service.moreDetails(moreDetailsRequest).subscribe(
        (res) => {
          console.log("more details  added  ", res);
          if (res != null) {
            this.router.navigateByUrl("/authentication/login");
            
          } else {
            this.tostersrevice.failed("Sign up failed.");
            console.log("login error");
          }
        },
        (error) => {
          console.error("HTTP request failed", error);
          this.tostersrevice.failed("Sign up failed.");
        }
      );
    } else {
      
      console.log("Form is invalid. Cannot submit.");
    
    }
  }

  roleHandler(event: Event) {
    const selectedRole = event.target as HTMLSelectElement;
    console.log("selected Role is ", selectedRole.value);
    this.isAuthority=selectedRole.value=='Authority'? true : false;
  }
  
  getErrorMessageForLocation(field: string) {
    if (this.registerForm.get(field)?.hasError('required')) {
      return 'Location is required';
    }
    if (this.registerForm.get(field)?.hasError('pattern')) {
      return 'Location must contain at least 3 letters and no numbers';
    }
    return '';
}
getErrorMessageForDistrict(field: string) {
  if (this.registerForm.get(field)?.hasError('required')) {
    return 'Location is required';
  }
  if (this.registerForm.get(field)?.hasError('pattern')) {
    return 'Location must contain at least 3 letters and no numbers';
  }
  return '';
}

  getErrorMessageOfNumber(field: string) {
    if (this.registerForm.get(field)?.hasError('required')) {
      return 'Number of buses is required';
    }
    if (this.registerForm.get(field)?.hasError('min')) {
      return 'Number of buses must be at least 1';
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

  getErrorMessageForZipcode(field: string) {
    const control = this.registerForm.get(field);
    
    if (control?.hasError('required')) {
      return 'ZIP code is required';
    } else if (control?.hasError('pattern')) {
      return 'Invalid ZIP code format. Please enter 6 digits.';
    }
    return '';
}


  get uniqueName() {
    return this.registerForm.get('uniqueName');
  }
 
  get authorityType() {
    return this.registerForm.get('authorityType');
  }
  
  get location() {
    return this.registerForm.get('location');
  }
 
  get district() {
    return this.registerForm.get('district');
  }

  get pincode() {
    return this.registerForm.get('pincode');
  }
 
  get licenceNo() {
    return this.registerForm.get('licenceNo');
  }

  onSignUpClick() {

    console.log('Sign up clicked');
  }


}
