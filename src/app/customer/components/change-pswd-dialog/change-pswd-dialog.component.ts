import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ChangePasswordComponent } from 'src/app/authentication/components/change-password/change-password.component';
import { GlobalConstants } from 'src/app/core/const/constant';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-change-pswd-dialog',
  templateUrl: './change-pswd-dialog.component.html',
  styleUrls: ['./change-pswd-dialog.component.css']
})
export class ChangePswdDialogComponent {


  
  email=true;
  newPassword=true;
  confirmPassword=true;
  changePasswordForm:any=FormGroup;
  responseMessage:any;
 
  
    constructor(private formBuilder : FormBuilder,
                private userService :UserServiceService,
                private dialogRef : MatDialogRef<ChangePasswordComponent>, 
                private ngxService :NgxUiLoaderService,
                private snackBar : MatSnackBar,
                private router: Router){}

  ngOnInit(): void {
        this.changePasswordForm=this.formBuilder.group({
         email:[null,Validators.required],
         newPassword:[null,Validators.required],
         confirmPassword:[null,Validators.required]

    })
    
  }

  validateSumbit() {
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const confirmPassword = this.changePasswordForm.controls['confirmPassword'].value;
  
    return this.changePasswordForm.controls.confirmPassword.touched && newPassword !== confirmPassword;
  }
  



  handlePasswordChangeSubmit() {
    this.ngxService.start();
    const formData = this.changePasswordForm.value;
    const data = {
      email: formData.email,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    };

    this.userService.changePasswordUser(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response.message || 'Password changed successfully';
        this.snackBar.open(this.responseMessage, 'Close', { duration: 3000 });
        this.dialogRef.close();
        console.log("cahnge password sucesss");
        
        this.router.navigateByUrl("/authentication/login");


      },
      (error: HttpErrorResponse) => { 
        console.error(error);
        this.ngxService.stop();
        if (error.status === 400) {
          this.responseMessage = 'Incorrect old password';
        } else if (error.status === 500) {
          this.responseMessage = 'Something went wrong';
        } else {
          this.responseMessage = 'An unexpected error occurred';
        }
        this.snackBar.open(this.responseMessage, 'Close', { duration: 3000 });
      }
    );
  }


}
