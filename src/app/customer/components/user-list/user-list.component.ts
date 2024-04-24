import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { loadUser } from 'src/app/state/user.action';
import { getuserlist } from 'src/app/state/user.selector';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {


  

  customer !: User[] ; 
  filteredUsers !: User[] ;

  searchKeyword !: string ;


  users: any[] = [];
  private _dialog: any;

  HeadingArray=[{Head : 'Firstname',bodyKey : 'firstName'},
                 {Head : 'LastName',bodyKey : 'lastName'},
                 {Head : 'Email',bodyKey : 'email'},
                 {Head : 'Contact',bodyKey : 'contact'},
                 {Head : 'Gender',bodyKey : 'gender'},
                 {Head : 'Delete',bodyKey : 'delete'},
                 {Head : 'Restrict',bodyKey : 'restrict'},
                                 ];

  @Input() user: any; 
  block: boolean = false;

  constructor(private jwtService: JwtServiceService, private store:Store,private dialog: MatDialog,private userService:UserServiceService ) {
    this.users = [];
    this.filteredUsers = this.users;
  }

 
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.select(getuserlist).subscribe(item=>{
      // this.users = item;
      console.log("user data  uswer list ",this.users);
      if(item){
        this.users = item.filter(user => user.role === 'User');
        console.log("Filtered user data:", this.users);
      }
    });
  }

  toggleBlock() {
    this.jwtService.blockUser(this.user.id);
  }

  onDeleteUser(userId: string|any) {
    debugger;
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
  

  blockUser(userId : number) {
    this.jwtService.blockUser(userId).subscribe(
      () => {
        console.log("user deleted successfully");
        location.reload();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  
  unBlockUser(userId : number) {
    this.jwtService.unBlockUser(userId).subscribe(
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


  // searchUsers(): void {
  //   if (this.searchKeyword) {
  //     this.filteredUsers = this.customer.filter(
  //       (user) =>
  //         user.firstName.toLowerCase().includes(this.searchKeyword.toLowerCase())
  //     );
  //   } else {
  //     this.filteredUsers = this.users;
  //   }
  // }


}
