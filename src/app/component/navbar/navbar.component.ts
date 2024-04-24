import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/authentication/components/change-password/change-password.component';
import { ForgotPasswordComponent } from 'src/app/authentication/components/forgot-password/forgot-password.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck{



@ViewChild('drawer') drawer !: MatSidenav;
  title = 'jwt-front';
  users: any;
  sidebar:any[]=[];

  jwtTok!:string | null;
  isLogged: boolean=false;
  isAdmin: boolean=false;
  role:null| string='';
  userName!:string;
  status!:boolean;

  constructor(private jwtService: JwtServiceService,
              private userService : UserServiceService,
              private dialog: MatDialog,
              private router :Router){}

              adminSideBar = [
                // { label: 'Dashboard', routerLink: '/admin/dashboard', icon: 'dashboard' },
                { label: 'Booking', routerLink: '/admin/booking-details', icon: 'booking_icon_name' },
                { label: 'Buses', routerLink: '/admin/all-bus-list', icon: 'directions_bus' },
                { label: 'Coupon', routerLink: '/booking/coupon-list', icon: 'confirmation_number' }, // Corrected routerLink
                { label: 'Customers', routerLink: '/customer/user-list', icon: 'group' },
                { label: 'Employees', routerLink: '/admin/employ-list', icon: 'group' },
                { label: 'Authority', routerLink: '/admin/authority-details', icon: 'group' },
              
                
                // { label: 'Banner/image', routerLink: '/admin/user-list', icon: 'image' }
              ];
              authoritySideBar = [
                // { label: 'Dashboard manage', routerLink: '/admin/dashboard-manage', icon: 'dashboard' },
                { label: 'Bus management', routerLink: '/authority/bus-manage', icon: 'directions_bus' },
                { label: 'Driver management', routerLink: '/authority/operator-manage', icon: 'group' },
                { label: 'Booking manage', routerLink: '/authority/booking-manage', icon: 'book' },
                { label: 'Live Chat', routerLink: '/authority/chat-manage', icon: 'chat' },
                { label: 'Notification', routerLink: '/authority/notification', icon: 'notifications' },
                
                // { label: 'Live Chat', routerLink: '/communication/chat', icon: 'chat' },
               
              ];
              operatorSidebar = [
                // { label: 'Dashboard' , routerLink: '/operator/dashboard', icon: 'dashboard' },
                { label: 'Bus Root-Time', routerLink: '/operator/bus-root-time', icon: 'access_time' },
                { label: 'Bus & seats', routerLink: '/operator/bus-data', icon: 'directions_bus' },
                { label: 'Reserved Users ', routerLink: '/operator/reserved-user-list', icon: 'book' },
              ];

              

              ngOnInit(): void {
                const driverMail = this.jwtService.extractEmail();
                this.userService.getUseByEmail  (driverMail).subscribe(
                  response => {
                    console.log("find user in nav bar component : ",response);
                   
                this.userName=response.firstName;
                this.status=response.block;

                                  console.log("find user in nav bar component : ",this.userName);
                                  console.log("ststus : ",response.block);
                                  this.checkUserisBlock(response.block);        
                      
                  },
                  err => {
                    console.error("Error fetching bus:", err);
                  }
                );

                
              }


              checkUserisBlock(status: boolean) {
                console.log("checkUserisBlock : ",status);
                
                if(status===false){
                  this.router.navigateByUrl('/authentication/logout')

                }
              }
  

  ngDoCheck(): void {
  
      
      this.jwtTok = localStorage.getItem('jwt');

      if (this.jwtTok != null) {
        this.isLogged = true;
        this.role = this.jwtService.extractRole();
     
        if (this.role === '[Admin]') {
          this.isAdmin = true;
          this.sidebar=this.adminSideBar;
        } 
        else if (this.role === '[Operator]'){
          this.isAdmin = true;
          this.sidebar=this.operatorSidebar;
        }
        else if (this.role === '[Authority]'){
          this.isAdmin = true;
          this.sidebar=this.authoritySideBar;
        }
      } else {
        this.isLogged = false;
        this.isAdmin = false;
    }
  }

  handleForgotPassword(){ 
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(ForgotPasswordComponent,dialogConfig)
    this.router.navigate(['/authentication/forgot-password']);
  }
  handleChangePassword(){
    console.log("handleChangePassword***");
    const dialogConfig= new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(ChangePasswordComponent,dialogConfig)
    this.router.navigate(['/authentication/change-password']);

  }


  toggleSidebar() {
    const showSidebar = localStorage.getItem('showSidebar') === 'true';
    localStorage.setItem('showSidebar', (!showSidebar).toString());
  }

  handleProfile(){
    console.log("profile worked >>>");
   
        this.router.navigate(['/customer/profile']);
  }
  
    handleWallet() {
      console.log("wallet worked >>>");
      this.router.navigate(['/customer/userWallet']);
    
      }

  isAdmins(): boolean {
    return this.jwtService.extractRole() === '[Admin]';
  }


  handleLogout(): void {
    // when admin logout close the opened sidebar
    this.drawer.close();
    this.router.navigateByUrl('/authentication/logout')
  }

  navigateToMyTicket(arg0: string) {
    console.log("mytiket 1");
    
    this.router.navigate(['/customer/my-tickets'])
    }
    
    navigateToHome(arg0: string) {
      this.router.navigate(['/customer/home'])
      }
      navigateToAbout(arg0: string) {
        this.router.navigate(['/customer/about'])
        }
  
}

