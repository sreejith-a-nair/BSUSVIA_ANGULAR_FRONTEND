import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { loadUser } from 'src/app/state/user.action';
import { getuserlist } from 'src/app/state/user.selector';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrls: ['./employ-list.component.css']
})
export class EmployListComponent {

  users: any[] = [];
  private _dialog: any;
  filteredUsers !: User[] ;

  searchKeyword !: string ;

  constructor(private jwtService: JwtServiceService, private store:Store,private dialog: MatDialog,private userService : UserServiceService) {
    this.users = [];
    this.filteredUsers = this.users;
  }

  HeadingArray=[{Head : 'Firstname',bodyKey : 'firstName'},
  {Head : 'LastName',bodyKey : 'lastNam'},
  {Head : 'Email',bodyKey : 'email'},
  {Head : 'Contact',bodyKey : 'contact'},
  {Head : 'Role',bodyKey : 'role'},
  {Head : 'Gender',bodyKey : 'gender'},
  {Head : 'Delete',bodyKey : 'delete'},
  {Head : 'Restrict',bodyKey : 'restrict'},
                  ];


  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.select(getuserlist).subscribe(item=>{
      // this.users = item;
      console.log(this.users);

      if(item){
        this.users = item.filter(user => user.role === 'Operator');
        console.log("Filtered user data:", this.users);
      }


    });
  }

  onDeleteUser(userId: string|any) {
 
    console.log("USER ID  >>>   ", userId);
    
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
   
      this.store.dispatch(loadUser());
    }
  
}
