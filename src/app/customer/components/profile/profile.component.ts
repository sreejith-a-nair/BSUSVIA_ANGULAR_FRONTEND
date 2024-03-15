import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  
  users: any;

  constructor(private jwtService: UserServiceService) {}

  ngOnInit() {
    this.jwtService.getUserProfile().subscribe(
      (data: any) => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
