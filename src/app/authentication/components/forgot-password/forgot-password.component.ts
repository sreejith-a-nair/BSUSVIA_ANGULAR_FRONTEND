import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/core/const/constant';
import { UserServiceService } from 'src/app/service/user-service.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  
  forgotPasswordForm:any=FormGroup;
  responseMessage:any;

  constructor(private fb: FormBuilder,
              private userService :UserServiceService,
              private dialogRef:MatDialogRef<ForgotPasswordComponent>,
              private ngxService:NgxUiLoaderService,
              private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.forgotPasswordForm=this.fb.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  loaderCalled(){
    alert('cslled')
    this.ngxService.start()
  }


  handleSubmit() {
    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;
    const data = {
      email: formData.email
    };
  
    this.userService.forgotPasswordForm(data).subscribe(
      (response: any) => {
        console.log("Response from backend:", response); // Add this line to log the entire response
        this.ngxService.stop();
        this.responseMessage = response.message || 'Email sent successfully!';
        this.snackBar.open(this.responseMessage, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
        this.dialogRef.close();
      },
      (error) => {
        console.log("Error from backend:", error); 
        this.ngxService.stop();
        this.responseMessage = error.error || 'Something went wrong!';
        this.snackBar.open(this.responseMessage, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        this.dialogRef.close();
      }
    );
  }
  
  

}
