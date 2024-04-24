import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/service/user-service.service';
import { AddMoreDetaisComponent } from '../add-more-detais/add-more-detais.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  
  users: any;
  moreDetails:any;
  userId:any;
  userMoreDetails:any;

  constructor(private jwtService: UserServiceService, private dialog: MatDialog) {}

  ngOnInit() {
    console.log("init work");
    this.loadUserProfile();
    
    
  }

  loadUserProfile(): void {
    this.jwtService.getUserProfile().subscribe(
      (data: any) => {
        console.log("Data user", data);
        this.users = data;
        this.userId = data.uuid;
        this.userMoreDetails = data.userMoreDetail;
        console.log("userMoreDetails ", this.userMoreDetails);
        console.log(data);
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

    addMoreDetails(): void {
     console.log(  "userId:any;",  this.userId);
     
      console.log("log work");
      const dialogRef = this.dialog.open(AddMoreDetaisComponent, {
        width: '550px' ,
        data: { userId:this.userId }
      });

      dialogRef.afterClosed().subscribe(result => {
        // Reload user profile data after dialog closes
        this.loadUserProfile();
      });
}



  editUserDetails() {
    console.log("log user id ",this.userId);
    
      
      this.dialog.open(EditUserComponent,{
        width:"650px",
        data: { busData: this.users }
      })
    }


}