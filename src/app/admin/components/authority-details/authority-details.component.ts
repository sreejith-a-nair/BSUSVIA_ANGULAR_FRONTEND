import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Authority } from 'src/app/core/interface/authoriy.model';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { loadAuthority, loadUser } from 'src/app/state/user.action';
import { getauthoritylist, getuserlist } from 'src/app/state/user.selector';


@Component({
  selector: 'app-authority-details',
  templateUrl: './authority-details.component.html',
  styleUrls: ['./authority-details.component.css']
})
export class AuthorityDetailsComponent {


  authority: any[] = [];
  private _dialog: any;
  filteredUsers !: Authority[] ;

  searchKeyword !: string ;

    constructor(private jwtService: JwtServiceService,
                private store:Store,private route: ActivatedRoute,
                private router : Router,
                private dialog: MatDialog,
                private userService :UserServiceService) {
      this.authority = [];
      this.filteredUsers = this.filteredUsers;
    }

  HeadingArray=[{Head : 'Firstname',bodyKey : 'firstName'},
  {Head : 'LastName',bodyKey : 'lastName'},
  {Head : 'Email',bodyKey : 'email'},
  {Head : 'Contact',bodyKey : 'contact'},
  {Head : 'Role',bodyKey : 'role'},
  {Head : 'Gender',bodyKey : 'gender'},
  {Head : 'Delete',bodyKey : 'delete'},
  {Head : 'Restrict',bodyKey : 'restrict'},
  {Head : 'MoreDetails',bodyKey : 'moreDetails'},

                  ];


  ngOnInit() {

    this.store.dispatch(loadAuthority({ role: 'Authority'}));

    
    this.store.select(getauthoritylist).subscribe(item=>{
      this.authority = item as any[];
      console.log(this.authority);
    });
  }

  onDeleteAuthority(userId: string|any) {
 
    this.jwtService.deleteUser(userId).subscribe(
      () => {
        console.log("user deleted successfully");
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  viewMoreAuthority(event : Event) {
      
    this.router.navigate(['/admin/authority-more-details'], { queryParams: { userId: event } });

    }

    onRestrictUser(event: any) {
      const { uuid, active } = event;
      console.log("UUID:", uuid);
      console.log("Active:", active);
  
      if(active){
        console.log("if");
        
        this.userService.blockUser(uuid).subscribe(
          () => {
            console.log("User blocked successfully");
            this.updateUserData();
           
          },
          error => {
            console.error("Error blocking user:", error);
            this.updateUserData();
            
          }
        );
    
      }else{
        console.log("else");
        
        this.userService.unblockUser(uuid).subscribe(
          () => {
            console.log("User unblocked successfully");
            this.updateUserData();
            
          },
          error => {
            console.error("Error unblocking user:", error);
            this.updateUserData();
            
          }
        );
      }
  
      }
  
      updateUserData() {
     
        this.store.dispatch(loadAuthority({ role: 'Authority'}));
      }


}

