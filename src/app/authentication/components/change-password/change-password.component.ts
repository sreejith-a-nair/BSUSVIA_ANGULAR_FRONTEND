import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/core/const/constant';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{


  oldPassword=true;
  newPassword=true;
  confirmPassword=true;
  changePasswordForm:any=FormGroup;
  responseMessage:any;
  router: any;
  
    constructor(private formBuilder : FormBuilder,
                private userservice :UserServiceService,
                private dialog : MatDialogRef<ChangePasswordComponent>, 
                private ngXService :NgxUiLoaderService){}

  ngOnInit(): void {
        this.changePasswordForm=this.formBuilder.group({
         oldPassword:[null,Validators.required],
         newPassword:[null,Validators.required],
         confirmPassword:[null,Validators.required]

    })
    
  }

  validateSumbit() {
    const newPassword = this.changePasswordForm.controls['newPassword'].value;
    const confirmPassword = this.changePasswordForm.controls['confirmPassword'].value;
  
    return this.changePasswordForm.controls.confirmPassword.touched && newPassword !== confirmPassword;
  }
  
  handlePasswordChangeSubmit(){
    console.log("HELLO Password change function");
    
    this.ngXService.start();
    var formData=this.changePasswordForm.value;
    var data ={
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword
    }

    this.userservice.changePassword(data).subscribe((response:any)=>{
    this.ngXService.stop();
    this.responseMessage=response?.message;
    this.dialog.close();

  },(error)=>{
    console.log(error);
    this.ngXService.stop();
    if(error.error?.message){
      this.responseMessage=error.error?.message;
    }else{
      this.responseMessage=GlobalConstants.genericError;
    }
    
  })

}





}
