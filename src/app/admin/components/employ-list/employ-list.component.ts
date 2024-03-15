import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
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

  constructor(private jwtService: JwtServiceService, private store:Store,private dialog: MatDialog) {
    this.users = [];
    this.filteredUsers = this.users;
  }

  HeadingArray=[{Head : 'Firstname',bodyKey : 'firstName'},
  {Head : 'LastName',bodyKey : 'lastName'},
  {Head : 'Email',bodyKey : 'email'},
  {Head : 'Contact',bodyKey : 'contact'},
  {Head : 'Role',bodyKey : 'role'},
  {Head : 'Delete',bodyKey : 'delete'},
  // {Head : 'Restrict',bodyKey : 'restrict'},
                  ];


  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.select(getuserlist).subscribe(item=>{
      this.users = item;
      console.log(this.users);
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
  
  
}
