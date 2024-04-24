import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-notification-manage',
  templateUrl: './notification-manage.component.html',
  styleUrls: ['./notification-manage.component.css']
})
export class NotificationManageComponent {


  notification: any[] = [];

  constructor(private authorityService: AuthorityServiceService,
    private jwtservice:JwtServiceService,
    private route: ActivatedRoute,
    private router : Router,
    private dialog: MatDialog,
    private userService:UserServiceService) {

} 

HeadingArray = [
  { Head: 'Title', bodyKey: 'busName' },
  { Head: 'Content', bodyKey: 'busNumber' },
  { Head: 'Date', bodyKey: 'busType' },
  { Head: 'Total Seats', bodyKey: 'totalSeats' },
  { Head: 'Available Seats', bodyKey: 'availableSeats' },
  
];

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
 
    const email:string|null=this.jwtservice.extractEmail();
    console.log("get  authority mail ",email);
    
    this.authorityService.getAllNotificationByEmail(email).subscribe(item=>{
      console.log("get all bus by mail ",item);
      this.notification = item ;
    });
    
  });
}
  

}
