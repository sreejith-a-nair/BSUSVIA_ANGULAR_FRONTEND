import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/authentication/components/change-password/change-password.component';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ChangePswdDialogComponent } from '../change-pswd-dialog/change-pswd-dialog.component';

@Component({
  selector: 'app-change-pswd',
  templateUrl: './change-pswd.component.html',
  styleUrls: ['./change-pswd.component.css']
})
export class ChangePswdComponent {



  otp: string[] = ['', '', '', ''];

  
  constructor(private jwtService: JwtServiceService,
    private userServiec : UserServiceService,
    private dialog: MatDialog,
    private router :Router){}

  onKeyUp(index: number): void {
    if (index !== 3) {
      const element = document.getElementById('otp' + (index + 2)) as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }


  
  handleChangePassword(): void {
  
    const dialogRef = this.dialog.open(ChangePswdDialogComponent, {
      width: '550px' 
    });

}

}


